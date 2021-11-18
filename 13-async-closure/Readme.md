# 13 Promise Unmounted

## Resume

This example takes the _12-set-state-func_ example as a starting point.

In the previous example we saw how to solve the problem of calls
asynchronous, and the _setState_ taking old values, this is fine
if there is only one variable in play, but if there is more than one, we can
have problems, in order to solve this edge case, React provides us with the _userRef_ hook

Let's check how it works.

## Steps

- First we copy the previous example, and do a _npm install_

```bash
npm install
```

- Let's go for the example, what are we going to do?

Regarding data:

- We are going to have a second counter, we save it in the state.
- We will have a message to show how many seconds there are.

Regarding functionality:

- When we assemble the component for the first time, the value of seconds will be 0.
- When one second passes, we will set the value of seconds to 1.
- When two seconds pass we will set the value of the message
  (showing those seconds).

In the component:

- We show the number of seconds.
- We show the message.

> This case is made to check how _useRef_ works you could
> solve in other, more optimal ways.

```tsx
import React from "react";

export const MyComponent = () => {
  const [message, setMessage] = React.useState("initial message");
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      console.log(seconds);
      setSeconds(1);
    }, 1000);

    setTimeout(() => {
      setMessage(`Total seconds: ${seconds}`);
    }, 2000);
  }, []);

  return (
    <>
      <h3>{message}</h3>
      <h4>{seconds}</h4>
    </>
  );
};
```

If we weren't aware of the problem with closures, we would expect
that the final message was "Total seconds: 1", but we will execute it and see that
the message that appears on the screen is "Total seconds: 0"

To solve this, the guys at Facebook provide us with the _useRef_ hook, this hook:

- Stores a initial value (same as with useState).
- Returns an object to us.
- This object has a _current_ property which is a mutable variable
  (here the value of the seconds would be stored), if we modify this value
  in a future render, it will be counted in a past one (an asynchronous call.)
- When another render comes, _useRef_ returns the same instance of the object.

Let's check it in action:

_./src/demo.tsx_

```diff
import React from "react";

export const MyComponent = () => {
  const [message, setMessage] = React.useState("initial message");
  const [seconds, setSeconds] = React.useState(0);

+ const secondsRef = React.useRef(seconds);

  React.useEffect(() => {
    setTimeout(() => {
      console.log(seconds);
      setSeconds(1);
+      secondsRef.current = 1;
    }, 1000);

    setTimeout(() => {
-      setMessage(`Total seconds: ${seconds}`);
+      setMessage(`Total seconds: ${secondsRef.current}`);
    }, 2000);
  }, []);

  return (
    <>
      <h3>{message}</h3>
      <h4>{seconds}</h4>
    </>
  );
};
```

- If we execute it, we will see how it now works correctly.

```bash
npm start
```

- This is very good, but do we have a way to avoid it? If we had
  used an object yes, let's see how the SetState works using a
  function to assign the value.

- First we are going to encapsulate message and seconds in an object:

```diff
export const MyComponent = () => {
-  const [message, setMessage] = React.useState("initial message");
-  const [seconds, setSeconds] = React.useState(0);
-  const secondsRef = React.useRef(seconds);
+  const [info, setInfo] = React.useState({
+    message: 'initial message',
+    seconds: 0,
+ });
```


- We are now going to change the content of the useEffect, pay attention to the setState
  that we are going to use it as a function, giving us the last value:

```diff
- const secondsRef = React.useRef(info.seconds);

  React.useEffect(() => {
    setTimeout(() => {
-      console.log(seconds);
-      setSeconds(1);
-      secondsRef.current = 1;
+      console.log(info.seconds);
+      setInfo(info => {...info, seconds: 1})
    }, 1000);

    setTimeout(() => {
-      setMessage(`Total seconds: ${secondsRef.current}`);
+      setInfo(info => ({...info, message: `Total seconds: ${info.seconds}`}));
    }, 2000);
  }, []);
```

- And we update the render

```diff
  return (
    <>
-      <h3>{message}</h3>
-      <h4>{seconds}</h4>
+      <h3>{info.message}</h3>
+      <h4>{info.seconds}</h4>

    </>
  );
```


- If we execute we will see how it works.

```bash
npm start
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
