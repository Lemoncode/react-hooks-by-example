# 03 Component Did Mount

## Resume

This example takes as a starting point the _02-use-state-object_ example.

Let's start playing with another of React's core hooks: _useEffect_

This Hook allows us to get hooked on certain events in time and power
run code.

Let's start with the most basic, execute a code just when a
component is mounted in the DOM.

There are many operations that you want to execute right when it's loaded into
the DOM of the browser your component (when it starts to be viewed), for
Example loading a token from a client from a server REST API.

There are also operations that we want to be able to execute when a
value, or in after each render.

What if those operations are not synchronous? For example I want
pull a setTimeout or make a call to a server, this will return a promise, it is not safe at all to run this directly in a functional component
since this is executed and destroyed, for this (manage side effects) we have
_React.useEffect_

In this example we are going to see how to change a name, just when
mount the component, then we'll simulate an asynchronous call
using _setTimeout_.

## Steps

First we copy the previous example, and do a _npm install_

```bash
npm install
```

- Let's open the _demo.js_ file, and overwrite it with the following content.

_./src/demo.js_

```jsx
import React from "react";

export const MyComponent = () => {
  const [username, setUsername] = React.useState("");

  return (
    <>
      <h4>{username}</h4>
      <input value={username} onChange={e => setUsername(e.target.value)} />
    </>
  );
};
```

- If we run the sample, nothing will be shown (name is empty), what if we want
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

