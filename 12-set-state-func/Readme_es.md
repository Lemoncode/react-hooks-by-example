# 12 set state func

## Resumen

Este ejemplo toma como punto de partida el ejemplo _11-use-context_.

### Explicación corta

Un tema importante a tener en cuenta con los hooks y los componentes funcionales
es que las funciones se ejecutan una vez y se mueren (los hooks nos sirven como almacenes de datos entre otras cosas),
pero si hacemos una llamada asíncrona en esa función, por el principio de closure cuando se invoque dicha función, los
datos que tendremos serán los valores de dicha ejecución (se queda zombies)

### Explicación larga

Uno de los prerequisitos fundamentales para poder aprender React es tener
unos conocimientos sólidos de Javascript y ES6. En este caso tener muy
claro el concepto de _closure_.

Los componentes funcionales son eso, funciones:

- Se invocan.
- Se ejecutan.
- Mueren.

Si recordamos el concepto de closure, cuando tenía una llamada asíncrona
me permitía en la respuesta acceder a variables de la funcíon padre que la
había invocado aunque está función estuviera ya muerta.

Si aplicamos este concepto a React, nos podemos encontrar con un caso curioso:

- Imagina que tenemos en un estado un valor de descuento.
- Hacemos una llamada asíncrona al servidor para que nos de el total del pedido.
- Mientras que la llamada está en curso el campo de descuento cambia.
- En la respuesta del servidor multiplicamos el total del pedido por el descuento.

¿ Qué valor de descuento crees que aplicará el antiguo o el nuevo? ... Bingo, el
antiguo ¿Porqué? ... pensemnos en un closure, no dejamos de tener una función padre
que se ha muerto, que mantiene los valores por el principio de closure y que lee
los valores que tuviera en ese momento ¿ Qué pasa con los nuevos valores se generan
en otra vida... es decir en otra llamada a la función donde todo vuelve a arrancar).

Veamos esto con un ejemplo.

## Pasos

Si vienes del ejemplo _useContext_ acuerdate de quitar de _app_ la instanciación del _provider_ y
el componente extra que creaste.

Sustituimos _demo.tsx_ por el siguiente contenido:

_./src/demo.tsx_

```tsx
import React from "react";

export const MyComponent: React.FC = () => {
  const [numero, setNumero] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setNumero(numero + 1);
    }, 1500);
    setNumero(1);
  }, []);

  return (
    <>
      <h4>El numero: {numero}</h4>
    </>
  );
};
```

¿Es normal lo que está pasando? A primera vista después de un segundo y medio, el valor que se muestra
debería de ser _2_, ¿Qué pasa? Que en el callback cuando tira de closure de esa ejecución, el valor
de número es _0_.

¿Como podemos corregir esto? la función _setState_ trae una segunda firma en la que podemos pasarle
una función:

```diff
  React.useEffect(() => {
    setTimeout(() => {
-      setNumero(numero + 1);
+      setNumero((numero) => numero + 1);

    }, 1500);
    setNumero(1);
  }, []);
```

Cuando la invocamos de esta manera, el hook de _setState_ se asegura de traernos el último valor.

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Si lo que te gusta es el mundo del _backend_ también puedes apuntante a nuestro [Bootcamp backend Online Lemoncode](https://lemoncode.net/bootcamp-backend#bootcamp-backend/inicio)

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)
