# 09 Pure Components Callback

En el ejemplo anterior vimos como hacer un componente puro usando _React.memo_, lo cual es genial, pero cuando hay un problema ¿Qué ocurre si pasamos la función creada en el componente padre al componente hijo?
Esa función siempre será diferente en cada renderizado por lo que _memo_ no tendrá efecto.

¿Cómo podemos solucionar esto? Podemos hacer uso de _useCallback_, lo cual no mutará la función setter a menos que le indiquemos alguna dependencia (de igual forma que con _React.useEffect_).

# Pasos

- Tomaremos como punto de partida el ejemplo _00 boilerplate_. Copia el contenido del proyecto a una carpeta nueva y ejecuta _npm install_.

```bash
npm install
```

- Abramos _demo.js_. Crearemos un componente padre y uno hijo (esta vez el hijo simplemente reseteará el contenido del nombre).

_./src/demo.js_

```jsx
import React from "react";

export const MyComponent = () => {
  const [username, setUsername] = React.useState("John");
  const [lastname, setLastname] = React.useState("Doe");


  const resetNameCallback = () => {setUsername('');}
  
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

- Si ejecutamos el ejemplo comprobaremos que el renderizado siempre se lanza (_resetNameCallback_ siempre se recrea, el shallow compare fallará).

- El truco aquí es usar _React.useCallback_ y pasarle como segundo argumento un array vacío (guardará la referencia de la función para siempre).


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

- Si volvemos a ejecutar la función obtenemos el comportamiento deseado.

> Ejercicio: ¿Y si agrupamos _username_ y _lastname_ en un objeto (un único useState) y usamos el spread operator para asignar el objeto? ¿Funcionaría?
Comprueba por qué :-)

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)