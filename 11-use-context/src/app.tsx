import React from "react";
import { MyComponent, MyContextProvider } from "./demo";

export const App = () => {
  return (
    <MyContextProvider>
      <MyComponent />
    </MyContextProvider>
  );
};
