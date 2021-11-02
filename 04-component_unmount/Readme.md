# 04 Component unmount

## Resume

This example takes the _03-component-dom-onload_ example as a starting point.

In this example we are going to see how to free resources when we unmount a DOM component.

# Steps

- First we copy the previous example, and execute _npm install_.

```bash
npm install
```

- We are going to create a component that shows or hides a text depending on of a boolean flag.

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
}
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

And if we instead of a \ _h4 \ _ \ _, we instantiate a component:

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
- Now we have a children component that clicking on a button it's mount or dismount from the DOM.

How could we do to display a message on the console
browser when the child component will be mounted?
If we remember the previous example, it would be with _React.useEffect_.
Do you dare to try it? Pause the video and try it :)

We could do something like:

_./src/demo.tsx_

```diff
export const MyChildComponent = () => {
+ React.useEffect(() => {
+  console.log('El componente se acaba de montar en el DOM')
+ }, [])
+
  return <h4>Hello form child component</h4>;
};
```

- Now comes the interesting part, and if we want to show a message by the browser console when the component is unmounted from the DOM?  In the same function that we put as the first parameter we return the "cleanup" function ... _useEffect_ is going to save that function until I unmount the DOM to invoke it:


_./src/demo.js_

```diff
export const MyChildComponent = () => {
  React.useEffect(() => {
    console.log("El componente se acaba de montar en el DOM");
+   return () => console.log("El componente se acaba de desmontar del DOM");
  }, []);
```
What can this do for me? Imagine that you open a connection to a websocket and you want to close it when the user hides the component, how do you free resources in an orderly manner? Here it is.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend

