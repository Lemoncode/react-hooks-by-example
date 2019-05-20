# 13 Promise Unmounted

There are situations where we just fire an AJAX request and we cannot cancel it, it can happen
that the users navigates away from a given page (or the component making the ajax call
gets unmounted) before the promise gets resolved, What happens when the promise gets resolved? 
We get an error, how can we avoid this? tracking when a component gets mounted and unmounted,
let's check how can we do this using hooks.

# Steps

- We will take as starting point sample _00 boilerplate_. Copy the content of the
  project to a fresh folder an execute _npm install_.

```bash
npm install
```

- Let's open the _demo.js_, we will create the boiler plate code
  (add a filter input, display a list of names)

_./src/demo.js_

```jsx
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
}

export const MyChildComponent = () => {
  const [filter, setFilter] = React.useState("");
  const [userCollection, setUserCollection] = React.useState([]);

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <ul>
        {userCollection.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

- Now we want to fire an ajax request every time user types on the filter input (we will add
some latency).

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

- If we run the sample, type a letter on the input and quickly hit on the toggle child component
visibility button an error will popup in the console log.

_Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function._

- We can detect when a given component has been unmounted by using a Ref flag.

```diff
export const MyChildComponent = () => {
  const [filter, setFilter] = React.useState("");
  const [userCollection, setUserCollection] = React.useState([]);

+ const mountedRef = React.useRef(false);

+ React.useEffect(() => {
+   mountedRef.current = true;
+   return () => (mountedRef.current = false)
+ }, [])

+ const setSafeUserCollection = (userCollection) => mountedRef.current && setUserCollection(userCollection);

  // Load full list when the component gets mounted and filter gets updated
  React.useEffect(() => {
```

Then in our _fetch_ call we can resolve it in the following way:

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
> Excercise: we could encapsulate the fetching plus the setSafeUserCollection in a hook,
why not giving a try? ;)

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
