import React from "react";
import ReactDOM from "react-dom";
import { FaceComponent } from "./demo";
import "./styles.css";


function App() {

  const [satisfactionLevel, setSatisfactionLevel] = React.useState(300);

  return (
    <div className="App">
      <input type="range"
        min="0"
        max="500"
        value={satisfactionLevel}
        onChange={(event) => setSatisfactionLevel(+event.target.value)}
      />
      <br />
      <span>{satisfactionLevel}</span>
      <br />
      <FaceComponent level={satisfactionLevel} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
