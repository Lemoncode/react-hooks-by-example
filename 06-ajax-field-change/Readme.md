# 06 Ajax field change

Let's face the following scenario. A given user can enter a name on a input field,
we want to trigger an ajax called each time the user types a value on the input
(returned the filtered list of names). We can do this using _useEffect_ indicating
in the second argument, instead of an empty array, the field name used to trigger
the call.

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

- Now we want to fire an ajax request every time user types on the filter input.

_./src/demo.js_

```diff
export const MyComponent = () => {
  const [filter, setFilter] = React.useState('');
  const [userCollection, setUserCollection] = React.useState([]);

+  // Load full list when the component gets mounted and filter gets updated
+  React.useEffect(() => {
+    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
+        .then(response => response.json())
+        .then(json => setUserCollection(json));
+  }, [filter]);

  return (
```

> We are making use here of the create _jsonplaceholder_ rest mock api.

- If we run the sample we can check that every time we start typing on the input
  an ajax called is triggered returning the list of results filtered by the filter
  field.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
