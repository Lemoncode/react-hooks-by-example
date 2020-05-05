# 10 useReducer

En el ejemplo previo hemos solucionado el problema con la función que se actualizaba en cada renderizado usando _useCallback_. Esta propuesta es genial, pero en escenarios más complejos puede que quieras organizar tu código usando un enfoque diferente. Otra forma de resolver este problema es usar _useReducer_, este hook devolverá una función _dispatch_ que permance estable.

# Pasos

- Tomaremos como punto de partida el ejemplo _00 boilerplate_. Copia el contenido del proyecto a una carpeta nueva y ejecuta _npm install_.

```bash
npm install
```

- Abramos _demo.js_. Crearemos un componente padre y uno hijo (esta vez el componente hijo será capaz de mostrar y editar el nombre dado).

_./src/demo.js_

```jsx
import React from "react";

export const MyComponent = () => {
  const [userInfo, setInfo] = React.useState({name: 'John', lastname: 'Doe'});

  return (
    <>
      <h3>
        {userInfo.name} {userInfo.lastname}
      </h3>
      <EditUsername name={userInfo.name} onChange={(name) => setInfo({
        ...userInfo,
        name,
      })} />
      <input
        value={userInfo.lastname}
        onChange={e => setInfo({
          ...userInfo,
          lastname: e.target.value,
        })}
      />
    </>
  );
};

const EditUsername = React.memo(props => {
  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return (
    <input value={props.name} onChange={e => props.onChange(e.target.value)} />
  );
});
```

- Si ejecutamos el ejemplo comprobaremos que el renderizado siempre se lanza (el callback onChangeProp siempre es recreado, el shallow compare fallará).

- Arreglemos esto usando _useReducer_

_./src/demo.js_

```diff
import React from "react";

+ const userInfoReducer = (state, action) => {
+  switch(action.type) {
+    case 'setusername': 
+      return {
+        ...state,
+         name: action.payload,
+      }
+    case 'setlastname':
+      return {
+        ...state,
+        lastname: action.payload,
+      }
+    default:
+      return state;
+  }
+ }

export const MyComponent = () => {
-  const [userInfo, setInfo] = React.useState({name: 'John', lastname: 'Doe'});
+  const [reducer, dispatch] = React.useReducer(userInfoReducer, {name: 'John', lastname: 'Doe'});

  return (
    <>
      <h3>
-        {userInfo.name} {userInfo.lastname}
+        {reducer.name} {reducer.lastname}
      </h3>
-      <EditUsername name={userInfo.name} onChange={(name) => setInfo({
-        ...userInfo,
-        name,
-      })} />
+      <EditUsername name={reducer.name} dispatch={dispatch} />
-      <input
-        value={userInfo.lastname}
-        onChange={e => setInfo({
-          ...userInfo,
-          lastname: e.target.value,
-        })}
+      <input
+        value={reducer.lastname}
+        onChange={e =>
+          dispatch({
+            type: "setlastname",
+            payload: e.target.value
+          })
+        }
+      />
      />
    </>
  );
};

const EditUsername = React.memo(props => {
  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return (
-    <input value={props.name} onChange={e => props.onChange(e.target.value)} />
+    <input
+      value={props.name}
+      onChange={e =>
+        props.dispatch({
+          type: "setusername",
+          payload: e.target.value
+        })
+      }
+    />
  );
});
```

- Ahora si ejecutamos el ejemplo obtendremos el resultado esperado.

Para pensar: parece ser un enfoque elegante, pero tenemos que pasar el dispatcher, los componentes hijos pueden quedar ligados al dispatcher.

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)