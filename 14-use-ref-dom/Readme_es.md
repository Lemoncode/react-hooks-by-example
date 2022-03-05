[<img align="left" src="https://images.squarespace-cdn.com/content/v1/56cdb491a3360cdd18de5e16/1536155167931-3JJ7O74IM4QP88L0RQS9/3_200.png" alt="español" width="170"/>](https://lemoncode.net/) 


[<img align="right" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Spain_flag_icon.svg/1200px-Spain_flag_icon.svg.png" alt="english" width="50"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/14-use-ref-dom/Readme_es.md)
[<img align="right" src="https://assets.stickpng.com/images/580b585b2edbce24c47b2836.png" alt="inglés" width="47"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/14-use-ref-dom/Readme.md)
  
<br>
<br>


# 14 React.useRef DOM

En el ejemplo anterior introdujimos el hook _userRef_, en este ejemplo
vamos a usarlo para acceder a un nodo del dom.

# Pasos

- Tomamos como punto de partida [_13-async-closure_](https://github.com/Lemoncode/react-hooks-by-example/blob/master/13-async-closure), copiamos el contenido
  y hacemos un _npm install_.

```bash
npm install
```

- En _demo.js_ pegamos el siguiente código (fijate que aquí definimos
  el _useRef_ y lo asociamos en el _div_ container).

_./src/demo.tsx_

```tsx
import React from "react";

export const MyComponent = () => {
  const containerElementRef = React.useRef(null);

  return <div className="container" ref={containerElementRef} />;
};
```

- Vamos a darle un estilo a ese div para distinguirlo.

_./styles.css_

```diff
.my-text {
  color: blue;
}

+.container {
+  border: 1px solid steelblue;
+  margin: 15px;
+  padding: 50px;
+}
```

- En este ejemplo vamos a mostrar el ancho actual del contenedor usando el _ref_ asociado
  a este elemento del _dom_

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

- Si ejecutamos, podemos ver como ahora nos da el resultado actual cuando pulsamos
  en el botón.

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Si lo que te gusta es el mundo del _backend_ también puedes apuntante a nuestro [Bootcamp backend Online Lemoncode](https://lemoncode.net/bootcamp-backend#bootcamp-backend/inicio)

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)
