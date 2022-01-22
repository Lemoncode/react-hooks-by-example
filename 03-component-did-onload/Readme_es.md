[<img align="left" src="https://images.squarespace-cdn.com/content/v1/56cdb491a3360cdd18de5e16/1536155167931-3JJ7O74IM4QP88L0RQS9/3_200.png" alt="español" width="170"/>](https://lemoncode.net/) 


[<img align="right" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Spain_flag_icon.svg/1200px-Spain_flag_icon.svg.png" alt="english" width="50"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/03-component-did-onload/Readme_es.md)
[<img align="right" src="https://assets.stickpng.com/images/580b585b2edbce24c47b2836.png" alt="inglés" width="47"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/03-component-did-onload)
  
<br>
<br>

# 03 Component DOM on load

## Resumen

Este ejemplo toma como punto de partida el ejemplo [_02-use-state-object_](https://github.com/Lemoncode/react-hooks-by-example/blob/master/02-use-state-object/Readme_es.md).

Vamos a empezar a jugar con otro de los hooks core de React: _useEffect_

Este Hook nos permite engancharnos a ciertos eventos en el tiempo y poder
ejecutar código.

Vamos a empezar por el más básico, ejecutar un código justo cuando un
componente se monta en el DOM.

Hay muchas operaciones que quieres ejecutar justo cuando se carga en
el DOM del navegador tu componente (cuando se empieza a ver), por
ejemplo cargar una ficha de un cliente de una API REST de servidor.

También hay operaciones que queremos poder ejecutar cuando cambie un
valor, o en después de cada render.

¿Qué pasa si esas operaciones no son síncronas? Por ejemplo quiero
tirar de un setTimeout o hacer un llamada a un servidor, esto devolvera una promesa, no es nada seguro ejecutar esto directamente en un componente funcional
ya que este se ejecuta y destruye, para esto (gestionar side effects) tenemos
_React.useEffect_

En este ejemplo vamos a ver como cambiar un nombre, justo cuando se
monta el componente, después simularemos una llamada asíncrona
utilizando _setTimeout_.

## Paso a Paso

- Primero copiamos el ejemplo anterior, y hacemos un _npm install_

```bash
npm install
```

- Vamos a sobreescribir el fichero _demo.tsx_ con el siguiente código:

```tsx
import React from "react";

export const MyComponent = () => {
  const [username, setUsername] = React.useState("");

  return (
    <>
      <h4>{username}</h4>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
    </>
  );
};
```

Volvemos a uno de nuestros ejemplos iniciales.

- Si lo ejecutamos:

```bash
npm start
```

- Vemos que el campo nombre está en blanco, esto es normal ya que
  le hemos asignado el valor inicialización a cade en blanco.

- ¿Y si quisieramos asignar un valor justo cuando se monta el componente
  en el dom? Podemos hacer uso de _React.useEffect_

```diff
export const MyComponent = () => {
  const [username, setUsername] = React.useState("");

+  React.useEffect(() => {
+    setUsername("John");
+  }, []);

  return (
```

Al ejecutar esto podemos ver como aparece el nombre de _John_ por pantalla.

Si depuramos podemos y ponemos un breakpoint justo donde se invoca
a _react.useState_, otro en el render y otro dentro del código de _useEffect_ podemos ver que se llaman en el siguiente orden:

- Primero el _useState_
- Después el render.
- Después nuestro código de \_useEffect (sólo una vez).

Y si modificamos el _input_ asociado al campo _username_ no se vuelve
a ejecutar el código…

¿Porque pasa esto?

**React.useEffect**

En su primer parametro un código que puede contener sideffects
(una llamada a servidor, un setTimeout...).

Si no le informamos más parametros, esta función se ejecutara siempre
despues de cada render.

Esto no está mal, pero mucha veces nos hace falta acotar la ejecución
de cierto código (ejecutate sólo después del primer render del componente,
ejecutate sólo antes ciertas condiciones), por ejemplo podríamos decirle
al código que se ejecutará sólo cuando cambiará la propiedad _username_

```tsx
React.useEffect(() => {
  setUsername("John");
}, [name]);
```

Este ejemplo sería un poco tonto porque estamos modificando _username_ dentro
del propio _useEffect_ se metería en un bucle infinito.

Un tema interesante:

- Hemos visto que si no informamos el segundo parametro no para de ejecutarse
  despues de cada render.

- También que si informamos una lista de valores como segundo parametro
  se ejecuta cuando estos valores cambian.

Peeero ¿Y si informamos esa lista como vacía? Si hacemos esto, el código
dentro del useEffect se ejecutará la primera vez (después del primer renderizado)
y no volvera a ejecutarse más ya que le estamos diciendo que no depende de ningún
valor de las propiedades o del estado, de esta manera no volverás a ejecutarse
(Para los que ya hayáis trabajado antes con React esto se parece al
componentDidMount de los componentes de clase de React).

Para cerrar este ejemplo vamos a simular una llamada asíncrono utilizando
_setTimeout_

```diff
React.useEffect(() => {
-  setUsername("John");
+    // Simulating async call
+    setTimeout(() => {
+      setUsername("John");
+    }, 1500);
}, []);
```

Si ejecutamos este código podemos ver como lanzamos nuestra aplicación
y después un segundo y medio se cambia el nombre de usuario a _John_.

Esto es sólo el comienzo, en los siguientes ejemplos seguiremos trabajando
con _React.useEffect_.

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)
