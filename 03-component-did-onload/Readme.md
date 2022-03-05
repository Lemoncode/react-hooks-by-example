[<img align="left" src="https://images.squarespace-cdn.com/content/v1/56cdb491a3360cdd18de5e16/1536155167931-3JJ7O74IM4QP88L0RQS9/3_200.png" alt="español" width="170"/>](https://lemoncode.net/) 


[<img align="right" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Spain_flag_icon.svg/1200px-Spain_flag_icon.svg.png" alt="english" width="50"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/03-component-did-onload/Readme_es.md)
[<img align="right" src="https://assets.stickpng.com/images/580b585b2edbce24c47b2836.png" alt="inglés" width="47"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/03-component-did-onload/Readme.md)
  
<br>
<br>

# 03 Component Did Mount

## Resume

This example takes as a starting point the [_02-use-state-object_](https://github.com/Lemoncode/react-hooks-by-example/blob/master/02-use-state-object) example.

Let's start practicing with another React's core hook: _useEffect_

This Hook allows us to subscribe on certain events (check when the
component is mounted, check when the component is unmounted, on
every render, or when a given property is updated).

Let's start with the most basic, execute a given code when a
component is mounted in the DOM.

A common scenario: you want to run some code when a component it's loaded into
the DOM, for example loading a list of clients when the component is mounted.

There can be scenarios when we need some code to be executed when a given
property value changes or right after each render.

There may be scenarios when all this operations are not synchronous? For instance I want making a call to a server rest api,
this will return a promise, it is not safe at all to run this directly in a functional component
since the functional component is executed and destroyed, to manage these side effects) we can make use of
_React.useEffect_

In this example we are going to simulate a call to a rest api, in order to retrieve a name (we will use
_setTimeout_).

## Steps

First we copy the previous example, and do a _npm install_

```bash
npm install
```

- Let's open the _demo.tsx_ file, and overwrite it with the following content.

_./src/demo.tsx_

```jsx
import React from "react";

export const MyComponent = () => {
  const [username, setUsername] = React.useState("");

  return (
    <>
      <h4>{username}</h4>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
    </>
  );
};
```

- If we run the example, the name field will be empty, but we want
  to assign some value right when the component is mounted? We can make use of
  _React.useEffect_ passing as a second argument an empty array (that's important
  if we don't pass this the code inside the _useEffect_ would be executed on
  mount and after every render).

_./src/demo.js_

```diff
import React from "react";

export const MyComponent = () => {
  const [username, setUsername] = React.useState("");

+  React.useEffect(() => {
+    setUsername("John");
+  }, []);

  return (
    <>
      <h4>{username}</h4>
      <input value={username} onChange={e => setUsername(e.target.value)} />
    </>
  );
};
```

- Now if you run the sample you can check that _John_ is displayed as user name.

* Let's go one step further, let's simulate an asynchronous call (we will do it
  using _setTimeout_).

_./src/demo.js_

```diff
import React from "react";

export const MyComponent = () => {
  const [username, setUsername] = React.useState("");

  React.useEffect(() => {
-    setUsername("John");
+    // Simulating async call
+    setTimeout(() => {
+      setUsername("John");
+    }, 1500);
  }, []);

  return (
    <>
      <h4>{username}</h4>
      <input value={username} onChange={e => setUsername(e.target.value)} />
    </>
  );
};
```

- Now _John_ is displayed after 1,5 seconds, instead of _setTimeout_ you could
  use here _fetch_ or any other similar approach to make an ajax request.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
