# 04 Component unmount

When we worked with Class component there was a way to free resources (e.g.
a socket connection, or trapping x,y mouse coordinates...) when the component
was unmounted (componentWillUnMount), is there a way to do something like
that using hooks? The answer is yes, including more scenarios (beware to
proper learning them).

# Steps

- We will take as starting point sample _00 boilerplate_. Copy the content of the
  project to a fresh folder an execute _npm install_.

```bash
npm install
```

- Let's open the _demo.js_ file: this time we will create a parent component
  and a child component, the child component will be mounted / unmounted by
  clicking a button on the parent component.

In the child component we will make use of _React.useEffect_ and using
as a second parameter an empty array to ensure that the code that will
called by _useEffect_ will be only executed when the component is mounted.

Overwrite _demo.js_ file with the following content.

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

const MyChildComponent = () => {
  const [userInfo, setUserInfo] = React.useState({
    name: "John",
    lastname: "Doe"
  });

  React.useEffect(() => {
    console.log("called when the component is mounted");
  }, []);

  return (
    <div>
      <h3>
        {userInfo.name} {userInfo.lastname}
      </h3>
      <input
        value={userInfo.name}
        onChange={e => setUserInfo({ ...userInfo, name: e.target.value })}
      />
      <input
        value={userInfo.lastname}
        onChange={e => setUserInfo({ ...userInfo, lastname: e.target.value })}
      />
    </div>
  );
};
```

- What can be done to execute some code just when the component is unmounted?
  We only need to return a function inside the _useEffect_ entry, by doing this
  the function will be executed when the component is unmounted (since we
  are using as a second parameter an empty array).

_./src/demo.js_

```diff
  React.useEffect(() => {
    console.log("called when the component is mounted");

+    return () => console.log('Called on component unmounted, check the [] on the react use effect');
  }, []);
```

- If you run the sample and open the browser console, you can whenever we click to
  hide the child component the _unmounted_ function will be executed and the message
  will be displayed in the browser console log.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend

