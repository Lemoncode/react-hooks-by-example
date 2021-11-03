# 05 Component update render

## Resumen

Este ejemplo toma como punto de partida el ejemplo \_04-component-dom-unmount.

En este ejemplo vamos a ver como usar React.useEffect para ejecutar
un código justo después de cada renderizado.

## Paso a Paso

- Primero copiamos el ejemplo anterior, y hacemos un _npm install_

```bash
npm install
```

- Vamos abrir el fichero _demo.js_ y crear el ejemplo de un componente
  padre y un hijo que se muestra dependiendo de una condición booleana.

```tsx
import React from "react";

export const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      {visible && <MyChildComponent />}
      <button onClick={() => setVisible(!visible)}>
        Toggle Child component visibility
      </button>
    </>
  );
};

const MyChildComponent = () => {
  const [userInfo, setUserInfo] = React.useState({
    name: "John",
    lastname: "Doe",
  });

  return (
    <div>
      <h3>
        {userInfo.name} {userInfo.lastname}
      </h3>
      <input
        value={userInfo.name}
        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
      />
      <input
        value={userInfo.lastname}
        onChange={(e) => setUserInfo({ ...userInfo, lastname: e.target.value })}
      />
    </div>
  );
};
```

- Ahora viene la parte interesante, vamos a llamar a _React.useEffect_ sólo
  informando el primer parametro.

```diff
const MyChildComponent = () => {
  const [userInfo, setUserInfo] = React.useState({
    name: "John",
    lastname: "Doe"
  });

+ React.useEffect(() => {
+    console.log("A. Called right after every render");
+
+  });

  return (
```

- Si ejecutamos podemos ver que este código se ejecuta después de cada renderizado del componente.

- También podemos añadir una función para liberar recursos justo antes de que se ejecute el siguiente render.

```diff
React.useEffect(() => {
    console.log("A. Called when the component is mounted and after every render");

+    return () =>
+      console.log(
+        "B. Cleanup function called after every render"
+      );
+  });
```

- Si ejecutamos podemos ver como se invocan las dos funciones.

```bash
npm start
```

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Si lo que te gusta es el mundo del _backend_ también puedes apuntante a nuestro [Bootcamp backend Online Lemoncode](https://lemoncode.net/bootcamp-backend#bootcamp-backend/inicio)

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)
