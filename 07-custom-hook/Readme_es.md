# 07 Custom Hooks

## Resumen

Este ejemplo toma como punto de partida el ejemplo \_06-ajax-field-change.

Esto de los hooks está muy bien, pero si empezamos a usarlo en proyectos
reales, nos podemos encontrar que nuestros componente funcionales pueden
acabar manchados de un montón de código, y lo que es peor ¿ Cómo puedo
reusar funcionalidad? ... Para todo esto tenemos los customs hooks, sí...
hacernos nuestros propios hooks, ya veréis que fáciles son de crear.

## Paso a Paso

- Primero copiamos el ejemplo anterior, y hacemos un _npm install_

```bash
npm install
```

- Vamos a partir del código en el que teníamos un _input_ de filtrado
  y una lista de usuarios que venía de servidor. Si no lo tienes a mano
  aquí va el código:

_./src/demo.tsx_

```tsx
import React from "react";

export const MyComponent = () => {
  const [filter, setFilter] = React.useState("");
  const [userCollection, setUserCollection] = React.useState([]);

  // Load full list when the component gets mounted and filter gets updated
  React.useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
      .then((response) => response.json())
      .then((json) => setUserCollection(json));
  }, [filter]);

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

- Vamos ahora a extraer la funcionalidad de carga y filtrado a un custom hooks
  lo haremos de dos formas.

La primera, encapsulandolo todo incluido el _useEffect_

_./src/demo.tsx_

```diff
import React from "react";

+ const useUserCollection = () => {
+  const [filter, setFilter] = React.useState("");
+  const [userCollection, setUserCollection] = React.useState([]);
+
+  // Load full list when the component gets mounted and filter gets updated
+  React.useEffect(() => {
+    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
+      .then(response => response.json())
+      .then(json => setUserCollection(json));
+  }, [filter]);
+
+  return {userCollection, filter, setFilter}
+ }

export const MyComponent = () => {
-  const [filter, setFilter] = React.useState("");
-  const [userCollection, setUserCollection] = React.useState([]);
+  const {userCollection, filter, setFilter} = useUserCollection();

-  // Load full list when the component gets mounted and filter gets updated
-  React.useEffect(() => {
-    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
-      .then(response => response.json())
-      .then(json => setUserCollection(json));
-  }, [filter]);

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <ul>
        {userCollection.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

La ventaja de esta aproximación es que dejamos el código del componente muy simple.

La principal desventaja es que este hook es muy específico para este component,
¿ Y si sólo quisieramos cargar la lista la primera vez o bajo otras condiciones?

Vamos a ver una segunda opción:

_./src/demo.tsx_

```diff
import React from "react";

+ const useUserCollection = () => {
+  const [filter, setFilter] = React.useState("");
+  const [userCollection, setUserCollection] = React.useState([]);
+
+  const loadUsers = () => {
+    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
+      .then(response => response.json())
+      .then(json => setUserCollection(json));
+  }
+
+  return {userCollection, loadUsers, filter, setFilter}
+ }


export const MyComponent = () => {
+  const {userCollection, loadUsers, filter, setFilter} = useUserCollection();
+
+  React.useEffect(() => {
+    loadUsers();
+  }, [filter]);

-  const [filter, setFilter] = React.useState("");
-  const [userCollection, setUserCollection] = React.useState([]);

-  // Load full list when the component gets mounted and filter gets updated
-  React.useEffect(() => {
-    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
-      .then(response => response.json())
-      .then(json => setUserCollection(json));
-  }, [filter]);

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <ul>
        {userCollection.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

La ventaja de esta opción es que hemos hecho un hook más flexible.

La principal desventaja es que estamos dejando el código del _useEffect_ dentro
del componente.

¿ Cual de las dos opciones es mejor? Aquí depende del escenario que te encuentres
en cada caso.

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Si lo que te gusta es el mundo del _backend_ también puedes apuntante a nuestro [Bootcamp backend Online Lemoncode](https://lemoncode.net/bootcamp-backend#bootcamp-backend/inicio)

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio).
