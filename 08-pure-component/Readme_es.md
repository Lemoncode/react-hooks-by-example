# 08 Pure Components

Cuando usábamos componentes de clase podíamos hacer uso de PureComponents, estos componentes simplemente harán un shallow compare de las props y solo renderizan si hubo cambios. ¿Hay alguna forma de hacer esto usando hooks? Si, usando _React.memo_

# Pasos

- Tomaremos como punto de partida el ejemplo _00 boilerplate_. Copia el contenido del proyecto a una carpeta nueva y ejecuta _npm install_.

```bash
npm install
```

- Abramos _demo.js_, crearemos un componente padre y uno hijo

_./src/demo.js_

```jsx
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

export const DisplayUsername = props => {
  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return <h3>{props.name}</h3>;
};
```

- Si ejecutamos el ejemplo podemos comprobar que _DisplayUsername_se renderiza siempre que modificamos _lastname_. El enfoque óptimo sería rendizar _DisplayUsername_ sólo cuando _props.name_ se actualice. Si envolvemos el componente _DisplayUsername_ usando _React.memo_ conseguiremos el resultado deseado.

_./src/demo.js_

```diff
- export const DisplayUsername = props => {
+ export const DisplayUsername = React.memo(props => {

  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return <h3>{props.name}</h3>;
- };
+ });
```

- Si volvemos a ejecutar el ejemplo podemos comprobar (mostrando la consola o abriendo las react dev tools) que el componente _DisplayUsername_ sólo se vuelve a renderizar cuando cambia la propiedad  _name_.

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)