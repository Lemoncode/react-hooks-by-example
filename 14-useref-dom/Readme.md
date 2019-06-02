# 14 React.useRef DOM

A common use case for _useRef_ is to access a dom element child imperatively.

# Steps

- We will take as starting point sample _00 boilerplate_. Copy the content of the
  project to a fresh folder an execute _npm install_.

```bash
npm install
```

- We will use _useRef_ to get the div element clientWidth.
  First, we need render a div element and create the ref with _useRef_.

_./src/demo.js_

```jsx
import React from "react";

export const MyComponent = () => {
  const containerElementRef = React.useRef(null);

  return <div className="container" ref={containerElementRef} />;
};
```

_./styles.css_

```diff
.App {
  font-family: sans-serif;
  text-align: center;
}

+.container {
+  border: 1px solid steelblue;
+  margin: 15px;
+  padding: 50px;
+}
```

- In this example we will display the given container width using the ref to this dom element, this action will be triggered when the user clicks on a button:

```diff
import React from "react";

export const MyComponent = () => {
  const containerElementRef = React.useRef(null);
+ const [message, setMessage] = React.useState(
+   "Click button to get container width"
+ );

+ const calculateContainerWidth = () => {
+   setMessage(`Container width: ${containerElementRef.current.clientWidth}px`);
+ };

  return (
    <div className="container" ref={containerElementRef}>
+     <h2>{message}</h2>
+     <button onClick={calculateContainerWidth}>
+       Calculate container width
+     </button>
    </div>
  );
};

```

- Now if we run the sample we will get the expected behavior.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
