import React from "react";

export const MyComponent = () => {
  const [username, setUsername] = React.useState("John");
  const [lastname, setLastname] = React.useState("Doe");

  const setUsernameCallback = React.useCallback(setUsername, [username]);

  return (
    <>
      <h3>
        {username} {lastname}
      </h3>
      <EditUsername name={username} onChange={setUsernameCallback} />
      <input value={lastname} onChange={e => setLastname(e.target.value)} />
    </>
  );
};

const EditUsername = React.memo(props => {
  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return (
    <input value={props.name} onChange={e => props.onChange(e.target.value)} />
  );
});
