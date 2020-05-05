# 01 Use State

In this basic sample we will just add state to a function component, using
_React.useState_

# Steps

- We will take as starting point sample _00 boilerplate_. Copy the content of the
  project to a fresh folder an execute _npm install_.

```bash
npm install
```

- Let's open the _demo.js_ file and add our hooks based state.

_./src/demo.js_

```diff
import React from "react";

export const MyComponent = props => {
+    const [myName, setMyName] = React.useState('John Doe');

-  return <h2>My Component</h2>;
+    return(
+        <>
+            <h4>{myName}</h4>
+            <input
+                value={myName}
+                onChange={(e) => setMyName(e.target.value)}
+            />
+        </>
+    );
};
```

- Now if you run the sample you can check that the name (John Doe) will be displayed
  and you can edit it in the same functional component, we don't need a class component
  to hold state anymore, _React.useState_ does all the magic for you.
  
# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
  