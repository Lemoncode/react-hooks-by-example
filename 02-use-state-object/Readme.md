# 02 Use State Object

In the previous sample we learnt how to make use of _useState_ to add state
to a functional component. We just added a simple field (string), but what
if we want to useState on an object? What is the equivalent to class
component based _SetState_? Your friend spread operator :), let's hop on that.

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
+    const [userInfo, setUserInfo] = React.useState({
+       name: 'John',
+       lastname: 'Doe',
+    });

-  return <h2>My Component</h2>;
+    return(
+        <>
+            <h4>{userInfo.name} {userInfo.lastname}</h4>
+            <input
+                value={userInfo.name}
+                onChange={(e) => setUserInfo({
+                   ...userInfo,
+                    name: e.target.value
+                })}
+            />
+            <input
+                value={userInfo.lastname}
+                onChange={(e) => setUserInfo({
+                    ...userInfo,
+                    lastname: e.target.value
+                })}
+            />
+        </>
};
```

- Now if you run the sample you can check that you can update both properties
  _name_ and _lastname_, you can easily assign an object to useState, and in order
  to update it you can just make use of the _spread operator_ instead of using
  _setState_.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend

