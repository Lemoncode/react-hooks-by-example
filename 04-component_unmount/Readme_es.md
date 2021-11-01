# 04 Component DOM unmount

## Resumen

Este ejemplo toma como punto de partida el ejemplo _03-component-dom-onload_.

En este ejemplo vamos a ver como liberar recursos cuando desmontamos un
componente del DOM.

## Paso a Paso

- Primero copiamos el ejemplo anterior, y hacemos un _npm install_

```bash
npm install
```

- Vamos a crear un componente que muestra o oculta un texto dependiendo
  de un flag booleano.

_./src/demo.tsx_

```tsx
import React from "react";

export const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  return <>{visible && <h4>Hello</h4>}</>;
};
```

De primeras no se muestra el texto porque _visible_ está a falso.

Vamos a añadir un botón para cambiar el estado de _visible_

_./src/demo.tsx_

```diff
  return (
    <>
      {visible && <h4>Hello</h4>}
+      <button onClick={() => setVisible(!visible)}>
+        Toggle Child component visibility
+      </button>
    </>
  );
```

- Y si en vez de un \_h4\_\_, instanciamos un componente:

```diff
+ export const MyChildComponent = () => {
+   return <h4>Hello form child component</h4>
+ }

export const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
-      {visible && <h4>Hello</h4>}
+      {visible && <MyChildComponent/>}
      <button onClick={() => setVisible(!visible)}>
        Toggle Child component visibility
      </button>
    </>
  );
};
```

- Ahora tenemos un componente hijo que pinchando en un botón
  se monta o desmonta del dom.

¿Cómo podríamos hacer para mostrar un mensaje por la consola
del navegador cuando se montara el componente hijo?
Si recordamos el ejemplo anterior,sería con _React.useEffect_
¿Te animas a intentarlo? Dale a la pausa al video y ponte :).

Podríamos hacer algo así como:

_./src/demo.tsx_

```diff
export const MyChildComponent = () => {
+ React.useEffect(() => {
+  console.log('El componente se acaba de montar en el DOM')
+ }, [])
+
  return <h4>Hello form child component</h4>;
};
```

- Ahora viene la parte interesante, y si queremos mostrar un mensaje
  por la console del navegador cuando el componente se desmonta del DOM?
  En la misma función que ponemos como primer parametro devolvemos
  la función de "limpieza"... _useEffect_ se va a guardar esa función
  hasta que desmonte el DOM para invocarla:

```diff
export const MyChildComponent = () => {
  React.useEffect(() => {
    console.log("El componente se acaba de montar en el DOM");
+   return () => console.log("El componente se acaba de desmontar del DOM");
  }, []);
```

¿Para que me puede servir esto? Imaginate que abres una conexión a un websocket
y quieres cerrarla cuando el usuario oculte el componente, ¿ cómo liberas
recursos de forma ordenada? Aquí lo tienes.

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Si lo que te gusta es el mundo del _backend_ también puedes apuntante a nuestro [Bootcamp backend Online Lemoncode](https://lemoncode.net/bootcamp-backend#bootcamp-backend/inicio)

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)
