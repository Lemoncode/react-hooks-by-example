# 14 React.useRef DOM

Un caso de uso común para _useRef_ es acceder a un elemento hijo del DOM de forma imperativa.

# Pasos

- Tomaremos como punto de partida el ejemplo _00 boilerplate_. Copia el contenido del proyecto a una carpeta nueva y ejecuta _npm install_.

```bash
npm install
```

- Usaremos _useRef_ para obtener el clientWidth de un elemento div. Primero, necesitamos renderizar un elemento div y crear la referencia con _useRef_.

_./src/demo.js_

```jsx
import React from "react";

export const MyComponent = () => {
  const containerElementRef = React.useRef(null);

  return <div className="container" ref={containerElementRef} />;
};
```

_./styles.css_

```diff
.App {
  font-family: sans-serif;
  text-align: center;
}

+.container {
+  border: 1px solid steelblue;
+  margin: 15px;
+  padding: 50px;
+}
```

- En este ejemplo mostraremos la anchura del contenedor usando la referencia de este elemento del DOM. La acción de lanzará cuando el usuario pulse un botón:

```diff
import React from "react";

export const MyComponent = () => {
  const containerElementRef = React.useRef(null);
+ const [message, setMessage] = React.useState(
+   "Click button to get container width"
+ );

+ const calculateContainerWidth = () => {
+   setMessage(`Container width: ${containerElementRef.current.clientWidth}px`);
+ };

  return (
    <div className="container" ref={containerElementRef}>
+     <h2>{message}</h2>
+     <button onClick={calculateContainerWidth}>
+       Calculate container width
+     </button>
    </div>
  );
};

```

- Si ejecutamos el ejemplo obtenemos el resultado esperado.

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)