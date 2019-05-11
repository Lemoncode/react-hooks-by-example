import React from "react";

export const MyComponent = props => {
  const [userInfo, setUserInfo] = React.useState({
    name: 'John',
    lastname: 'Doe',
  });
  return (
    <>
      <h4>{userInfo.name}{userInfo.lastname}</h4>
      <input
        value={userInfo.name}
        onChange={(e) => setUserInfo({
          ...userInfo,
          name: e.target.value
        })}
      />
      <input
        value={userInfo.lastname}
        onChange={(e) => setUserInfo({
          ...userInfo,
          lastname: e.target.value
        })}
      />
    </>
  )
};