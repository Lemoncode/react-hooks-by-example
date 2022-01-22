[<img align="left" src="https://images.squarespace-cdn.com/content/v1/56cdb491a3360cdd18de5e16/1536155167931-3JJ7O74IM4QP88L0RQS9/3_200.png" alt="español" width="170"/>](https://lemoncode.net/) 


[<img align="right" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Spain_flag_icon.svg/1200px-Spain_flag_icon.svg.png" alt="english" width="50"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/01-use-state/Readme_es.md)
[<img align="right" src="https://assets.stickpng.com/images/580b585b2edbce24c47b2836.png" alt="inglés" width="47"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/01-use-state/Readme.md)
  
<br>
<br>

# 01 Use State

## Resume

This example takes the [_00-boiler-plate_](https://github.com/Lemoncode/react-hooks-by-example/blob/master/00-boilerplate) example as a starting point.

Let's start by creating a component that displays a name in an **h4**,
and can be edited using an **input**.

## Steps

- First we copy the previous example, and do a _npm install_

```bash
npm install
```

- Let's create a file that we will call _demo.tsx_, let's go step by step
  First we import **React**.

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

- Using the reserved word _export_ we can expose this file to other modules.

- It is not strictly necessary to type it with _React.FC_ (Function Component), but It's a good idea, sticking to _Typescript_ will help us to have
  fewer headaches in the future.

- The component is just a function that returns elements from React.
  Notice that in this case we have not added _Props_ since it does not consume any.

- Let's go for the interesting part, surely if we use the Java on Angular
  mindset, we would ty implementing something like (**IMPORTANT: THIS IS WRONG**).

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

If you come to a React project and you come across code like this, it's a bad smell, looks like the person that have coded it did not take the time to learn the basics of this library, let's see why:

- When creating a variable, each time the component is repainted, the value
  of the variable _myName_ will always be _John Doe_, why? the component
  is just function that is executed over and over on each repaint.

- If we asign a value directly to the _input_ contro, we are skipping to
  main pillars of React: unidirection flow and asynchronous state assignment.

If you want to see it in action (input not working) you just have to add it to the _app.tsx_ file

_./src/app.tsx_

```diff
import React from "react";
+ import {MyComponent} from './demo';

export const App = () => {
-  return <h1>Hello React !!</h1>;
+  return <MyComponent/>
};
```

Ok ... How can I handle this? Using React hooks! Let's take a look to _React.useState_, this hook:

- Is initialized with a default value.

- It returns an array that contains a getter and a setter (it allows you
  to access the value that is in useState and allows you
  make a request and set it asynchronously).

- The most comfortable way to consume what _useState_ returns is to apply
  destructuring, you have to take into consideration that the first element of the array will always be our _getter_ and the second our \ \_setter.

Why the heck does _useState_ use an array? Here comes the interesting part, if I had returned an object, when applying destructuring the fields (getter / setter) would have to stick to an specific name of getter and one of setter, this is a bummer because in a component we can have multiple states, and we also want to add
semantic to names, why have a generic _setState_ when we can
have a _setName_ or a _setLastname_?

- Let's go and code this component using _Hooks_.

First we make use of the _setState_

_./src/demo.tsx_

```diff
export const MyComponent: React.FC = () => {
-  let myName = "John Doe";
+  const [myName, setMyName] = React.useState('John Doe');
```

- As we have named our _getter_ _myName_ it works for us
  to both to display the name in the _h4_, as well as in the
  _input_

- Now comes the interesting part, to be able to capture when
  the user types in the input we subscribe to the event
  _onChange_ (this is a standard HTML event, more info [MDN](https://developer.mozilla.org/en/docs/Web/API/HTMLElement/change_event)).

What do we have here?

- \*_e_: argument of the _eventHandler_, gives us information about the event, exposes a series of properties ..
- **e.target**: which DOM element generated the event.
- **e.target.value**: what value does this element have (the value property
  of the DOM Element that generated the event).

In this event handler, we collect the current typed value from the event
arguments and pass it to the _myName_ _setState_ function.

```diff
  <h4>{myName}</h4>
  <input
    value={myName}
-    onChange={(e) => (myName = e.target.value)}
+    onChange={(e) => (setMyName(e.target.value))}
  />
```

How is going to work?

- _setMyName_ request update the state.
- This will launch a rerender of the component.
- When the component code is executed and reaches the line
  code that does the _useState_ instead of return _John Doe_, it will
  will supply the name that was stored with _setState_
- When rerendering the component that new value will be shown in the
  screen.

You have to change your mindset, ... try to repeat this example
without help and understand it well, it is your first big step to understand
how this technology works.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
