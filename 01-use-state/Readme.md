# 01 Use State

## Resume

This example takes the _00-boiler-plate_ example as a starting point.

Let's go to create a component that, on the one hand, shows a name in an **h4**,
and on other allow to edit it using an **input**.

## Steps

- First we copy the previous example, and do a _npm install_

```bash
npm install
```

- Let's go to create a file that we will call _demo.tsx_, let's go step by step
  First we import **React** Why if first I don't use anything that
  put _React._ because at the moment we start putting tsx / jsx
  (that is, those _h1_, _input_ or _div_ that are later translated into
  _React.createElement_ needs to be imported).

_demo.tsx_

```tsx
import React from "react";
```

Add a function component to the file:

_demo.tsx_

```tsx
export const MyComponent: React.FC = () => {
  return <>Prueba</>;
};
```

- Using the reserved word _export_ we can expose this file to the outside.
- It is not strictly necessary to type it with _React.FC_ (Function Component), but
  It's a good idea, everything we stick to _Typescript_ will help us to have
  fewer headaches in the future.
- The component is nothing more than a function that returns elements from React.
  Notice that in this case we have not put _Props_ since it does not consume any
  of the outside.

- Let's go for the interesting part, surely our mind Java on Angular
  It moves us to implement the following (**IMPORTANT: THIS IS WRONG**).

```diff
export const MyComponent : React.FC = () => {
+ let myName = 'John Doe';
  return (
    <>
-    Prueba
+    <h4>{myName}</h4>
+    <input
+      value={myName}
+      onChange={(e) => myName = e.target.value}
+     />
    </>
  )
}
```


If you come to a React project and you come across code like this, it smells like the
who have coded it did not take the time to learn the basics of this
libraries, let's see why:

- When creating a variable, each time the component is repainted
  _myName_ will always be valid _John Doe_, this is still a function that is
  run over and over on each repaint.

- Assigning directly in the _input_ a value to a variable we load
  two of the pillars of React, unidirectional flow, and that setting the
  state is asynchronous.

If you want to see it in action you just have to add it to the _app.tsx_ file

_./src/app.tsx_

```diff
import React from "react";
+ import {MyComponent} from './demo';

export const App = () => {
-  return <h1>Hello React !!</h1>;
+  return <MyComponent/>
};
```

Ok ... How can I handle this? With React hooks! Have
_React.useState_

- It is initialized with a default value.

- It returns an array that contains a getter species and a setter (it allows you
  access the value that is in useState and allows you
  make a request and set it asynchronously).

- The most comfortable way to consume what that _useState_ returns is to do
  destructuring knowing that the first element of the array will always be
  our _getter_ and the second our \ _setter.


Why the heck does he use an array? Here comes the genius, if I had returned
an object, when destructuring the object we would have had to
to a concrete name of getter and one of setter, this is a bummer because
in a component we can have multiple states, and we also want to add
meaning to names, why have a generic _setState_ when we can
have a _setName_ or a _setLastname_?

- Let's go to mount this component with _Hooks_.

First we make use of the _setState_

_./src/demo.tsx_

```diff
export const MyComponent: React.FC = () => {
-  let myName = "John Doe";
+  const [myName, setMyName] = React.useState('John Doe');
```

- As we have named our _getter_ _myName_ it works for us
  both to display the name in the _h4_, as well as in the
  _input_

- Now comes the interesting part, to be able to capture when
  the user types in the input we subscribe to the event
  _onChange_ (this is a standard HTML event, more info [MDN](https://developer.mozilla.org/en/docs/Web/API/HTMLElement/change_event)).

What do we have here?

  - \*_e_: argument of the _eventHandler_, gives us information about the event, exposes a series of properties ..
- **e.target**: which DOM element generated the event.
- **e.target.value**: what value does this element have (the value property
  of the DOM Element that generated the event).

In this event handler, take advantage of it to collect the input value and ask
set the state of _myName_.

```diff
  <h4>{myName}</h4>
  <input
    value={myName}
-    onChange={(e) => (myName = e.target.value)}
+    onChange={(e) => (setMyName(e.target.value))}
  />
```

What is going to cause this?

- That the _setMyName_ request update the state.
- This will launch a repaint of the component.
- When the component code is executed and reaches the line
  code that does the _useState_ instead of _John Doe_ will
  will supply the name that was stored with _setState_
- When repainting the component that new value will be used showing it
  per screen.

It's a big change of mind, ... try to repeat this example
without help and understand it well, it is your first big step to understand
how this technology works.
# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend