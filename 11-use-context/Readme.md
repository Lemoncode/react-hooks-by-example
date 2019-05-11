# 11 useContext

Accessing the context via hooks is pretty straight forward.

# Steps

- We will take as starting point sample _00 boilerplate_. Copy the content of the
  project to a fresh folder an execute _npm install_.

```bash
npm install
```

- Now we are going to spend a couple of steps setting up the context (the hooks part is just
one line of code, you will find it in the last steps of this readme).

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

- Now let's create a _MyComponent_ component under _demo.js_
**append this to the existing content on _demo.js**

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

- Now if we run the sample we will get the expected behavior.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
