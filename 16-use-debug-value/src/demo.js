import React from "react";

const useUserTodos = () => {
  const [user, setUser] = React.useState("");
  const [userTodos, setUserTodos] = React.useState([]);

  const loadTodos = () => {
    fetch(`https://jsonplaceholder.typicode.com/todos?userId=${user}`)
      .then(response => response.json())
      .then(json => {
        console.log(userTodos);
        setUserTodos(json);
      });
  };

  React.useDebugValue(user !== "" ? `User ${user}` : 'No user');

  return { user, setUser, userTodos, loadTodos };
};

export const MyComponent = () => {
  const { user, setUser, userTodos, loadTodos } = useUserTodos();

  React.useEffect(() => {
    loadTodos();
  }, [user]);

  return (
    <div>
      <input value={user} onChange={e => setUser(e.target.value)} />
      <h3>User {user} TO-DO's:</h3>
      <ul>
        {userTodos.map((todo, index) => (
          <li key={index}>
            {todo.title}
            {todo.completed ? <>&#10004;</> : <>&#10006;</>}
          </li>
        ))}
      </ul>
    </div>
  );
};
