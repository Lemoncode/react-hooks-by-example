import React from "react";

export const MyComponent = () => {
  const [info, setInfo] = React.useState({
    message: "initial message",
    seconds: 0,
  });

  React.useEffect(() => {
    setTimeout(() => {
      console.log(info.seconds);
      setInfo((info) => ({ ...info, seconds: 1 }));
    }, 1000);

    setTimeout(() => {
      setInfo((info) => ({
        ...info,
        message: `Total seconds: ${info.seconds}`,
      }));
    }, 2000);
  }, []);

  return (
    <>
      <h3>{info.message}</h3>
      <h4>{info.seconds}</h4>
    </>
  );
};
