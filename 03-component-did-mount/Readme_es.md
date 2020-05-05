# 03 Component Did Mount

Leer y actualizar el estado de un componente funcional es algo genial, pero estamos pasando por alto otra parte importante de los componentes de clase, ¿Qué pasa con los controladores de eventos del ciclo de vida como _componentDidMount_? ¿Cómo podemos enganchar un evento como ese en un componente funcional? _React.useEffect_ es tu amigo.

# Pasos

- Tomaremos como punto de partida el ejemplo _00 boilerplate_. Copia el contenido del proyecto a una carpeta nueva y ejecuta _npm install_.

```bash
npm install
```

- Abramos el fichero _demo.js_, y sobreescribámoslo con el siguiente contenido.

_./src/demo.js_

```jsx
import React from "react";

export const MyComponent = () => {
  const [username, setUsername] = React.useState("");

  return (
    <>
      <h4>{username}</h4>
      <input value={username} onChange={e => setUsername(e.target.value)} />
    </>
  );
};
```

- Si ejecutamos el ejemplo, nada se mostrará (name está vacío). ¿Y si queremos asignar algún valor justo cuando el componente se ha montado? Podemos hacer uso de _React.useEffect_ pasando como segundo argumento un array vacío (esto es importante ya que si no el código dentro de _useEffect_ se ejecutaría en el mount y justo después de cada render).

_./src/demo.js_

```diff
import React from "react";

export const MyComponent = () => {
  const [username, setUsername] = React.useState("");

+  React.useEffect(() => {
+    setUsername("John");
+  }, []);

  return (
    <>
      <h4>{username}</h4>
      <input value={username} onChange={e => setUsername(e.target.value)} />
    </>
  );
};
```

- Ahora si ejecutas el ejemplo puedes comprobar que _John_ se muestra como user name.

* Vayamos un paso más allá, simulemos una llamada asíncrona (lo haremos usando _setTimeout_).

_./src/demo.js_

```diff
import React from "react";

export const MyComponent = () => {
  const [username, setUsername] = React.useState("");

  React.useEffect(() => {
-    setUsername("John");
+    // Simulating async call
+    setTimeout(() => {
+      setUsername("John");
+    }, 1500);
  }, []);

  return (
    <>
      <h4>{username}</h4>
      <input value={username} onChange={e => setUsername(e.target.value)} />
    </>
  );
};
```

- Ahora _John_ se muestra después de 1,5 segundos. En lugar de _setTimeout_ podrías usar aquí _fetch_ o cualquier otra forma similar de hacer una petición ajax.

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)