# 03 Webpack React

## Resumen

Este ejemplo toma como punto de partida el ejemplo _02-webpack-boiler_.

Vamos a ir paso a paso añdiendo la configuración necesaria para que integrar
**React** en nuestro proceso de build.

## Paso a Paso

- Primero copiamos el ejemplo anterior, y hacemos un _npm install_

```bash
npm install
```

- Vamos a instalar _react_ y _react-dom_

```bash
npm install react react-dom --save
```

- Vamos a instalarnos los typing de _react_ y _react-dom_

```bash
npm install @types/react @types/react-dom --save-dev
```

Así tenemos la librería de React y los bindings para que se integre con un navegador web.

- En el index.html vamos a meter el _div_ que nos servirá como punto de entrada para instanciar
  nuestra aplicación React.

_./src/index.html_

```diff
  <body>
-    Hello World !
+    <div id="root"></div>
  </body>
```

- Vamos a crear nuestro primero componente React.

_./src/app.tsx_

```tsx
import React from "react";

export const App = () => {
  return (
    <h1>Hello React !!</h1>
  )
}
```

- Es hora de instanciar ese compente principal, para poder integrarlo con el navegador
  tenemos que hacer uso a _ReactDOM.render_

_./src/index.tsx_

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById("root")
);
```

- Vamos por buen camino, pero si intentamos ejecutar esto no va fallar, ya que _babel_ no sabe
  como transformar el _jsx_ (recordemos que esto era un azucar, que en realidad era un XML) a
  javaScript, para que babel sea capaz de entender esto tenemos que instalar el _preset_
  _@babel/preset-react_

Primero lo instalamos

```bash
npm install @babel/preset-react --save-dev
```

_.babelrc_

```diff
{
  "presets": [
      "@babel/preset-env",
      "@babel/preset-typescript",
+     "@babel/preset-react"
  ]
}
```

- Es hora de saltar al _webpack.config.js_

- Nos podemos asegurar de que tenemos como extension valida _ts_ y _tsx_
- También que en el loader aceptamos tanto _ts_ como _tsx_
- Y en el app tenemos como punto de entrada _index.tsx_

* Vamos a comprobar que hemos dejado todo funcionando:

```bash
npm start
```
