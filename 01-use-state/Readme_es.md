# 01 Use State

En este ejemplo básico le añadiremos estado a un componente funcional, usando
_React.useState_

# Pasos

- Tomaremos como punto de partida el ejemplo _00 boilerplate_. Copia el contenido del proyecto a una carpeta nueva y ejecuta _npm install_.

```bash
npm install
```

- Abramos el fichero _demo.js_ y añadamos nuestro hook de estado.

_./src/demo.js_

```diff
import React from "react";

export const MyComponent = props => {
+    const [myName, setMyName] = React.useState('John Doe');

-  return <h2>My Component</h2>;
+    return(
+        <>
+            <h4>{myName}</h4>
+            <input
+                value={myName}
+                onChange={(e) => setMyName(e.target.value)}
+            />
+        </>
+    );
};
```

- Si ahora ejecutas el ejemplo podrás comprobar que el nombre (John Doe) se mostrará y puedes editarlo en el propio componente funcional, no necesitamos más un componente de clase para mantener el estado, _React.useState_ lo hace por ti.

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)