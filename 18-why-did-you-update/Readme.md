# 17 Why Did You Update

As we have seen in previous examples, using the higher order component _React.memo_ we avoid rendering a component when the same props give the same result. But what if you still see renderings that seem unnecessary? You can use a custom hook that allows you to see what props are causing the component to re-render. In this example we will learn how to implement it.

# Steps

- We will take as a starting point the previous example _17-use-debug-value_. Copy the contents of the project to a new folder and run _npm install_.

```bash
npm install
```

- Let's open the file _demo.tsx_. We will create a parent component and not a child. The child component will only show its props while the parent component has two displayed state variables and two buttons (these buttons increase the value of the variables);

_./src/demo.tsx_

```tsx
import React from "react";

export const MyComponent = () => {
  const [cont, setCont] = React.useState(0);
  const [id, setId] = React.useState(0);

  const name = {
    firstname: 'John',
    lastname: 'Doe',
  };

  return(
    <div>
      <div>
        <MyChildComponent name={name} cont={cont} />
        <button onClick={() => setCont(cont + 1)}>Increment cont</button>
      </div>

      <div>
        <div>id: {id}</div>
        <button onClick={() => setId(id + 1)}>Increment id</button>
      </div>
    </div>
  );
};

interface Name {
  firstname: string;
  lastname: string;
}

interface Props {
  name: Name,
  cont: number,
}

export const MyChildComponent: React.FC<Props> = React.memo(props => {
  
  return(
    <div>
      {props.name.firstname} {props.name.lastname} cont: {props.cont}
    </div>
  );
});
```

- Now we have to add our custom hook _useWhyDidYouUpdate_ and use it inside _MyChildComponent_. This hook receives the props of a component and checks if they have changed.