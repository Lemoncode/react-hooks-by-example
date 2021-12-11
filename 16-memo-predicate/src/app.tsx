import React from "react";
import { MyComponent } from "./demo";
import "./styles.css";

export const App = () => {
  const [satisfactionLevel, setSatisfactionLevel] = React.useState(300);
  return (
    <div className="App">
      <input
        type="range"
        min="0"
        max="500"
        value={satisfactionLevel}
        onChange={(event) => setSatisfactionLevel(+event.target.value)}
      />
      <br />
      <span>{satisfactionLevel}</span>
      <br />
      <MyComponent level={satisfactionLevel} />
    </div>
  );
};
