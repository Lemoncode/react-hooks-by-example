# 04 Component unmount

Cuando trabajábamos con componentes de clase había una forma de liberar recursos (por ejemplo una conexión socket) cuando el componente se desmontaba (componentWillUnmount). ¿Hay alguna forma de hacer algo similar usando hooks? La respuesta es si, entre otros escenarios (cuidado con aprenderlos adecuadamente).

# Pasos

- Tomaremos como punto de partida el ejemplo _00 boilerplate_. Copia el contenido del proyecto a una carpeta nueva y ejecuta _npm install_.

```bash
npm install
```

- Abramos el fichero _demo.js_: esta vez crearemos un componente padre y un componente hijo, el componente hijo se montará / desmontará pulsando un botón en el componente padre.

En el componente hijo haremos uso de _React.useEffect_ y utilizaremos como segundo parámetro un array vacío para asegurarnos que el código dentro de _useEffect_ sólo se ejecutará cuando el componente esté montado.

Sobreescribe el fichero _demo.js_ con el siguiente contenido.

_./src/demo.js_

```jsx
import React from "react";

export const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      {visible && <MyChildComponent />}
      <button onClick={() => setVisible(!visible)}>
        Toggle Child component visibility
      </button>
    </>
  );
}

const MyChildComponent = () => {
  const [userInfo, setUserInfo] = React.useState({
    name: "John",
    lastname: "Doe"
  });

  React.useEffect(() => {
    console.log("called when the component is mounted");
  }, []);

  return (
    <div>
      <h3>
        {userInfo.name} {userInfo.lastname}
      </h3>
      <input
        value={userInfo.name}
        onChange={e => setUserInfo({ ...userInfo, name: e.target.value })}
      />
      <input
        value={userInfo.lastname}
        onChange={e => setUserInfo({ ...userInfo, lastname: e.target.value })}
      />
    </div>
  );
};
```

- ¿Que podemos hacer para ejecutar código justo cuando el componente está desmontado? Sólo tenemos que retornar una función dentro del _useEffect_ entry. Haciendo esto la función se ejecutará cuando el componente esté desmontado (ya que estamos usando como segundo parámetro un array vacío).

_./src/demo.js_

```diff
  React.useEffect(() => {
    console.log("called when the component is mounted");

+    return () => console.log('Called on component unmounted, check the [] on the react use effect');
  }, []);
```

- Si ejecutas el ejemplo en la consola del navegador, simpre que hagas click para ocultar el componente hijo la función _unmounted_ se ejecutará y el mensaje se mostrará en el log de la consola del navegador.

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)