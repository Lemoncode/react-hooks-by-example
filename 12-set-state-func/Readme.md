# 12 set state func

## Resume

This example takes the _11-use-context_ example as a starting point.

### Short explanation

An important issue to consider with hooks and functional components 
is that the functions are executed once and die ( hooks serve as data stores
among other things),
but if we make an asynchronous call in that function, by the parciple of closure when 
that function is invoked, the
data that we will have will be the values of said execution.

### Long explanation

One of the fundamental prerequisites to be able learn React is to have 
a solid undertanding of Javascript and ES6. In this case have very
clear the concept of _clousure_.

Functional components are just that, functions:

- They are invoked.
- They run.
- They die.

If we remember the concept of closure, when it had an asynchronous call it allowed me
in the response to access variables of the parent function that
had invoked even though this function was already dead.

If we apply this concept to React, we can find a curious case:

- Imagine that we have a discount value in a state.
- We make an asynchronous call to the server so that it gives us the total of the order.
- While the call is in progress the discount field changes.
- In the server's response we multiply the order total by the discount.

What discount value do you think the old or the new will apply? ... Grats!!!!, the
old Why? ... let's think about a closure, we don't stop having a parent function
that has died, that maintains the values ​​by the principle of closure and that reads
the values ​​that it had at that moment What happens with the new values ​​are generated
in another life ... that is, in another call to the function where everything starts again).

Let's see this with an example.

## Steps

If you come from the _useContext_ example, remember to remove the _provider_ instantiation from _app_ and the extra component you created.

We replace _demo.tsx_ with the following content:

_./src/demo.tsx_

```tsx
import React from "react";

export const MyComponent: React.FC = () => {
  const [numero, setNumero] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setNumero(numero + 1);
    }, 1500);
    setNumero(1);
  }, []);

  return (
    <>
      <h4>El numero: {numero}</h4>
    </>
  );
};
```

Is what is happening normal? At first glance after a second and a half, the displayed value
it should be _2_, what's up? That in the callback when you pull the closure of that execution, the value number is _0_.

How can we correct this? the _setState_ function brings a second signature in which we can pass it
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


When we invoke it this way, the _setState_ hook makes sure to bring us the last value.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend