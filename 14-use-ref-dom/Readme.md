# 14 React.useRef DOM

In the previous example we introduced the hook _userRef_, in this example
we are going to use it to access a node of the DOM.

# Steps

- We take as a starting point _13-async-closure_, we copy the content
  and we do a _npm install_.

```bash
npm install
```

- In _demo.tsx_ we paste the following code (note that here we define
  the _useRef_ and associate it in the _div_ container)

_./src/demo.tsx_

```tsx
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


- In this example we are going to show the current width of the container using the associated _ref_ to the element of the _dom_

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

- If we execute, we can see how it now gives us the current result when we press
  on the button.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend