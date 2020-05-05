# 03 Component Did Mount

Reading from the state and updating it on a functional component is something great,
but we are missing another important part of class components, what about
lifecycle event handlers like _componentDidMount_? How can we hook to an event
like that in a functional component? _React.useEffect_ is your friend.

# Steps

- We will take as starting point sample _00 boilerplate_. Copy the content of the
  project to a fresh folder an execute _npm install_.

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

