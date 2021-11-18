import React from "react";

export const MyComponent = () => {
  const containerElementRef = React.useRef(null);
  const [message, setMessage] = React.useState(
    "Click button to get container width"
  );

  const calculateContainerWidth = () => {
    setMessage(`Container width: ${containerElementRef.current.clientWidth}px`);
  };

  return (
    <div className="container" ref={containerElementRef}>
      <h2>{message}</h2>
      <button onClick={calculateContainerWidth}>
        Calculate container width
      </button>
    </div>
  );
};
