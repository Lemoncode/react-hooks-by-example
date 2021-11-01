import React from "react";

export const MyChildComponent = () => {
  return <h4>Hello from Child Component</h4>;
};

export const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    console.log("El componente se acaba de montar en el DOM");

    return () => {
      console.log("El componente se acaba de desmontar del DOM");
    };
  }, []);

  return (
    <>
      {visible && <MyChildComponent />}
      <button onClick={() => setVisible(!visible)}>
        Toggle Child Component Visibility
      </button>
    </>
  );
};
