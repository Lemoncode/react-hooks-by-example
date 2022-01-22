
[<img align="left" src="https://images.squarespace-cdn.com/content/v1/56cdb491a3360cdd18de5e16/1536155167931-3JJ7O74IM4QP88L0RQS9/3_200.png" alt="español" width="170"/>](https://lemoncode.net/) 


[<img align="right" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Spain_flag_icon.svg/1200px-Spain_flag_icon.svg.png" alt="english" width="50"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/15-promise-unmounted/Readme_es.md)
[<img align="right" src="https://assets.stickpng.com/images/580b585b2edbce24c47b2836.png" alt="inglés" width="47"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/15-promise-unmounted/Readme.md)
  
<br>
<br>


# 15 Promise unmounted

## Resume

This example takes as a starting point the example [_14-use-ref-dom_](https://github.com/Lemoncode/react-hooks-by-example/blob/master/14-use-ref-dom).

When we make a request to a rest api or similar (an AJAX call),
React can generate a memory leak if we remove the component from the DOM that has
made the call while the request is in progress.

What is the specific problem? We try to do a _setState_ in a
component that is no longer in the DOM (that space for the state has been freed).

How can we avoid this? Detecting when a component is mounted and dismounted, doing
this check manually can be a pain in the neck, but we can get benefit of hooks
to automate this check.

## Steps

- First we copy the previous example, and execute a _npm install_

```bash
npm install
```

- Let's take as starting point an example where we show / hide a child
  component that does an AJAX request.

_./src/demo.tsx_

```tsx
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
};

export const MyChildComponent = () => {
  const [filter, setFilter] = React.useState("");
  const [userCollection, setUserCollection] = React.useState([]);

  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <ul>
        {userCollection.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

- Now we want to launch an ajax request every time the user writes in the filter's text field (we'll add some latency).

_./src/demo.js_

```diff
export const MyChildComponent = () => {
  const [filter, setFilter] = React.useState('');
  const [userCollection, setUserCollection] = React.useState([]);

+  // Load full list when the component gets mounted and filter gets updated
+  React.useEffect(() => {
+    setTimeout(() => {
+      fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
+          .then(response => response.json())
+          .then(json => setUserCollection(json));
+    }
+    , 2500)
+  }, [filter]);

  return (
```

- If you execute the example, try this: write a char in the input and quickly press the button to hide the child component. In the console log you will see an error.

_Warning: In React you cannot update the status of a dismounted component. It is a no-op, but it is an indication of a memory leak in your application. To fix this, cancel all subscriptions and asynchronous tasks in a cleanup function in a useEffect._

- We can detect when a component has been unmounted using a _useRef_ hook.

```diff
export const MyChildComponent = () => {
  const [filter, setFilter] = React.useState("");
  const [userCollection, setUserCollection] = React.useState([]);

+ const mountedRef = React.useRef(false);

+ React.useEffect(() => {
+   mountedRef.current = true;
+   return () => {mountedRef.current = false}
+ }, [])

+ const setSafeUserCollection = (userCollection) => mountedRef.current && setUserCollection(userCollection);

  // Load full list when the component gets mounted and filter gets updated
  React.useEffect(() => {
```

Then we can resolve our _fetch_ call as follows:

```diff
  React.useEffect(() => {
    setTimeout(() => {
      fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
        .then(response => response.json())
-        .then(json => setUserCollection(json));
+        .then(json => setSafeUserCollection(json));
    }, 2500);
  }, [filter]);
```

- Repeating this in each component can add unnecessary code that gets repeated on an on, couldn't we make it more generic?
  Let's give it a spin:

```diff
+ const useSafeState = () => {
+  const mountedRef = React.useRef(false);
+
+  React.useEffect(() => {
+    mountedRef.current = true;
+    return () => {mountedRef.current = false};
+  }, []);
+
+  const isMounted = () => mountedRef.current;
+
+  return {isMounted}
+ }

export const MyChildComponent = () => {
  const [filter, setFilter] = React.useState("");
  const [userCollection, setUserCollection] = React.useState([]);
+
+ const {isMounted} = useSafeState();
-  const mountedRef = React.useRef(false);
-
-  React.useEffect(() => {
-    mountedRef.current = true;
-    return () => (mountedRef.current = false);
-  }, []);


  const setSafeUserCollection = userCollection =>
-    mountedRef.current && setUserCollection(userCollection);
+    isMounted() && setUserCollection(userCollection);

```

- Let's give it another twist. Could we make a wrapper?
  of _useState_?

```diff
- const useSafeState = () => {
+ const useSafeState = function<T>(initialValue : T) : [T, React.Dispatch<React.SetStateAction<T>>] {
  const mountedRef = React.useRef(false);

+  const [state, setState] = React.useState<T>(initialValue);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);

  const isMounted = () => mountedRef.current;

+  const setSafeState = function (
+    data: T
+  ): React.Dispatch<React.SetStateAction<T>> | void {
+    return isMounted() ? setState(data) : null;
+  };

-  return { isMounted };
+  return [state, setSafeState]
};

export const MyChildComponent = () => {
  const [filter, setFilter] = React.useState("");
-  const [userCollection, setUserCollection] = React.useState([]);
+  const [userCollection, setUserCollection] = useSafeState([]);

-  const { isMounted } = useSafeState();

-  const setSafeUserCollection = (userCollection) =>
-    isMounted() && setUserCollection(userCollection);

  // Load full list when the component gets mounted and filter gets updated
  React.useEffect(() => {
    setTimeout(() => {
      fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
        .then((response) => response.json())
-        .then((json) => setSafeUserCollection(json));
+        .then((json) => setUserCollection(json));
    }, 2500);
  }, [filter]);
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
