# 12 Async Closure

Cuando eres nuevo en los hooks, te puede resultar difícil manejar callbacks asíncronos y tomar valores actuales de useState. Esto no funciona porque las variables generadas por useState están congeladas (siguiendo el pricipio de closure de js no recuperas el valor actual).

¿Cómo podemos solucionar esto? Usando _useRef_

# Pasos

- Tomaremos como punto de partida el ejemplo _00 boilerplate_. Copia el contenido del proyecto a una carpeta nueva y ejecuta _npm install_.

```bash
npm install
```

- Crearemos nuestro caso usando _useEffect_, dentro del cual tendremos dos llamadas asíncronas.
La primera debería fijar el estado _seconds_ a 1 (se ejecutará tras 1 segundo).
La segunda llamada asíncrona será ejecuta después de que pasen 2 segundos.
En teoría debería mostrar el valor actual de segundos (1) sin embargo obtenemos 0. Probémoslo:

_./src/demo.js_

```jsx
import React from "react";

export const MyComponent = () => {
  const [message, setMessage] = React.useState("initial message");
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      console.log(seconds);
      setSeconds(1);
    }, 1000);

    setTimeout(() => {
      setMessage(`Total seconds: ${seconds}`);
    }, 2000);
  }, []);

  return (
    <>
      <h3>{message}</h3>
      <h4>{seconds}</h4>
    </>
  );
};
```

- El problema es que seconds apunta al valor previo (revisa los closures de javascript closures para más información). ¿Cómo podemos solucionar esto? Usando _useRef_ (esto guardará un valor mutable en un campo llamado _current_).

```diff
import React from "react";

export const MyComponent = () => {
  const [message, setMessage] = React.useState("initial message");
  const [seconds, setSeconds] = React.useState(0);

+ const secondsRef = React.useRef(seconds);


  React.useEffect(() => {
    setTimeout(() => {
      console.log(seconds);
      setSeconds(1);
+      secondsRef.current = 1;
    }, 1000);

    setTimeout(() => {
-      setMessage(`Total seconds: ${seconds}`);
+      setMessage(`Total seconds: ${secondsRef.current}`);
    }, 2000);
  }, []);

  return (
    <>
      <h3>{message}</h3>
      <h4>{seconds}</h4>
    </>
  );
};
```

- Si volvemos a ejecutar el ejemplo obtenemos el resultado esperado.

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)