[<img align="left" src="https://images.squarespace-cdn.com/content/v1/56cdb491a3360cdd18de5e16/1536155167931-3JJ7O74IM4QP88L0RQS9/3_200.png" alt="español" width="170"/>](https://lemoncode.net/) 


[<img align="right" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Spain_flag_icon.svg/1200px-Spain_flag_icon.svg.png" alt="english" width="50"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/11-use-context/Readme_es.md)
[<img align="right" src="https://assets.stickpng.com/images/580b585b2edbce24c47b2836.png" alt="inglés" width="47"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/11-use-context/Readme.md)
  
<br>
<br>

# 11 useContext

## Resumen

Este ejemplo toma como punto de partida el ejemplo [_10-use-reducer_](https://github.com/Lemoncode/react-hooks-by-example/blob/master/10-use-reducer).

Uno de los puntos fuertes de React es que conviertes tu componentes en cajas
negras, se conectan al exterior mediante un contrato que son las Props, esto
hace que React sea muy robusto y que fácilmente se puedan promocionar componentes específicos a reusables.

Hasta aquí todo genial, pero... ¿Qué pasa si tengo datos tranversales? Es decir
que pasa con los típicos datos comunes como el nombre y los roles que tiene el usuario que se ha logado en la aplicacíon, o que pasa cuando quiero navegar de una
ventana a otra, si seguimos los principios de React tendríamos esa información en el
componente padre de la aplicación e iríamos pasando de padre a hijo la propiedad, esto es malo por varios motivos:

- Sufrimos el prop drill hell, es decir si un componente nieto necesita una propiedad tenemos que pasarle desde abuelo, padre, hijo, nieto... y a cada nivel que vaya bajando voy engordando la lista de propiedades de cada control.

- Acabo arrastrando propiedades que en ciertos componentes no tiene ni sentido que las tenga, pero un componento hijo.

¿ No habría una forma de compartir datos globales?

Lo primero que se nos puede venir a la cabeza es tenerlo en un objeto estático,
podría algo tan fácil como

_./src/bad-approach.tsx_

```typescript
export let userGlobalData = {
  login: "",
  roles: [],
};
```

Y donde me haga falta sólo tendría que hacer algo así como:

```typescript
userGlobalData.login;

userGlobalDAta.login = "john";
```

Esta aproximación que de primeras podríamos intentar defender (es ES6 plano, a fin
de cuentas React sólo se encarga del UI...), nos trae varios problemas:

- ¿Qué pasa si cambia el valor de _userGlobalData.login_ y tengo varias partes de
  la aplicación que lo están usando? ¿Cómo le notifico el cambio? Tendría que jugar
  tirando y recogiendo eventos globales para ir repintando.

- ¿Y si sólo quiero que este dato sea visible a un nivel de aplicación? Por
  ejemplo tengo datos de nuevo pedido en un wizard y quiero que sólo esten visible
  al nivel del wizard que estoy editando, es más cuando cierre el wizard quiero
  liberar el espacio de memoria. Esto que nos hemos creado es global.

- Y ya para terminar, si quiero usar Server Side Rendering (es decir pregenerar
  las páginas en el servidor para servir HTML, esto es bueno por ejemplo para
  tener un buen SEO), tendríamos un problema gordo... vasos comunicantes, todas
  las peticiones compartirían las mismas variables estáticas.

React incorpora un mecanismo muy potente, se llama **Context**

- El **Context** me permite compartir datos entre componentes sin pasar por las props.

- El Contexto vive dentro de un componente React, con lo que se integra en el
  flujo unidireccional de React, es decir cualquier cambio que haga en él hace
  que se disparen actualizaciones de manera automática.

- El Contexto lo puedo colocar al nivel que quiera del arbol de componentes,
  es decir puedo poner esos datos disponibles a nivel de aplicacion completa
  o de por ejemplo una ventana que contenga varios tabs.

Y a todo esto tenemos que añadirle que React incorpora un hook que se llama
_useContext_ que hace que usarlo sea muy facil.

Vamos a ver como funciona esto.

## Paso a Paso

- Primero copiamos el ejemplo anterior, y hacemos un _npm install_

```bash
npm install
```

- Vamos a crear un context que me permita almacenar el nombre del usuario
  que se ha logado, nos hará falta un entrada para poder leer el dato
  y otra para escribirlo.

Borramos todos lo que hay en _demo.tsx_ y nos ponemos manos a la obra.

_./src/demo.tsx_

```tsx
import React from "react";

interface UserContext {
  username: string;
  setUsername: (value: string) => void;
}

const MyContext = React.createContext<UserContext>({
  username: "",
  setUsername: (value) => {},
});
```

- El contexto necesita vivir dentro de un componente especial que llamamos
  provider, este el que le alimenta y le da cobijo, podemos pensar de esta combinación
  como en la pelicula de Alien, el contexto es el Alien y el provider es el pobre
  humano, vamos a crear un habitat a nuestro Alien que almacena el nombre del usuario:

_./src/demo.tsx_

```diff
import React from "react";

const MyContext = React.createContext({
  username: "",
  setUsername: () => {}
});

+ export const MyContextProvider = props => {
+  const [username, setUsername] = React.useState("John Doe");
+
+  return (
+    <MyContext.Provider value={{ username, setUsername }}>
+      {props.children}
+    </MyContext.Provider>
+  );
+ };
```

Fijate lo que tenemos aqui:

- Tenemos un componente que provee de estado a nuestro contexto.
- Alimentamos al contexto con esos datos.
- Metemos la propiedad children para pintar lo que tuviera por debajo
  ese componente (es decir como en la película de Alien, nadie se cuenta
  de que el humano lleva "un bichito" dentro).

- Vamos a crear un componente (añadimos esto al final del fichero _demo.tsx_)

_./src/demo.tsx_

```tsx
export const MyComponent = () => {
  return (
    <>
      <h3>Hello</h3>
    </>
  );
};
```

Vamos ahora a colocar a el provider a nivel global de la aplicación.

_./src/app.tsx_

```diff
import React from "react";
import ReactDOM from "react-dom";
- import { MyComponent } from "./demo";
+ import { MyComponent, MyContextProvider } from "./demo";
import "./styles.css";

function App() {
  return (
+    <MyContextProvider>
        <MyComponent />
+   </MyContextProvider>
  );
}
```

De esta manera dejo la puerta abierta que cualquier componente que este debajo
de ese provider (en este caso la aplicación entera pueda acceder al context).

Si te fijas, aquí aplica lo que comentamos de la propiedad _children_ todo lo que
hay debajo del contextprovider lo pinta tal cual ese componente.

- Y ahora vamos a acceder a los datos del contexto sin tener que pasar por las props:

```diff
export const MyComponent = () => {
+  const myContext = React.useContext(MyContext);

  return (
    <>
-      <h3>Hello</h3>
+     <h3>{myContext.username}</h3>

    </>
  )
}
```

- Si ejecutamos el ejemplo podemos verlo funcionando:

```bash
npm start
```

**Ejercicio**:

1. Create un componente que se llame _MyEditComponent_ que permite editar el nombre que tenemos en el contexto.
2. Ahora vamos a añadir un botón en ese componente que se llame "guardar", hasta que no pulsemos en guardar, este valor no se actualizara.

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Si lo que te gusta es el mundo del _backend_ también puedes apuntante a nuestro [Bootcamp backend Online Lemoncode](https://lemoncode.net/bootcamp-backend#bootcamp-backend/inicio)

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)
