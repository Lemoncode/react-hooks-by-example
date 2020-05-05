# 11 useContext

Acceder al contexto a través de hooks es bastante sencillo.

# Pasos

- Tomaremos como punto de partida el ejemplo _00 boilerplate_. Copia el contenido del proyecto a una carpeta nueva y ejecuta _npm install_.

```bash
npm install
```

- Ahora vamos a tomarnos un par de pasos para preparar el contexto (la parte de hooks es sólo una línea de código, la encontrarás en el último paso de este readme).

_./src/demo.js_

```jsx
import React from "react";

const MyContext = React.createContext({
  username: "",
  setUsername: () => {}
});

export const MyContextProvider = props => {
  const [username, setUsername] = React.useState("John Doe");

  return (
    <MyContext.Provider value={{ username, setUsername }}>
      {props.children}
    </MyContext.Provider>
  );
};
```

- Vamos a inicializar el provider en la raíz de nuestra aplicación.

_./src/index.js_

```diff
import React from "react";
import ReactDOM from "react-dom";
- import { MyComponent } from "./demo";
+ import { MyComponent, MyContextProvider } from "./demo";
import "./styles.css";

function App() {
  return (
+    <MyContextProvider>
    <div className="App">
      <MyComponent />
    </div>
+   </MyContextProvider>
  );
}
```

- Ahora vamos a crear el componente _MyComponent_ en _demo.js_
**añade esto al contenido existente en _demo.js**

```jsx
export const MyComponent = () => {
  const myContext = React.useContext(MyContext);

  return (
    <>
      <h3>{myContext.username}</h3>
    </>
  )
}
```

- Si ahora ejecutamos el ejemplo obtendremos el comportamiento esperado.

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)