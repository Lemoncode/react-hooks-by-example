import React from "react";

interface UserContext {
  username: string;
  setUsername: (value: string) => void;
}

const MyContext = React.createContext<UserContext>({
  username: "",
  setUsername: (value) => {},
});

export const MyContextProvider = (props) => {
  const [username, setUsername] = React.useState("John Doe");

  return (
    <MyContext.Provider value={{ username, setUsername }}>
      {props.children}
    </MyContext.Provider>
  );
};

const MyEditComponent = () => {
  const { username, setUsername } = React.useContext(MyContext);

  const [newUsername, setNewUsername] = React.useState("");

  const handleChange = (e) => {
    setNewUsername(e.target.value);
  };
  return (
    <div>
      <input placeholder={username} onChange={handleChange} />
      <button onClick={() => setUsername(newUsername)}>Save</button>
    </div>
  );
};

export const MyComponent = () => {
  const myContext = React.useContext(MyContext);
  return (
    <>
      <h3>{myContext.username}</h3>
      <MyEditComponent />
    </>
  );
};
