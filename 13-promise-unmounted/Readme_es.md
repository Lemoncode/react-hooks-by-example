# 13 Promise Unmounted

Hay situaciones en las que lanzamos una petición AJAX y no podemos cancelarla. Puede suceder que los usuarios naveguen a otra página (o el componente que hizo la llamada ajax quede desmontado) antes de que la promesa se resuelva. ¿Qué ocurre cuando la promesa queda resuelta?
Obtenemos un error, ¿Cómo podemos evitar esto? Detectando cuando un componente se monta y se desmonta, vamos a ver como podemos hacer esto usando hooks.

# Pasos

- Tomaremos como punto de partida el ejemplo _00 boilerplate_. Copia el contenido del proyecto a una carpeta nueva y ejecuta _npm install_.

```bash
npm install
```

- Abramos _demo.js_, y añadamos el código inicial (un input para el filtro y mostrar la lista de nombres)

_./src/demo.js_

```jsx
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

export const MyChildComponent = () => {
  const [filter, setFilter] = React.useState("");
  const [userCollection, setUserCollection] = React.useState([]);

  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <ul>
        {userCollection.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

- Ahora queremos lanzar una petición ajax cada vez que el usuario escriba en el campo de texto del filtro (añadiremos algo de latencia).

_./src/demo.js_

```diff
export const MyChildComponent = () => {
  const [filter, setFilter] = React.useState('');
  const [userCollection, setUserCollection] = React.useState([]);

+  // Load full list when the component gets mounted and filter gets updated
+  React.useEffect(() => {
+    setTimeout(() => {
+      fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
+          .then(response => response.json())
+          .then(json => setUserCollection(json));
+    }
+    , 2500)
+  }, [filter]);

  return (
```

- Si ejecutas el ejemplo, escribe una letra en el input y rápidamente pulsa el botón para ocultar el componente hijo. En el log de la consola verás un error.

_Advertencia: En React no se puede hacer un actualización del estado de un componente desmontado. Es un no-op, pero es un indicio de memory leak en tu aplicación. Para arreglar esto, cancela todas las subscripciones y tareas asíncronas en una función de cleanup en un useEffect._

- Podemos detectar cuando un componente ha sido desmontado usando un Ref flag.

```diff
export const MyChildComponent = () => {
  const [filter, setFilter] = React.useState("");
  const [userCollection, setUserCollection] = React.useState([]);

+ const mountedRef = React.useRef(false);

+ React.useEffect(() => {
+   mountedRef.current = true;
+   return () => (mountedRef.current = false)
+ }, [])

+ const setSafeUserCollection = (userCollection) => mountedRef.current && setUserCollection(userCollection);

  // Load full list when the component gets mounted and filter gets updated
  React.useEffect(() => {
```

Luego podemos resolver nuestra llamada _fetch_ de la siguiente manera:

```diff
  React.useEffect(() => {
    setTimeout(() => {
      fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
        .then(response => response.json())
-        .then(json => setUserCollection(json));
+        .then(json => setSafeUserCollection(json));
    }, 2500);
  }, [filter]);
```

> Ejercicio: podríamos encapsular el fetch y el setSafeUserCollection en un hook,
> ¿Por qué no intentarlo? ;)

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)
