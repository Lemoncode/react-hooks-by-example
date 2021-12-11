# 10 useReducer

## Resumen

Este ejemplo toma como punto de partida el ejemplo _09-pure-component-callback_.

Ya hemos visto la potencia de los hooks, pero en ciertos escenarios en los
que puedes tener mucha lógica y muchos niveles de subcomponentes, pueden que te lleve a tener problemas de mantenibilidad, para ciertos escenarios podemos hacer uso del hook _useReducer_, inspirado en el patrón _Redux_.

## Paso a Paso

- Primero copiamos el ejemplo anterior, y hacemos un _npm install_

```bash
npm install
```

- Vamos a abrir el fichero _demo.tsx_ y crear un componente padre
  que va a tener información del nombre y apellido de una persona,
  y vamos a crear un componente hijo que nos va a servir para editar
  el campo nombre.

_./src/demo.tsx_

```tsx
import React from "react";

interface Props {
  name: string;
  onChange: (value: string) => void;
}

const EditUsername: React.FC<Props> = React.memo((props) => {
  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return (
    <input
      value={props.name}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
});

export const MyComponent = () => {
  const [userInfo, setInfo] = React.useState({ name: "John", lastname: "Doe" });

  return (
    <>
      <h3>
        {userInfo.name} {userInfo.lastname}
      </h3>
      <EditUsername
        name={userInfo.name}
        onChange={(name) =>
          setInfo({
            ...userInfo,
            name,
          })
        }
      />
      <input
        value={userInfo.lastname}
        onChange={(e) =>
          setInfo({
            ...userInfo,
            lastname: e.target.value,
          })
        }
      />
    </>
  );
};
```

- En el componente hijo hemos metido un _console.log_ para que nos avise
  si el control se repinta o no, este control se repinta siempre porque
  en la propiedad _onChange_ estamos creando una función nueva en cada render.

Aquí podríams estar tentados a usar _react.useCallback_, ¿ Existe otra manera
de tratar esto? Vamos a ver la propuesta que ofrece _useReducer_

En _useReducer_ agrupamos un conjunto de funcionalidad

- Por un lado tenemos el estado (los datos).
- Por otro lado tenemos acciones (que contiene un identificador y uno parámetro con información) que se lanzan utilizando un dispatcher.
- Y esas acciones actualizan el estado en un reducer (un reducer es una función que acepta dos parametros el estado anterior y la acción, y te devuelve un nuevo estado)
- ¿En qué consiste esto? En pensar que el estado actual es como el fotograma de una película, lo fijamos, nos llega una petición de cambio (con la acción) y se genera un nuevo fotograma en base al anterior y al cambio que se quiere hacer, si no hay cambio se devuelve el mismo que había antes.

Vamos primero a definir nuestro _reducer_

- Aprovechando que estamos trabajando con **TypeScript** vamos a tipar
  nuestro reducer y acciones:

_./src/demo.tsx_

```typescript
interface UserState {
  name: string;
  lastname: string;
}

interface Action {
  type: string;
  payload: any;
}

const actionIds = {
  setName: "setname",
  setLastname: "setlastname",
};
```

- Y ahora vamos a crear nuestro reducer

_./src/demo.tsx_

```tsx
const userInfoReducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case actionIds.setName:
      return {
        ...state,
        name: action.payload,
      };
    case actionIds.setLastname:
      return {
        ...state,
        lastname: action.payload,
      };
    default:
      return state;
  }
};
```

- Vamos ahora sustituir el _useState_ de nuestro componente por un _useReducer_
  veamos como queda.

Primero añadimos el _useReducer_

```diff
export const MyComponent = () => {
-  const [userInfo, setInfo] = React.useState({ name: "John", lastname: "Doe" });
+  const [userInfo, dispatch] = React.useReducer(userInfoReducer, {name: 'John', lastname: 'Doe'});
```

**¿Cómo funciona esto?**

Por un lado _useReducer_ recibe dos parametros el primero es la funcion de
reducer que hemos creado anteriormente, y el segundo es el estado inicial.

Por otro devuelve un array (como en _useState_), sobre este array podemos
hacer destructuring, por un lado nos traemos la foto del estado actual
en el primer elemento del array, y por otro nos da un \_dispatcher_,
este dispatcher actua como un autobus, carga la acción que le demos
y la lleva la función reducer que actualiza el estado.

Vamos a ir cambiando el markup del render y adaptandolo a que use el estado.

Al haber llamado _userInfo_ al state que ya tenemos nos hemos ahorrado trabajo
de refactorizacion.

Por otro lado vamos a cambiar el input que esta directamente en el componente
padre:

```diff
<input
  value={userInfo.lastname}
-        onChange={e => setInfo({
-          ...userInfo,
-          lastname: e.target.value,
-        })}
+        onChange={(e) => dispatch({type: actionIds.setLastname
+                                  ,payload: e.target.value})}
/>
```

Fijaros en este cambio, yo ya no cambio directamente el _state_,
mediante la función _dispatch_, yo le paso el tipo de acción
que quiero ejecutar, incluyendo los datos que cambian, para que
ese dispatch ejecuta la función de _useReducer_.

Ahora viene el cambio más fuerte, actualizar el componente hijo,
en este caso tenemos que cambiar la firma de las propiedades, delegamos en
el dispatch el envío de la información que cambia.

Esto en este ejemplo puede parece un cambio sin sentido, pero en un caso
complejo en el que podemos tener multitud de callbacks, nos ahorramos
pasarlos por propiedad, teniendolo todo agrupado en un sólo dispatch.

_./src/demo.tsx_

```diff
interface Props {
  name: string;
-  onChange: (value: string) => void;
+  dispatch: React.Dispatch<Action>;
}

const EditUsername: React.FC<Props> = React.memo((props) => {
  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return (
    <input
      value={props.name}
-      onChange={(e) => props.onChange(e.target.value)}
+      onChange={(e) =>
+        props.dispatch({ type: actionIds.setName, payload: e.target.value })
+      }
    />
  );
});
```

- Vamos ahora actualizar el componente padre:

_./src/demo.tsx_

```diff
      <EditUsername
        name={userInfo.name}
-        onChange={(name) =>
-          setInfo({
-            ...userInfo,
-            name,
-          })
+        dispatch={dispatch}
        }
      />
```

Si ejecutamos el ejemplo podemos ver que ya no se nos da el problema de
rerender, ¿ Por qué? Porque la funcion _dispatch_ no se regenera en cada render.

Utilizar _useReducer_ en este ejemplo ha sido como matar moscas a cañonazos, 
hemos elegido un ejemplo sencillo para poder aprender como funciona, lo
normal es que uses esto en casos complejos en los que tengas un estado rico,
y un monton de niveles de subcomponentes.

_useReducer_ no es una solución universal, y tiene sus desventajas, estás
atando la firma de las propiedas de tus componente a un _dispatch_ concreto
y también lanzando acciones esto hace que tus componentes sean menos
promocionables, va a ser más duro hacerlos reusables. Tienes que elegir
bien donde parar de usar dispatch y usar una firma convencional en componentes
que veas que pueden ser reusables.

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)
