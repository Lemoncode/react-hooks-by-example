# 13 asyncClosure

## Resumen

Este ejemplo toma como punto de partida el ejemplo _12-set-state-func_.

En el ejemplo anterior vimos como resolver el problema de las llamadas
asíncronas, y los _setState_ que toman valores antiguos, esto está bien
si sólo hay una variable en juego, pero si hay más de una, podemos
tener problemas, para poder resolver este caso arista, React nos proporciona el hook _userRef_

Veamos como funciona.

## Paso a Paso

- Primero copiamos el ejemplo anterior, y hacemos un _npm install_

```bash
npm install
```

- Vamos a por el ejemplo, ¿ Qué vamos a hacer?

En cuanto a datos:

- Vamos a tener un contador de segundos, lo guardamos en el estado.
- Vamos a tener un mensaje para mostrar los segundos que hay.

En cuanto a funcionalidad:

- Cuando montamos por primera vez el componente el valor de segundos va a ser 0.
- Cuando pase un segundo vamos a setear el valor de segundos a 1.
- Cuando pasen dos segundos vamos a setear el valor del mensaje
  (que muestra esos segundos).

En el componente:

- Mostramos el número de segundos.
- Mostramos el mensaje.

> Este caso está hecho para ver como funciona _useRef_ se podría
> resolver de otras maneras más óptimas.

_./src/demo.tsx_

```tsx
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

Si no estuvieramos al tanto del problema con las closures, esperaríamos
que el mensaje final fuera "Total segundos: 1", pero lo ejecutaremos y veremos que
el mensaje que aparece por pantalla es "Total segundos: 0"

Para solucionar esto, los chicos de Facebook nos proveed del hook _useRef_, esto hook:

- Almacena un valor de inicialización (igual que con useState).
- Nos devuelve un objeto.
- Dicho objeto tiene una propiedad _current_ que es una variable mutable
  (aquí se almacenaría el valor de los segundos), si modificamos este valor
  en un render futuro, se tendrá cuenta en uno pasado (una llamada asíncrona.)
- Cuando viene otro render, _useRef_ devuelve la misma instancia del objeto.

Veamoslo en acción:

_./src/demo.tsx_

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

- Si lo ejecutamos, veremos como ahora funciona correctamente.

```bash
npm start
```

- Esto esta muy bien ¿ Pero tenemos forma de evitarlo? Si hubiesemos
  usado un objeto sí, veamos como funciona el SetState utilizando una
  función para asignar el valor.

- Primero vamos a encapsular message y seconds en un objeto:

```diff
export const MyComponent = () => {
-  const [message, setMessage] = React.useState("initial message");
-  const [seconds, setSeconds] = React.useState(0);
-  const secondsRef = React.useRef(seconds);
+  const [info, setInfo] = React.useState({
+    message: 'initial message',
+    seconds: 0,
+ });
```

- Vamos ahora a cambiar el contenido del useEffect, atentos al setState
  que lo vamos a usar como fucnión, trayendonos el último valor:

```diff
- const secondsRef = React.useRef(info.seconds);

  React.useEffect(() => {
    setTimeout(() => {
-      console.log(seconds);
-      setSeconds(1);
-      secondsRef.current = 1;
+      console.log(info.seconds);
+      setInfo(info => {...info, seconds: 1})
    }, 1000);

    setTimeout(() => {
-      setMessage(`Total seconds: ${secondsRef.current}`);
+      setInfo(info => ({...info, message: `Total seconds: ${info.seconds}`}));
    }, 2000);
  }, []);
```

- Y actualizamos el render

```diff
  return (
    <>
-      <h3>{message}</h3>
-      <h4>{seconds}</h4>
+      <h3>{info.message}</h3>
+      <h4>{info.seconds}</h4>

    </>
  );
```

- Si ejecutamos veremos como funciona.

```bash
npm start
```

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Si lo que te gusta es el mundo del _backend_ también puedes apuntante a nuestro [Bootcamp backend Online Lemoncode](https://lemoncode.net/bootcamp-backend#bootcamp-backend/inicio)

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)
