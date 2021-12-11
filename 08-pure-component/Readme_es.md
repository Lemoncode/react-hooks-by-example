# 08 Pure component

## Resumen

Este ejemplo toma como punto de partida el ejemplo _07-custom-hook_.

Hay veces en las que nos hace falta hilar fino y sólo volver a repintar un componente si sus propiedades han cambiado, si trabajamos con estructuras inmutables sólo tenemos que hacer un shallow compare.

Esto lo podíamos hacer facilmente con componentes de clase ¿ Cómo podemos hacerlo en componente de tipo función?
Vamos a ello.

## Paso a Paso

- Primero copiamos el ejemplo anterior, y hacemos un _npm install_

```bash
npm install
```

- Vamos a pegar un ejemplo en _demo.js_, este código va tener dos
  valores editables: _name_ y _lastname_ y vamos a tener un control
  hijo que sólo va a mostrar el _name_ (de hecho este componente
  sólo pedirá el campo nombre en las propiedades).

_./src_/demo.tsx\_

```tsx
import React from "react";

interface Props {
  name: string;
}

export const DisplayUsername = (props: Props) => {
  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return <h3>{props.name}</h3>;
};

export const MyComponent = () => {
  const [userInfo, setUserInfo] = React.useState({
    name: " John ",
    lastname: "Doe",
  });

  return (
    <>
      <DisplayUsername name={userInfo.name} />
      <input
        value={userInfo.name}
        onChange={(e) =>
          setUserInfo({
            ...userInfo,
            name: e.target.value,
          })
        }
      />
      <input
        value={userInfo.lastname}
        onChange={(e) =>
          setUserInfo({
            ...userInfo,
            lastname: e.target.value,
          })
        }
      />
    </>
  );
};
```

- Para ver cuando se repinta hemos metido un _console.log_ en el componente hijo (DisplayUsername).

- Si lanzamos el ejemplo y probamos, veremos que da igual si cambio nombre o apellido el componente
  se repinta, y sólo queremos que se repinte cuando cambie el campo nombre, ¿Qué podemos hacer?
  **React.memo** al rescate, vamos a envolver el componente:

_./src/demo.tsx_

```diff
- export const DisplayUsername = (props: Props) => {
+ export const DisplayUsername = React.memo((props: Props) => {

  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return <h3>{props.name}</h3>;
- };
+ });
```

- Si ejecutamos el ejemplo, podemos ver que ahora sólo se repinta el componente cuando
  cambia la propiedad nombre:

```bash
npm start
```

¿ Qué es lo que está haciendo _React.memo_? Esta aplicando el patrón memorize, recuerda
para la propiedad name el puntero del último render, cuando llega el siguiente los compara
y si son iguales devuelve el render del componente cacheado.

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Si lo que te gusta es el mundo del _backend_ también puedes apuntante a nuestro [Bootcamp backend Online Lemoncode](https://lemoncode.net/bootcamp-backend#bootcamp-backend/inicio)

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)
