[<img align="left" src="https://images.squarespace-cdn.com/content/v1/56cdb491a3360cdd18de5e16/1536155167931-3JJ7O74IM4QP88L0RQS9/3_200.png" alt="español" width="170"/>](https://lemoncode.net/) 


[<img align="right" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Spain_flag_icon.svg/1200px-Spain_flag_icon.svg.png" alt="english" width="50"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/06-ajax-field-change/Readme_es.md)
[<img align="right" src="https://assets.stickpng.com/images/580b585b2edbce24c47b2836.png" alt="inglés" width="47"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/06-ajax-field-change/Readme.md)
  
<br>
<br>

# 06 Ajax field change

## Resume

This example takes as a starting point the example [_05-component-update-render_](https://github.com/Lemoncode/react-hooks-by-example/blob/master/05-component-update-render/Readme.md).

Let's simulate a real scenario, we have a search result list(we read this from a server source), and each time that we enter a change to a filtering input we want to send a request to the server to get the new filtered list and display it.

As a bonus, we will check how to use Debounce (wait a little until the user stops typing to send the request, saving so unnecessary calls).

# Steps

- First we copy the previous example, and do a _npm install_.

```bash
npm install
```

- Let's open the _demo.js_, and let's add an entry in the state that stores the current search filter, and another state in which we
  are going to store a list of users.

_./src/demo.tsx_

```tsx
import React from "react";

export const MyComponent = () => {
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

- Now we want to fire an _ajax request_ every time the user types on the filter input.

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

**BE CAREFUL!!! Typicode** since we are hitting a free rest api it maybe down or asleep, maybe you will have to give some tries :).

You can try as with other apis as well (you will need to take a look at the documention, some of them return slightly different
response structures).

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

This is fine, but it isn't optimal, we usually want to trigger the search just when the user has stopped typing to avoid making unnecessary calls.

We can download a library that implements a custom hook that just implements that behavior: https://github.com/xnimorz/use-debounce

Using this is a piece of cake:

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
