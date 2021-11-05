# 09 Pure Components Callback

In the previous sample we saw how to make a component to be pure using
_React.memo_, that's great, but when there's an issue
what happens if we pass the function created inside function component to the child component?
That  function will be always different on every render thus
the _memo_ won't take effect.

How can we solve this? We can make use of _useCallback_, this won't mutate the setter 
function unless we indicate any dependency (same approach as with _React.useEffect_).

# Steps

- We will take as starting point sample _00 boilerplate_. Copy the content of the
  project to a fresh folder an execute _npm install_.

```bash
npm install
```

- Let's open the _demo.tsx_. We will create a parent and a child component
  (this time the child component will just reset the name content).

_./src/demo.tsx_

```tsx
import React from "react";

interface Props {
  onReset: () => void;
}

const ResetValue: React.FC<Props> = React.memo((props) => {
  console.log(
    "Hey I'm only rendered the first time, check React.memo + callback"
  );

  return <button onClick={props.onReset}>Reset value</button>;
});

export const MyComponent = () => {
  const [username, setUsername] = React.useState("John");
  const [lastname, setLastname] = React.useState("Doe");

  const resetNameCallback = () => {
    setUsername("");
  };

  return (
    <>
      <h3>
        {username} {lastname}
      </h3>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <input value={lastname} onChange={(e) => setLastname(e.target.value)} />
      <ResetValue onReset={resetNameCallback}>Reset name</ResetValue>
    </>
  );
};
```

- If we run the sample we will check that the render is always triggered
  (_resetNameCallback_  is always recreated, shallow compare will fail).

- The trick here is to use _React.useCallback_ and passing as a second
argument an empty array (it will just hold the reference for the function
forever).


```diff
import React from "react";

export const MyComponent = () => {
  const [username, setUsername] = React.useState("John");
  const [lastname, setLastname] = React.useState("Doe");


-  const resetNameCallback = () => {setUsername('');}
+  const resetNameCallback = React.useCallback(() => setUsername(''), []);

  return (
    <>
      <h3>
        {username} {lastname}
      </h3>
      <input value={username} onChange={e => setUsername(e.target.value)} />
      <input value={lastname} onChange={e => setLastname(e.target.value)} />
      <ResetValue onReset={resetNameCallback}>Reset name</ResetValue>
    </>
  );
};

const ResetValue = React.memo(props => {
  console.log(
    "Hey I'm only rendered the first time, check React.memo + callback"
  );

  return (
    <button onClick={props.onReset}>Reset value</button>
  );
});
```

- If we runt he example, we can see that the rerender is no longer launched in the component.

How does this work? _useCallback_ will return a function that was originally created, and it returns this instead of creating a new one in each render, we achive this by passing an empty array as a second argument(as we did with _React.useEffect_) and if we omit the second parameter, this function will be reevaluated after each render.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
