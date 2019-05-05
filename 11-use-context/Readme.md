# 11 useContext

Accesing the contex via hooks is pretty straight forward.

# Steps

- We will take as starting point sample _00 boilerplate_ copy the conent of the
  project to a fresh folder an execute _npm install_.

```bash
npm install
```

- Now we are going to spend a couple of steps setting up the context (the hooks part is just
one line of code, you will find it in the last steps form this readme).

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

- Let's instantiate the provider on top of our application.

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

- Now Let's create a _MyComponent_ component under _demo.js_
** append this to the exiting content on _demo.js**

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