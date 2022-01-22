[<img align="left" src="https://images.squarespace-cdn.com/content/v1/56cdb491a3360cdd18de5e16/1536155167931-3JJ7O74IM4QP88L0RQS9/3_200.png" alt="español" width="170"/>](https://lemoncode.net/) 


[<img align="right" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Spain_flag_icon.svg/1200px-Spain_flag_icon.svg.png" alt="english" width="50"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/07-custom-hook/Readme_es.md)
[<img align="right" src="https://assets.stickpng.com/images/580b585b2edbce24c47b2836.png" alt="inglés" width="47"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/07-custom-hook/Readme.md)
  
<br>
<br>

# 07 Custom hooks

## Resume

This example takes as its starting point the [_06-ajax-field-change_](https://github.com/Lemoncode/react-hooks-by-example/blob/master/06-ajax-field-change/Readme.md) example.

Hooks are cool, but our functional component seems to get cluttered, is
there a way to extract functionality outside the functional component?
and what's more important is there any chance to make it reusable for
other components? Yups! Custom hooks to the rescue.

# Steps

- First we copy the previous example, and execute _npm install_

```bash
npm install
```

- Let's start with the code in which we had a filtering _input_ and a list of users that came from the server. If you don't have it on hand here is the code:

_./src/demo.tsx_

```tsx
import React from "react";

export const MyComponent = () => {
  const [filter, setFilter] = React.useState("");
  const [userCollection, setUserCollection] = React.useState([]);

  // Load full list when the component gets mounted and filter gets updated
  React.useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
      .then(response => response.json())
      .then(json => setUserCollection(json));
  }, [filter]);

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

- Now let's extract the load + filter functionality in a custom hooks
  we will implement it using two flavours.

A. Encapsulating as well the _UseEffect_

_./src/demo.js_

```diff
import React from "react";

+ const useUserCollection = () => {
+  const [filter, setFilter] = React.useState("");
+  const [userCollection, setUserCollection] = React.useState([]);
+
+  // Load full list when the component gets mounted and filter gets updated
+  React.useEffect(() => {
+    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
+      .then(response => response.json())
+      .then(json => setUserCollection(json));
+  }, [filter]);
+
+  return {userCollection, filter, setFilter}
+ }

export const MyComponent = () => {
-  const [filter, setFilter] = React.useState("");
-  const [userCollection, setUserCollection] = React.useState([]);
+  const {userCollection, filter, setFilter} = useUserCollection();

-  // Load full list when the component gets mounted and filter gets updated
-  React.useEffect(() => {
-    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
-      .then(response => response.json())
-      .then(json => setUserCollection(json));
-  }, [filter]);

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

B. Encapsulating only the states plus load functions (the component will be
responsible of deciding when to call this methods)

_./src/demo.tsx_

```diff
import React from "react";

+ const useUserCollection = () => {
+  const [filter, setFilter] = React.useState("");
+  const [userCollection, setUserCollection] = React.useState([]);
+
+  const loadUsers = () => {
+    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
+      .then(response => response.json())
+      .then(json => setUserCollection(json));
+  }
+
+  return {userCollection, loadUsers, filter, setFilter}
+ }


export const MyComponent = () => {
+  const {userCollection, loadUsers, filter, setFilter} = useUserCollection();
+
+  React.useEffect(() => {
+    loadUsers();
+  }, [filter]);

-  const [filter, setFilter] = React.useState("");
-  const [userCollection, setUserCollection] = React.useState([]);

-  // Load full list when the component gets mounted and filter gets updated
-  React.useEffect(() => {
-    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
-      .then(response => response.json())
-      .then(json => setUserCollection(json));
-  }, [filter]);

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

> Discussion here... which approach do you think can be more reusable and under
> which circumstances (e.g. just create a custom hook to load the list of
> names without taking into account the filter).

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
