[<img align="left" src="https://images.squarespace-cdn.com/content/v1/56cdb491a3360cdd18de5e16/1536155167931-3JJ7O74IM4QP88L0RQS9/3_200.png" alt="español" width="170"/>](https://lemoncode.net/) 


[<img align="right" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Spain_flag_icon.svg/1200px-Spain_flag_icon.svg.png" alt="english" width="50"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/10-use-reducer/Readme_es.md)
[<img align="right" src="https://assets.stickpng.com/images/580b585b2edbce24c47b2836.png" alt="inglés" width="47"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/10-use-reducer/Readme.md)
  
<br>
<br>

# 10 useReducer

## Resume

This example takes as a starting point [_09-pure-component-callback_](https://github.com/Lemoncode/react-hooks-by-example/blob/master/09-pure-component-callback/Readme.md).

In the previous sample we worked around the issue with the function
that was getting updated on every render by using _useCallback_, this
approach is cool, but for more complex scenarios you may want to organize
your code using a different approach. Another way of solving this issue
is using _useReducer_, this hook will return a _dispatch_
function that remains stable.

# Steps

- First we copy the previous example, and do a _npm install_

```bash
npm install
```

- Let's open the _demo.tsx_. We will create a parent that will have information on the first and the last name of a person, and we are going to create a child component that will serve us to edit the name field.

_./src/demo.tsx_

```tsx
import React from "react";

interface Props {
  name: string;
  onChange: (value: string) => void;
}

const EditUsername: React.FC<Props> = React.memo((props) => {
  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return (
    <input
      value={props.name}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
});

export const MyComponent = () => {
  const [userInfo, setInfo] = React.useState({ name: "John", lastname: "Doe" });

  return (
    <>
      <h3>
        {userInfo.name} {userInfo.lastname}
      </h3>
      <EditUsername
        name={userInfo.name}
        onChange={(name) =>
          setInfo({
            ...userInfo,
            name,
          })
        }
      />
      <input
        value={userInfo.lastname}
        onChange={(e) =>
          setInfo({
            ...userInfo,
            lastname: e.target.value,
          })
        }
      />
    </>
  );
};
```

- In the child component we have a _console.log_ to warn us if the control is repainted  or not, this control is always repainted because in the _onChange_ property we are creatin a new function in each render.

Here we might bo more tempted to use _React.useCallback_, is there antoher way to try this? Let's see the proposal offered by _useReducer_.

En _useReducer_ we group a set of functionality.

- On the one hand we have the state (the data).
- On the other hand we have actions (contains an identifier and a parameter with information) that are launched using a dispatcher.
- And those actions update the state in a reducer (a reducer is a function that accepts two parameters the previus state and the action, and returns you a new state).
- Where is this? In thinking that the current state is like a frame of a movie, we fix it, we receive a request for change (with the action) and a new frame is generated based on the previous one and the change that we want to make, if there is no change the same as before is returned.

Let's first to define our _reducer_.

- Taking average of the fact that we are working with  ** TypeScript ** we are going to type our reducer and actions:


_./src/demo.tsx_

```typescript
interface UserState {
  name: string;
  lastname: string;
}

interface Action {
  type: string;
  payload: any;
}

const actionIds = {
  setName: "setname",
  setLastname: "setlastname",
};
```

- And now Let's go to create our reducer.

_./src/demo.tsx_

```tsx
const userInfoReducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case actionIds.setName:
      return {
        ...state,
        name: action.payload,
      };
    case actionIds.setLastname:
      return {
        ...state,
        lastname: action.payload,
      };
    default:
      return state;
  }
};
```

Let's now replace the _useState_ of our component with a _useReducer_ Let's see how it looks.

First we add the _useReducer_

```diff
export const MyComponent = () => {
-  const [userInfo, setInfo] = React.useState({ name: "John", lastname: "Doe" });
+  const [userInfo, dispatch] = React.useReducer(userInfoReducer, {name: 'John', lastname: 'Doe'});
```

On the one and _useReducer_ receives two parameters, the first is the function reducer that we created earlier, and the second is the intial state.

On the other, it returns and array (as in _useState_), on this array we can do destructuring, on the one hand we bring the photo of the current state in the first element of the array, and for another it gives us a \ _dispatcher_, this dispatcher acts like a bus, it loads the action we give it and it is carried by the reducer function that updates the state.

Let's go to change the markup of the render and adapt it to use the state.

By having called _userInfo_ to the state we already have, we have saved ourselves work refactoring.

On the other and we are going to change the input that is directly in the parent component.

```diff
<input
  value={userInfo.lastname}
-        onChange={e => setInfo({
-          ...userInfo,
-          lastname: e.target.value,
-        })}
+        onChange={(e) => dispatch({type: actionIds.setLastname
+                                  ,payload: e.target.value})}
/>
```

Look at this change, I no longer directly change the _state_ using the _dispatch_, I pass the action type that I want to execute, including the data that changes, and this dispatch execute the _useReducer_ function.

Now comes the stronger change, update the child component, in this case we have to change the signature of the properties, we delegate to dispatch the changing information.

This in this example may seem a pointless change, but in one case complex in witch we can have a multitude of callbacks, we save pass them by property, having everything grouped in a single dispatch.

_./src/demo.tsx_

```diff
interface Props {
  name: string;
-  onChange: (value: string) => void;
+  dispatch: React.Dispatch<Action>;
}

const EditUsername: React.FC<Props> = React.memo((props) => {
  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return (
    <input
      value={props.name}
-      onChange={(e) => props.onChange(e.target.value)}
+      onChange={(e) =>
+        props.dispatch({ type: actionIds.setName, payload: e.target.value })
+      }
    />
  );
});
```

- Let's now update the parent component:

_./src/demo.tsx_

```diff
      <EditUsername
        name={userInfo.name}
-        onChange={(name) =>
-          setInfo({
-            ...userInfo,
-            name,
-          })
+        dispatch={dispatch}
        }
      />
```

If we execute this example we can see that the problem of rerender, why? Becouse the _dispatch_ function is not regenerated on every render.

Use _useReducer_ in this example has been to killing flies with cannon shots, we have chosen a simple example to be able to learn how it works, what normal is that you use the complex cases where you have a rich state, and a lot of sub-component levels.

_useReducer_ is not a universal solution, and it has its disadventages, you are binding the signature of the properties of your component to a specific _dispatch_ and also launching actions this makes your components less promotables, it is going to be hareder to make them reusables. Yo have to choose ok where to stop using dispatch and use a conventional signature on components that you see that they can be reusable.


# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
