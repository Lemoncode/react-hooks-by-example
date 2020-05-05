# 02 Use State Object

En el ejemplo anterior aprendimos como hacer uso de _useState_ para añadirle estado a un componente funcional. Solo añadimos un simple campo de texto (string), ¿pero si queremos utilizar _useState_ sobre un objeto? ¿Cual es equivalente a _SetState_ de los componentes de clase? Tu amigo el spread operator :), vayamos a ello.

# Pasos

- Tomaremos como punto incial el ejemplo _00 boilerplate_. Copia el contenido del proyecto en un carpeta nueva y ejecuta _npm install_.

```bash
npm install
```

- Abramos el fichero _demo.js_ y añadamos nuestro hook de estado.

_./src/demo.js_

```diff
import React from "react";

export const MyComponent = props => {
+    const [userInfo, setUserInfo] = React.useState({
+       name: 'John',
+       lastname: 'Doe',
+    });

-  return <h2>My Component</h2>;
+    return(
+        <>
+            <h4>{userInfo.name} {userInfo.lastname}</h4>
+            <input
+                value={userInfo.name}
+                onChange={(e) => setUserInfo({
+                   ...userInfo,
+                    name: e.target.value
+                })}
+            />
+            <input
+                value={userInfo.lastname}
+                onChange={(e) => setUserInfo({
+                    ...userInfo,
+                    lastname: e.target.value
+                })}
+            />
+        </>
};
```

- Si ahora ejecutas el ejemplo podrás comprobar que puedes actualizar ambas propiedades
  _name_ and _lastname_, puedes fácilmente asignar un objeto a useState, y para actualizarlo sólo tienes que hacer uso del _spread operator_ en lugar de usar _setState_.

  # ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)