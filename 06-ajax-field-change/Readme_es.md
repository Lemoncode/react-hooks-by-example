# 06 Ajax field change

Enfrentémonos al siguiente escenario. Un usuario puede introducir un nombre en campo input, queremos lanzar la llamada ajax cada vez que el usuario escribe un valor en el input (devolviendo la lista de nombres filtrada). Podemos hacer esto usando _useEffect_, indicando en el segundo argumento el nombre del campo usado para lanzar la llamada, en lugar de un array vacío.

# Pasos

- Tomaremos como punto de partida el ejemplo _00 boilerplate_. Copia el contenido del proyecto a una carpeta nueva y ejecuta _npm install_.

```bash
npm install
```

- Abramos el fichero _demo.js_, crearemos el boilerplate
  (añadir un campo filtro, mostrar una lista de nombres)

_./src/demo.js_

```jsx
import React from "react";

export const MyComponent = () => {
  const [filter, setFilter] = React.useState("");
  const [userCollection, setUserCollection] = React.useState([]);

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

- Ahora queremos lanzar una petición ajax cada vez que el usuario escriba en el input filtro.

_./src/demo.js_

```diff
export const MyComponent = () => {
  const [filter, setFilter] = React.useState('');
  const [userCollection, setUserCollection] = React.useState([]);

+  // Load full list when the component gets mounted and filter gets updated
+  React.useEffect(() => {
+    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
+        .then(response => response.json())
+        .then(json => setUserCollection(json));
+  }, [filter]);

  return (
```

> Aquí hacemos uso de la REST API _jsonplaceholder_ para mockear los datos.

- Si ejecutamos el ejemplo podemos comprobar que cada vez que el usuario empieza a escribir en el input una llamada ajax es lanzada, devolviendo una lista de resultados filtrada por el campo filtro.

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)