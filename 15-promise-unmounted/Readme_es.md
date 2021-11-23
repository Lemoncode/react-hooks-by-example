# 15 Promise unmounted

## Resumen

Este ejemplo toma como punto de partida el ejemplo _14-use-ref-dom_.

Cuando hacemos una petición a una rest api o similar (una llamada AJAX),
React puede generar un memory leak si desmontamos del dom el componente que ha
hecho la llamada mientras esta en progreso dicha petición.

¿Cual es el problema en concreto? Que intentamos hacer un _setState_ en un
componente que ya no está en el DOM (ese espacio para el state se ha liberado).

¿Cómo podemos evitar esto? Detectando cuando un componenbte se monta y desmonta,
para no hacer esto muy tedioso podemos usar hooks.

## Paso a Paso

- Primero copiamos el ejemplo anterior, y hacemos un _npm install_

```bash
npm install
```

- Vamos a basarnos en un ejemplo en el que en un componente hijo cargamos
  una lista de datos desde una api rest, y este componente hijo podemos
  decidir crearlo o destruirlo desde el componente padre.

Primero creamos el armazon

_./src/demo.js_

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
+   return () => {mountedRef.current = false}
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

- Repetir esto en cada componente que hagamos puede ser un poco rollo, ¿ No podríamos hacerlo más genérico?
  Vamos a darle una vuelta:

```diff
+ const useSafeState = () => {
+  const mountedRef = React.useRef(false);
+
+  React.useEffect(() => {
+    mountedRef.current = true;
+    return () => {mountedRef.current = false};
+  }, []);
+
+  const isMounted = () => mountedRef.current;
+
+  return {isMounted}
+ }

export const MyChildComponent = () => {
  const [filter, setFilter] = React.useState("");
  const [userCollection, setUserCollection] = React.useState([]);
+
+ const {isMounted} = useSafeState();
-  const mountedRef = React.useRef(false);
-
-  React.useEffect(() => {
-    mountedRef.current = true;
-    return () => (mountedRef.current = false);
-  }, []);


  const setSafeUserCollection = userCollection =>
-    mountedRef.current && setUserCollection(userCollection);
+    isMounted() && setUserCollection(userCollection);

```

- Vamos a darle otra vuelta de tuerca más ¿Podríamos hacer un wrapper
  de _useState_?

```diff
- const useSafeState = () => {
+ const useSafeState = function<T>(initialValue : T) : [T, React.Dispatch<React.SetStateAction<T>>] {
  const mountedRef = React.useRef(false);

+  const [state, setState] = React.useState<T>(initialValue);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);

  const isMounted = () => mountedRef.current;

+  const setSafeState = function (
+    data: T
+  ): React.Dispatch<React.SetStateAction<T>> | void {
+    return isMounted() ? setState(data) : null;
+  };

-  return { isMounted };
+  return [state, setSafeState]
};

export const MyChildComponent = () => {
  const [filter, setFilter] = React.useState("");
-  const [userCollection, setUserCollection] = React.useState([]);
+  const [userCollection, setUserCollection] = useSafeState([]);

-  const { isMounted } = useSafeState();

-  const setSafeUserCollection = (userCollection) =>
-    isMounted() && setUserCollection(userCollection);

  // Load full list when the component gets mounted and filter gets updated
  React.useEffect(() => {
    setTimeout(() => {
      fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
        .then((response) => response.json())
-        .then((json) => setSafeUserCollection(json));
+        .then((json) => setUserCollection(json));
    }, 2500);
  }, [filter]);
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
