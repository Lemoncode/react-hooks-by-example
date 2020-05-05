# 15 Memo predicate

En este ejemplo mejoraremos el rendimiento del renderizado hookeando 'shouldComponentUpdate'.

Vamos a implementar un widget de satisfacción de clientes, basado en caras con sonrisas. Aceptará un rango de valores (de 0 a 500) y tendrán rangos de valores 0..99, 100..199, 200..299, 300..399, 400..500. Solo lanzaremos el opción de renderizado cuando el valor salte al rango anterior o posterior.

# Pasos

- Tomaremos como punto de partida el ejemplo _00 boilerplate_. Copia el contenido del proyecto a una carpeta nueva y ejecuta _npm install_.

```bash
npm install
```

- Copiemos las cinco caras sonrientes (puedes copiarlas de la implementación del ejemplo en github).

- Añadamos el siguiente contenido en _src/styles.css_ (estilos para las caras):

```css
.very-dissatisfied {
  width: 100%;
  height: 80px;
  background: url("./one.png") no-repeat;
}

.somewhat-dissatisfied {
  width: 100%;
  height: 80px;
  background: url("./two.png") no-repeat;
}

.neither {
  width: 100%;
  height: 80px;
  background: url("./three.png") no-repeat;
}

.somewhat-satisfied {
  width: 100%;
  height: 80px;
  background: url("./four.png") no-repeat;
}

.very-satisfied {
  width: 100%;
  height: 80px;
  background: url("./five.png") no-repeat;
}
```

- Vamos a crear un componente simple en _src/demo.js_. Empezaremos por añadir algo hardcodeado en el fichero:

```diff
import * as React from 'react';

- export const MyComponent = props => {
-  return <h2>My Component</h2>;
- };
+ export const FaceComponent = props => {
+
+   const { level } = props;
+
+   return (
+     <div className="somewhat-satisfied"/>
+   );
+ }
```

- Hagamos una pequeña prueba en _index.js_:

_./src/index.js_

```diff
import React from "react";
import ReactDOM from "react-dom";
- import { MyComponent } from "./demo";
+ import { FaceComponent } from "./demo";
import "./styles.css";

function App() {
  return (
    <div className="App">
-       <MyComponent />
+       <FaceComponent level={100}/>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```
- Hagamos un punto de control y ejecutemos el ejemplo: comprobamos que todo funciona como esperamos.

```
npm start
```

- Ahora es el momento de enlazar la propiedad con las correspondientes caras, vamos a crear una función para eso en _demo.js_

_./src/demo.js_

```diff
import * as React from 'react';

+ const setSatisfactionClass = level => {
+
+   if (level < 100) {
+     return "very-dissatisfied"
+   }
+
+   if (level < 200) {
+     return "somewhat-dissatisfied"
+   }
+
+   if (level < 300) {
+     return "neither"
+   }
+
+   if (level < 400) {
+     return "somewhat-satisfied"
+   }
+ 
+   return "very-satisfied"
+ }

export const FaceComponent = props => {

  const { level } = props;

  return (
-    <div className="somewhat-satisfied"/>
+    <div className={setSatisfactionClass(level)}/>
  );
}
```

- En _index.js_ vamos a guardar el nivel de satisfación actual en el estado del componente, además de incluir un slider para dejar que el usuario lo actualice.

_./src/index.js_

```diff
import React from "react";
import ReactDOM from "react-dom";
import { FaceComponent } from "./demo";
import "./styles.css";

function App() {
+
+   const [satisfactionLevel, setSatisfactionLevel] = React.useState(300);
+
  return (
    <div className="App">
+       <input type="range"
+         min="0"
+         max="500"
+         value={satisfactionLevel}
+         onChange={(event) => setSatisfactionLevel(+event.target.value)}
+       />
+       <br />
+       <span>{satisfactionLevel}</span>
+       <br />
-       <FaceComponent level={100}/>
+       <FaceComponent level={satisfactionLevel} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

- Probemos los cambios:

```
npm start
```

- Para terminar vamos a optimizar el renderizado, el cual sólo deberíamos lanzarlo cuando cambie el rango de satisfacción:

_./src/demo.js_


```diff
import * as React from 'react';

const setSatisfactionClass = level => {

  if (level < 100) {
    return "very-dissatisfied"
  }

  if (level < 200) {
    return "somewhat-dissatisfied"
  }

  if (level < 300) {
    return "neither"
  }

  if (level < 400) {
    return "somewhat-satisfied"
  }

  return "very-satisfied"
}

+ const isSameRange = (prevValue, nextValue) => {
+ 
+   const prevValueClass = setSatisfactionClass(prevValue.level);
+   const nextValueClass = setSatisfactionClass(nextValue.level);
+ 
+   return prevValueClass === nextValueClass;
+ }

- export const FaceComponent = props => {
+ export const FaceComponent = React.memo(props => {

  const { level } = props;

  return (
    <div className={setSatisfactionClass(level)}/>
  );
- }
+ }, isSameRange);
```

- Si ahora ponemos un punto de parada en el método de renderizado de FaceComponent, podemos ver que el renderizado sólo se lleva a cabo cuando el usuario cambio el rango de satisfacción (por ejemplo de 99 a 100).

```
npm start
```

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)