# 09 Pure Components Callback

In the previous sample we saw how to make a component to be pure using
_React.memo_, that's great, but when using hooks, there's an issue
what happens if we pass the _setter_ function to the child component?
This _setter_ function will be always different on every render thus
the _memo_ won't take effect.

How can we solve this? We have to options using _useCallback_ or _useReducer_.

In this sample we will cover the _useCallback_ approach in the next one we will
use _useReducer_.

# Steps

- We will take as starting point sample _00 boilerplate_ copy the conent of the
  project to a fresh folder an execute _npm install_.

```bash
npm install
```

- Let's open the _demo.js_, we will create a parent and a child component
  (this time the child component will be able to display and edit a given name).

_./demo.js_

```jsx
import React from "react";

export const MyComponent = () => {
  const [userInfo, setUserInfo] = React.useState({
    name: " John ",
    lastname: "Doe"
  });

  return (
    <>
      <h3>
        {userInfo.name} {userInfo.lastname}
      </h3>
      <EditUsername
        name={userInfo.name}
        onChange={name =>
          setUserInfo({
            ...userInfo,
            name
          })
        }
      />
      <input
        value={userInfo.lastname}
        onChange={e =>
          setUserInfo({
            ...userInfo,
            lastname: e.target.value
          })
        }
      />
    </>
  );
};

const EditUsername = React.memo(props => {
  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return (
    <input value={props.name} onChange={e => props.onChange(e.target.value)} />
  );
});
```

- If we run the sample we will check that the render is always triggered
  (onChangeProp callback is always recreated, shallow compare will fail).

- The trick here is to use _React.useCallback_.

```diff
import React from "react";

export const MyComponent = () => {
  const [userInfo, setUserInfo] = React.useState({
    name: " John ",
    lastname: "Doe"
  });

+  const setUserNameCallback = React.useCallback((name) => {
+    setUserInfo({
+        ...userInfo,
+        name,
+    })
+  })


  return (
    <>
      <h3>
        {userInfo.name} {userInfo.lastname}
      </h3>
      <EditUsername
        name={userInfo.name}
+        onChange={setUserNameCallback}
-        onChange={e => ({
-          ...userInfo,
-          name: e.target.value
-        })}
      />
```

- Now if we run the sample we can check the expected behavior.
