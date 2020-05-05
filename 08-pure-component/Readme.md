# 08 Pure Components

When we used class components we could make use of PureComponents, these
components will just make a shallow compare of the props and only render
if there were changes. Is there a way to do this using hooks? Yes,
using _React.memo_

# Steps

- We will take as starting point sample _00 boilerplate_. Copy the content of the
  project to a fresh folder an execute _npm install_.

```bash
npm install
```

- Let's open the _demo.js_, we will create a parent and a child component

_./src/demo.js_

```jsx
import React from "react";

export const MyComponent = () => {
  const [userInfo, setUserInfo] = React.useState({
    name: " John ",
    lastname: "Doe"
  });

  return (
    <>
      <DisplayUsername name={userInfo.name} />
      <input
        value={userInfo.name}
        onChange={e =>
          setUserInfo({
            ...userInfo,
            name: e.target.value
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

export const DisplayUsername = props => {
  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return <h3>{props.name}</h3>;
};
```

- If we run the sample we can check that any time we change for instance
  _lastname_ it will rerender _DisplayUsername_, the optimal approach
  could be only to rerender _DisplayUsername_ just when the _props.name_
  is updated, if we wrap the _DisplayUsername_ component using _React.memo_
  it will do the trick for us.

_./src/demo.js_

```diff
- export const DisplayUsername = props => {
+ export const DisplayUsername = React.memo(props => {

  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return <h3>{props.name}</h3>;
- };
+ });
```

- Now if we run the sample we can check (by showing the console or open react dev
  tools) that the _DisplayUsername_ component is only rerendered when the _name_ property
  changes.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend

