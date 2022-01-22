[<img align="left" src="https://images.squarespace-cdn.com/content/v1/56cdb491a3360cdd18de5e16/1536155167931-3JJ7O74IM4QP88L0RQS9/3_200.png" alt="español" width="170"/>](https://lemoncode.net/) 


[<img align="right" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Spain_flag_icon.svg/1200px-Spain_flag_icon.svg.png" alt="english" width="50"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/02-use-state-object/Readme_es.md)
[<img align="right" src="https://assets.stickpng.com/images/580b585b2edbce24c47b2836.png" alt="inglés" width="47"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/02-use-state-object/Readme.md)
  
<br>
<br>


# 02 Use State Object

## Resumen

Este ejemplo toma como punto de partida el ejemplo [_01-use-state_](https://github.com/Lemoncode/react-hooks-by-example/blob/master/01-use-state/Readme_es.md).

En el ejemplo anterior almacenabamos un string en el estado, pero
no todo son tipos básicos, ¿Podemos almacenar un objeto utilizando
useState? Claro que sí, lo único que cuando queremos introducir
cambios en el estado tenemos que seguir el principio de inmutabilidad
y no modificar el objeto original.

## Paso a Paso

- Primero copiamos el ejemplo anterior, y hacemos un _npm install_

```bash
npm install
```

- Vamos a almacenar en el estado un objeto que tenga el nombre
  y apellido de un usuario, de primeras podemos escribir algo así como:

_./src/demo.tsx_

```diff
export const MyComponent: React.FC = () => {
-  const [myName, setMyName] = React.useState("John Doe");
+  const [userInfo, setUserInfo] = React.useState({
+    name: 'John',
+    lastname: 'Doe',
+  });
```

Así creamos un estado al que le almacenamos el objeto, pero nos vendría
bien tener algo de strong typing, que nos ayude a encontrar fallos tontos
del tipo me olvide poner la "t" en lastname.

```diff
+ interface UserInfo {
+  name : string;
+  lastname: string;
+ }

export const MyComponent: React.FC = () => {
-  const [userInfo, setUserInfo] = React.useState({
+  const [userInfo, setUserInfo] = React.useState<UserInfo>({
    name: "John",
    lastname: "Doe",
  });
```

- Ya tenemos tipado el _useState_ en el que tenemos userInfo,
  vamos a mostrar los datos por defecto.

```diff
  return (
    <>
-      <h4>{myName}</h4>
+      <h4>{userInfo.name} {userInfo.lastname}</h4>
-      <input value={myName} onChange={(e) => setMyName(e.target.value)} />
    </>
  );
```

- Si arrancamos la aplicación podemos ver como se muestra el nombre y apellido.

- Ahora vamos al turrón, podríamos estar tentados de modificar directamente userInfo y
  ver que pasa, hacer algo así como (**SPOILER ALERT: ESTO ESTA MAL**):

```diff
  return (
    <>
      <h4>
        {userInfo.name} {userInfo.lastname}
      </h4>
+     <input
+       value={userInfo.name}
+       onChange={e => userInfo.name = e.target.value}
+     />
    </>
  );
```

Esto no va a funcionar, hemos vuelto a pensar en mentalidad Java,
estamos intentando modificar algo que está vivo en el momento
que se ejecuta esta función, tenemos que pedirle al estado
que vamos a introducir una modificación.

- La forma de hacer esto es pasándole al estado un nuevo objeto, en el que
  los valores que no cambian se mantienen y los que cambian se crean como
  nuevo objeto / entrada, aquí viene el spread operator (los tres puntitos)
  al rescate.

```diff
  return (
    <>
      <h4>
        {userInfo.name} {userInfo.lastname}
      </h4>
      <input
        value={userInfo.name}
-        onChange={(e) => (userInfo.name = e.target.value)}
+        onChange={(e) => setUserInfo({
+                 ...userInfo,
+                 name: e.target.value
+                 })}
      />
    </>
  );
```

Ahora sí que funciona, cuando queremos actualizar _userInfo_ hacemos
la petición para actualizar el estado y le creamos un objeto nuevo
copiando todas las propiedades del antiguo y como último pasa machacamos
el valor de la propiedad que ha cambiado.

- Vamos a hacer lo mismo para lastname, si quieres dale a la pausa en este
  video e intentalo tu por tu cuenta.

```diff
  return (
    <>
      <h4>
        {userInfo.name} {userInfo.lastname}
      </h4>
      <input
        value={userInfo.name}
        onChange={(e) =>
          setUserInfo({
            ...userInfo,
            name: e.target.value,
          })
        }
      />
+      <input
+        value={userInfo.lastname}
+        onChange={(e) =>
+          setUserInfo({
+            ...userInfo,
+            lastname: e.target.value,
+          })
+        }
+      />
    </>
  );
```

Ahora podemos probar y ver que podemos actualizar tanto el nombre como
el apellido.

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Si lo que te gusta es el mundo del _backend_ también puedes apuntante a nuestro [Bootcamp backend Online Lemoncode](https://lemoncode.net/bootcamp-backend#bootcamp-backend/inicio).

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)
