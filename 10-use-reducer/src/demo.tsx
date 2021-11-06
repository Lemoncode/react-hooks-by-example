import React from "react";

interface UserState {
  name: string;
  lastname: string;
}

interface Action {
  type: string;
  payload: any;
}

const actionIds = {
  setName: "setname",
  setLastname: "setlastname",
};

const userInfoReducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case actionIds.setName:
      return {
        ...state,
        name: action.payload,
      };
    case actionIds.setLastname:
      return {
        ...state,
        lastname: action.payload,
      };
    default:
      return state;
  }
};

interface Props {
  name: string;
  dispatch: React.Dispatch<Action>;
}

const EditUsername: React.FC<Props> = React.memo((props) => {
  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return (
    <input
      value={props.name}
      onChange={(e) =>
        props.dispatch({ type: actionIds.setName, payload: e.target.value })
      }
    />
  );
});

export const MyComponent = () => {
  const [userInfo, dispatch] = React.useReducer(userInfoReducer, {
    name: "John",
    lastname: "Doe",
  });

  return (
    <>
      <h3>
        {userInfo.name} {userInfo.lastname}
      </h3>
      <EditUsername name={userInfo.name} dispatch={dispatch} />
      <input
        value={userInfo.lastname}
        onChange={(e) =>
          dispatch({ type: actionIds.setLastname, payload: e.target.value })
        }
      />
    </>
  );
};
