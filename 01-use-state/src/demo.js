import React from "react";

export const MyComponent = props => {
  const [myName, setMyName] = React.useState('John Doe');

  return (
    <>
      <h4>{myName}</h4>
      <input
        value={myName}
        onChange={(e) => setMyName(e.target.value)}
      />
    </>
  );
};