import React from "react";

export const MyComponent = () => {
  const [userInfo, setUserInfo] = React.useState({
    name: " John ",
    lastname: "Doe"
  });

  return (
    <>
      <DisplayUsername name={userInfo.name} />
      <input
        value={userInfo.name}
        onChange={e =>
          setUserInfo({
            ...userInfo,
            name: e.target.value
          })
        }
      />
      <input
        value={userInfo.lastname}
        onChange={e =>
          setUserInfo({
            ...userInfo,
            lastname: e.target.value
          })
        }
      />
    </>
  );
};

export const DisplayUsername = React.memo(props => {
  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return <h3>{props.name}</h3>;
});
