# 06 Ajax field change

## Resume

This example takes as a starting point the example \ _05-component-update-render.

Let's check a practical example, we have a search result list(this comes from a server), and we want each time we enter a change to a filtering input, send a request to server to get the new filtered list and display it.

As dessert we will check how to use Debounce (that is, wait a little that the user finishes typing to send the reuest, saving so unnecessary calls).

# Steps

- First we copy the previous example, and do a _npm install_.

```bash
npm install
```

- Let's open the _demo.js_, and let's add an entry in the state that stores the current search filter, and another in which it stores a list of users.

_./src/demo.tsx_

```tsx
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

_./src/demo.tsx_

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

**BE CAREFUL!!! Typicode** works in a free heroku that falls asleep every X time :).

Let's try other APIs.

This will impact to the code, we have to make a change and check what these api return, we will do this as an exercise.

https://rickandmortyapi.com/

https://swapi.dev/documentation#auth

```tsx
React.useEffect(() => {
  fetch(`https://swapi.dev/api/people?search=${filter}`)
    .then((response) => response.json())
    .then((json) => setUserCollection(json.results));
}, [filter]);
```

- If we execute this code we can see that the filtering option works.

```bash
npm start
```

## BONUS

This is fine, but it isn't optimal, we usually want to triggerthe search just when the user has stopped typing to avoid making calls unnecessary.

We can download a library that implements a custom hook that does just that: https://github.com/xnimorz/use-debounce 

The only thing that we would have to do:

```bash
npm install use-debounce --save
```

```diff
+ import { useDebounce } from 'use-debounce';

export const MyComponent = () => {
  const [filter, setFilter] = React.useState("");
+ const [debouncedFilter] =   useDebounce(filter, 500);
  const [userCollection, setUserCollection] = React.useState([]);

  // Load full list when the component gets mounted and filter gets updated
  React.useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
      .then((response) => response.json())
      .then((json) => setUserCollection(json));
-  }, [filter]);
+  }, [debouncedFilter]);
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
