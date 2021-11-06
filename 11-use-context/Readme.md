# 11 useContext

## Resume

This example takes the _10-use-reducer_ example as a starting point.

One of the strengths of React is that you turn you components into black boxes, they are connected to the outside by means of a contract that are the Props, this makes React very robust and specific components can easily be promoted to reusable.

So far so great, but... What if I have cross-sectional data? That is to say What happens with the typical common data such as the name and the roles that the user who has logged into the application has, or waht happens when I want to navigate from one window to another, if we follow the principles of React we would have that information in the parent component of the application and we would pass the property from parent to child, this is bad for several reasons:

- We suffer from the drill hell, that is, if a grandson component needs a property we have to pass it on from grandparent, parent, children, grandchildren ... and at each level that goes down I increase the list of properties of each contro.

- I end up dragging properties that in certain components it does not make sense to have them, but a child component.

Wouldn't there be a way to share global data?

The first thing that can come to mind is to have it in a static object,
could something as easy as

_./src/bad-approach.tsx_

```typescript
export let userGlobalData = {
  login: "",
  roles: [],
};
```

And where I need it, I would just have to do something like:

```typescript
userGlobalData.login;

userGlobalDAta.login = "john";
```

This approach that we could first try to defend (it is flat ES6, so React account only takes care of the UI...), it brings us several problems:

- What if the value of _userGlobalData.login_ changes and I have multiple parts of the         application they are using it? How do I notify you of the change? Would have to play pulling and collecting global events to go repainting.

- And now to finish, if I want to use Server Side Rendering (that is, pregenerate the pages on the server to serve HTML, this is good for example for have a good SEO), we would have a big problem ... communicating vessels, all the requests would share the same static variables.

React incorporates a very powerful mechanism, it is called ** Context **


- The ** Context ** allows me to share data between components without going through the props.

- The Context lives within a React component, with which it is integrated into the React one-way flow, that is, any change you make to it makes updates to be triggered automatically.

- I can place the Context at the level I want in the component tree, that is, I can make that data available at the full application level or for example a window containing several tabs.


And to all this we have to add that React incorporates a hook called
_useContext_ which makes using it very easy.

Let's see how this works.

# Steps

- First we copy the previous example, and do a _npm install_

```bash
npm install
```

- We are going to create a context that allows me to store the user's name that has been logged in, we will need an entry to be able to read the data and another to write it.

We delete all that is in _demo.tsx_ and we get to work.

_./src/demo.tsx_

```tsx
import React from "react";

interface UserContext {
  username: string;
  setUsername: (value: string) => void;
}

const MyContext = React.createContext<UserContext>({
  username: "",
  setUsername: (value) => {},
});
```

- The context needs to live inside a special component that we call provider, this is the one who feeds him and gives him shelter, we can think of this combination as in the Alien movie, the context is the Alien and the provider is the poor human, we are going to create a habitat for our Alien that stores the username:

_./src/demo.tsx_

```diff
import React from "react";

const MyContext = React.createContext({
  username: "",
  setUsername: () => {}
});

+ export const MyContextProvider = props => {
+  const [username, setUsername] = React.useState("John Doe");
+
+  return (
+    <MyContext.Provider value={{ username, setUsername }}>
+      {props.children}
+    </MyContext.Provider>
+  );
+ };
```

Check out what we have here:

- We have a component that provides state to our context.
- We feed the context with that data.
- We put the children property to paint what was underneath that component (that is, as in the Alien movie, nobody is counted that the human has "a little bug" inside).

- Let's go to create a component (we add this to the end of the _demo.tsx_ file)

_./src/demo.tsx_

```tsx
export const MyComponent = () => {
  return (
    <>
      <h3>Hello</h3>
    </>
  );
};
```

Let's go to place the provider at the global level of the application.

_./src/app.tsx_

```diff
import React from "react";
import ReactDOM from "react-dom";
- import { MyComponent } from "./demo";
+ import { MyComponent, MyContextProvider } from "./demo";
import "./styles.css";

function App() {
  return (
+    <MyContextProvider>
        <MyComponent />
+   </MyContextProvider>
  );
}
```

In this way I leave the door open that any component that is underneath
of that provider (in this case the entire application can access the context).

If you notice, here applies what we discussed about the property _children_ all that
There is below the contextprovider that paints it as is that component.

- And now we are going to access the context data without having to go through the props:

```diff
export const MyComponent = () => {
+  const myContext = React.useContext(MyContext);

  return (
    <>
-      <h3>Hello</h3>
+     <h3>{myContext.username}</h3>

    </>
  )
}
```
- If we execute the example we can see it working:

```bash
npm start
```

**Exercise**:

1. Create a component called _MyEditComponent_ that allows you to edit the name we have in the context.
2. Now Let's go to add a button in that component called "save", until we click on save, this value will not be updated.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
