[<img align="left" src="https://images.squarespace-cdn.com/content/v1/56cdb491a3360cdd18de5e16/1536155167931-3JJ7O74IM4QP88L0RQS9/3_200.png" alt="español" width="170"/>](https://lemoncode.net/) 


[<img align="right" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Spain_flag_icon.svg/1200px-Spain_flag_icon.svg.png" alt="english" width="50"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/09-pure-component-callback/Readme_es.md)
[<img align="right" src="https://assets.stickpng.com/images/580b585b2edbce24c47b2836.png" alt="inglés" width="47"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/09-pure-component-callback/Readme.md)
  
<br>
<br>

# 09 Pure component callback

## Resumen

Este ejemplo toma como punto de partida el ejemplo [_08-pure-component_](https://github.com/Lemoncode/react-hooks-by-example/blob/master/08-pure-component).

## Paso a Paso

- Primero copiamos el ejemplo anterior, y hacemos un _npm install_

```bash
npm install
```

- Vamos a añadir como punto de partida un componente padre
  que nos permite editar un nombre y apellido y un componente
  hijo que sirve para poner los valores de nombre y apellido a blanco.

_./src/demo.tsx_

```tsx
import React from "react";

interface Props {
  onReset: () => void;
}

const ResetValue: React.FC<Props> = React.memo((props) => {
  console.log(
    "Hey I'm only rendered the first time, check React.memo + callback"
  );

  return <button onClick={props.onReset}>Reset value</button>;
});

export const MyComponent = () => {
  const [username, setUsername] = React.useState("John");
  const [lastname, setLastname] = React.useState("Doe");

  const resetNameCallback = () => {
    setUsername("");
  };

  return (
    <>
      <h3>
        {username} {lastname}
      </h3>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <input value={lastname} onChange={(e) => setLastname(e.target.value)} />
      <ResetValue onReset={resetNameCallback}>Reset name</ResetValue>
    </>
  );
};
```

- Si ejecutamos el ejemplo, podemos ver que el render del componente
  _ResetValue_ se lanza cuando modificamos el campo nombre o el de apellido
  ¿ Cómo puede ser esto posible si sólo le pasamos como propiedad _resetNameCallback_
  y tenemos el componente envuelto en un _React.memo_.

Si pusiermoas el modo detective y utilizaramos el hook de ayuda _whyDidYouUpdate_
nos daríamos cuenta que el culpable es la funcióna: _resetNameCallback_
¿Por que? porque se crea una nueva en cada render... así _React.memo_ dispara el
render porque el puntero a la propiedad cambia.

¿ Qué podemos hacer para solucionar esto? Utilizar el hook _React.useCallback_
y tal como en _React.useEffect_ pasarle como segundo parametro un array vacio.

```diff
import React from "react";

export const MyComponent = () => {
  const [username, setUsername] = React.useState("John");
  const [lastname, setLastname] = React.useState("Doe");


-  const resetNameCallback = () => {setUsername('');}
+  const resetNameCallback = React.useCallback(() => setUsername(''), []);

  return (
    <>
      <h3>
        {username} {lastname}
      </h3>
      <input value={username} onChange={e => setUsername(e.target.value)} />
      <input value={lastname} onChange={e => setLastname(e.target.value)} />
      <ResetValue onReset={resetNameCallback}>Reset name</ResetValue>
    </>
  );
};

const ResetValue = React.memo(props => {
  console.log(
    "Hey I'm only rendered the first time, check React.memo + callback"
  );

  return (
    <button onClick={props.onReset}>Reset value</button>
  );
});
```

- Si ejecutamos el ejemplo, podemos ver que ya no se lanza el rerender en el componente _ResetValue_

¿ Cómo funciona esto? _useCallback_ guarda la función que se creo originalmente,
y devuelve esta en vez de crear una nueva en cada render, esto lo conseguimos
pasandole un array vacio como segundo parametro (como hacíamos con _React.useEffect_)
si queremos que se reevalue dependiendo del valor de una propiedad o estado, podemos
añadirlas al segundo aprametro de este callbakc (al igual que con useEffect), y si
omitimos el segundo parametro, esta función se reevaluara después de cada render.

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Si lo que te gusta es el mundo del _backend_ también puedes apuntante a nuestro [Bootcamp backend Online Lemoncode](https://lemoncode.net/bootcamp-backend#bootcamp-backend/inicio)

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)
