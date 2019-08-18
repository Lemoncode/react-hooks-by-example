# 10 useReducer

In the previous sample we worked around the issue with the function 
that was getting updated on every render by using _useCallback_, this
approach is cool, but for more complex scenarios you may want to organize
your code using a different approach. Another way of solving this issue
is using _useReducer_, this hook will return a _dispatch_ 
function that remains stable.

# Steps

- We will take as starting point sample _00 boilerplate_. Copy the content of the
  project to a fresh folder an execute _npm install_.

```bash
npm install
```

- Let's open the _demo.js_. We will create a parent and a child component
  (this time the child component will be able to display and edit a given name).

_./src/demo.js_

```jsx
import React from "react";

export const MyComponent = () => {
  const [userInfo, setInfo] = React.useState({name: 'John', lastname: 'Doe'});

  return (
    <>
      <h3>
        {userInfo.name} {userInfo.lastname}
      </h3>
      <EditUsername name={userInfo.name} onChange={(name) => setInfo({
        ...userInfo,
        name,
      })} />
      <input
        value={userInfo.lastname}
        onChange={e => setInfo({
          ...userInfo,
          lastname: e.target.value,
        })}
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

- Let's fix this using _useReducer_

_./src/demo.js_

```diff
import React from "react";

+ const userInfoReducer = (state, action) => {
+  switch(action.type) {
+    case 'setusername': 
+      return {
+        ...state,
+         name: action.payload,
+      }
+    case 'setlastname':
+      return {
+        ...state,
+        lastname: action.payload,
+      }
+    default:
+      return state;
+  }
+ }

export const MyComponent = () => {
-  const [userInfo, setInfo] = React.useState({name: 'John', lastname: 'Doe'});
+  const [reducer, dispatch] = React.useReducer(userInfoReducer, {name: 'John', lastname: 'Doe'});

  return (
    <>
      <h3>
-        {userInfo.name} {userInfo.lastname}
+        {reducer.name} {reducer.lastname}
      </h3>
-      <EditUsername name={userInfo.name} onChange={(name) => setInfo({
-        ...userInfo,
-        name,
-      })} />
+      <EditUsername name={reducer.name} dispatch={dispatch} />
-      <input
-        value={userInfo.lastname}
-        onChange={e => setInfo({
-          ...userInfo,
-          lastname: e.target.value,
-        })}
+      <input
+        value={reducer.lastname}
+        onChange={e =>
+          dispatch({
+            type: "setlastname",
+            payload: e.target.value
+          })
+        }
+      />
      />
    </>
  );
};

const EditUsername = React.memo(props => {
  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return (
-    <input value={props.name} onChange={e => props.onChange(e.target.value)} />
+    <input
+      value={props.name}
+      onChange={e =>
+        props.dispatch({
+          type: "setusername",
+          payload: e.target.value
+        })
+      }
+    />
  );
});
```

- Now if we run the sample we will get the expected behavior.

Discussion here: seems to be an elegant approach, but we have to pass down the dispatcher, 
child components may be tied to this dispatcher.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
