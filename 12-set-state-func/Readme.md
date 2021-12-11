# 12 set state func

## Resume

This example takes the _11-use-context_ example as a starting point.

### Short explanation

An important issue to consider with hooks and functional components
is that the functions are executed once and die ( hooks serve as data stores
among other things), but if we make an asynchronous call,
the closure principle will be applied and if we need to retrieve any
state data it will just hold a frozen value from the past.

### Long explanation

One of the fundamental prerequisites to be able learn React is to have
a solid undertanding of Javascript and ES6. In this case you need to have
a good understanding of the _clousure_ concept.

Functional components are just that, functions:

- They are invoked.
- They run.
- They die.

If we remember the concept of closure, when we launch an asynchronous call it allowed me (in the async response handler)
to access variables of the parent function that even though this function was already dead.

If we apply this concept to React, we can find a curious case:

- Imagine that we have a discount value in a state.
- We make an asynchronous call to the server so that it gives us the total of the order.
- While the call is in progress the discount field changes.
- In the server's response we multiply the order total by the discount.

What discount value do you think will be appled, the old or the new one? ... Ouch!, the
old one, Why? ... let's think about a closure, the parent function execution finished (the
async call is on it's way) the parent function execution is dead, but following the closure
principle, this values will be kept in the heap until the async call is completed,
What happens with the new values? They ​​are generated in _second life_ ... that is, in another call to the function where everything starts again).

Let's see this with an example.

## Steps

If you come from the _useContext_ example, remember to remove the _provider_ instantiation from _app_ and the extra component you created.

We replace _demo.tsx_ with the following content:

_./src/demo.tsx_

```tsx
import React from "react";

export const MyComponent: React.FC = () => {
  const [number, setNumber] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setNumber(number + 1);
    }, 1500);
    setNumber(1);
  }, []);

  return (
    <>
      <h4>Number: {number}</h4>
    </>
  );
};
```

If you run this code you will find some odd behavior? At first glance after a second and a half, the displayed value
should be _2_, what's up? The callback is reading the frozen value not the actual one.

How can we fix this? the _setState_ function brings a second signature in which we can pass it
a function:

```diff
  React.useEffect(() => {
    setTimeout(() => {
-      setNumero(numero + 1);
+      setNumero((numero) => numero + 1);

    }, 1500);
    setNumero(1);
  }, []);
```

When we invoke it this way, the _setState_ hook ensure that the latest available value is being served.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
