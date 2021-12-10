# 04 Component unmount

## Resume

This example takes the _03-component-dom-onload_ example as starting point.

In this example we are going to see how to free resources when we unmount a DOM component.

# Steps

- First we copy the previous example, and execute _npm install_.

```bash
npm install
```

- We are going to create a component that shows or hides a text depending on a boolean flag.

Overwrite _demo.js_ file with the following content.

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
```

At first the text is not displayed because _visible_ is false.

We are going to add a button to change the state of _visible_

_./src/demo.tsx_

```diff
  return (
    <>
      {visible && <h4>Hello</h4>}
+      <button onClick={() => setVisible(!visible)}>
+        Toggle Child component visibility
+      </button>
    </>
  );
```

Let's replace the basic element \ _h4 \ _ \ \_, and let's define a child component:

```diff
+ export const MyChildComponent = () => {
+   return <h4>Hello form child component</h4>
+ }

export const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
-      {visible && <h4>Hello</h4>}
+      {visible && <MyChildComponent/>}
      <button onClick={() => setVisible(!visible)}>
        Toggle Child component visibility
      </button>
    </>
  );
};
```

- Now we got a childr component that is mounted / unmounted from the dom when a user clicks on a button.

How could we do to display a message on the console
browser when the child component will be mounted?
If we remember the previous example, we can use _React.useEffect_.
Before continue just give a try by yourself.

We could do something like:

_./src/demo.tsx_

```diff
export const MyChildComponent = () => {
+ React.useEffect(() => {
+  console.log('Component just mounted on the DOM')
+ }, [])
+
  return <h4>Hello form child component</h4>;
};
```

- Now comes the interesting part, what if we want to show a message on the browser console when the component is unmounted from the DOM? Just
  by adding in the return value of that _useEffect_ a function that will be called when the component is unmounted.

_./src/demo.js_

```diff
export const MyChildComponent = () => {
  React.useEffect(() => {
    console.log("El componente se acaba de montar en el DOM");
+   return () => console.log("El componente se acaba de desmontar del DOM");
  }, []);
```

Any useful scenarios? Imagine that you open a connection to a websocket and you want to close it when the user hides the component, how do you free resources in a proper way? By using this approach.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
