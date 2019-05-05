import React from "react";

export class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  render() {
    return (
      <>
        {this.state.visible && <MyChildComponent />}
        <button onClick={() => this.setState({ visible: !this.state.visible })}>
          Toggle Child component visibility
        </button>
      </>
    );
  }
}

const MyChildComponent = () => {
  const [userInfo, setUserInfo] = React.useState({
    name: "John",
    lastname: "Doe"
  });

  React.useEffect(() => {
    console.log(
      "A. Called when the component is mounted and after every render"
    );

    return () => console.log("B. Cleanup function called after every render");
  });

  return (
    <div>
      <h3>
        {userInfo.name} {userInfo.lastname}
      </h3>
      <input
        value={userInfo.name}
        onChange={e => setUserInfo({ ...userInfo, name: e.target.value })}
      />
      <input
        value={userInfo.lastname}
        onChange={e => setUserInfo({ ...userInfo, lastname: e.target.value })}
      />
    </div>
  );
};
