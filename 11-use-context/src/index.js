import React from "react";
import ReactDOM from "react-dom";
import { MyComponent, MyContextProvider } from "./demo";
import "./styles.css";

function App() {
  return (
    <MyContextProvider>
      <div className="App">
        <MyComponent />
      </div>
    </MyContextProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
