import React from "react";

export const MyComponent = () => {
  const [userInfo, setUserInfo] = React.useState({
    name: " John ",
    lastname: "Doe"
  });

  const setUserNameCallback = React.useCallback(name => {
    setUserInfo({
      ...userInfo,
      name
    });
  });

  return (
    <>
      <h3>
        {userInfo.name} {userInfo.lastname}
      </h3>
      <EditUsername name={userInfo.name} onChange={setUserNameCallback} />
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

const EditUsername = React.memo(props => {
  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return (
    <input value={props.name} onChange={e => props.onChange(e.target.value)} />
  );
});
