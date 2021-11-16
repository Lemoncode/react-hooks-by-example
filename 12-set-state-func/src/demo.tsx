import React from "react";

export const MyComponent: React.FC = () => {
  const [numero, setNumero] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setNumero((numero) => numero + 1);
    }, 1500);
    setNumero(1);
  }, []);

  return (
    <>
      <h4>El numero: {numero}</h4>
    </>
  );
};
