# 15 Memo predicate

En este ejemplo mejoraremos el rendimiento del renderizado hookeando 'shouldComponentUpdate'.

Vamos a implementar un widget de satisfacción de clientes, basado en caras con sonrisas. Aceptará un rango de valores (de 0 a 500) y tendrán rangos de valores 0..99, 100..199, 200..299, 300..399, 400..500. Solo lanzaremos el opción de renderizado cuando el valor salte al rango anterior o posterior.

# Pasos

- Tomaremos como punto de partida el ejemplo _15-promise-unmounted_. Copia el contenido del proyecto a una carpeta nueva y ejecuta _npm install_.

```bash
npm install
```

- Tenemos que hacer un ligero cambio en este ejemplo en nuestro _webpack.config.js_
```diff
...
    {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
-        loader: "url-loader",
+        type: "asset/resource",
      },
...
```

- Copiamos la carpeta assets (puedes copiarlas de la implementación del ejemplo en github) dentro de _src/assets_.

- Añadimos el siguiente contenido en _src/styles.css_ (estilos para las caras):

```css
.App {
  font-family: sans-serif;
  text-align: center;
}

.very-dissatisfied {
  width: 100%;
  height: 80px;
  background: url("./assets/one.png") no-repeat center;
}

.somewhat-dissatisfied {
  width: 100%;
  height: 80px;
  background: url("./assets/two.png") no-repeat center;
}

.neither {
  width: 100%;
  height: 80px;
  background: url("./assets/three.png") no-repeat center;
}

.somewhat-satisfied {
  width: 100%;
  height: 80px;
  background-color: aqua;
  background: url("./assets/four.png") no-repeat center;
}

.very-satisfied {
  width: 100%;
  height: 80px;
  background: url("./assets/five.png") no-repeat center;
}
```

- Cambiamos el contenido de que tenía en el ejemplo anterior _src/demo.tsx_. Empezaremos por añadir algo hardcodeado en el fichero:

```tsx
import * as React from "react";

export const MyComponent = (props) => {
  const { level } = props;

  return (
    <div className="somewhat-satisfied" />
  )
};
```

- Hagamos una pequeña prueba en _app.tsx_:

_./src/app.tsx_

```diff
import React from "react";
import { MyComponent } from "./demo";
+ import "./styles.css";

export const App = () => {

  return (
+    <div className="App">
-      <MyComponent />;
+      <MyComponent level={100} />;
+    </div>
  );
};
```

- Hagamos un punto de control y ejecutemos el ejemplo: comprobamos que todo funciona como esperamos.

```
npm start
```

- Ahora es el momento de enlazar la propiedad con las correspondientes caras, vamos a crear una función para eso en _demo.tsx_

_./src/demo.tsx_

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

+ interface Props {
+  level: number;
+ }

- export const MyComponent = props => {
+ export const MyComponent: React.FC<Props> = (props) => {

  const { level } = props;

  return (
-    <div className="somewhat-satisfied"/>
+    <div className={setSatisfactionClass(level)}/>
  );
}
```

- En _app.tsx_ vamos a guardar el nivel de satisfación actual en el estado del componente, además de incluir un slider para dejar que el usuario lo actualice.

_./src/app.tsx_

```diff
import React from "react";
import { MyComponent } from "./demo";
import "./styles.css";

export const App = () => {
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
-       <MyComponent level={100}/>
+       <MyComponent level={satisfactionLevel} />
    </div>
  );
}
```

- Probemos los cambios:

```
npm start
```

- Para terminar vamos a optimizar el renderizado, el cual sólo deberíamos lanzarlo cuando cambie el rango de satisfacción:

_./src/demo.tsx_


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

- export const MyComponent: React.FC<Props> = props => {
+ export const MyComponent: React.FC<Props> = React.memo( props => {

  const { level } = props;

  return (
    <div className={setSatisfactionClass(level)}/>
  );
- }
+ }, isSameRange);
```

- Si ahora ponemos un punto de parada en el método de renderizado de MyComponent, podemos ver que el renderizado sólo se lleva a cabo cuando el usuario cambio el rango de satisfacción (por ejemplo de 99 a 100).

```
npm start
```

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

Si lo que te gusta es el mundo del _backend_ también puedes apuntante a nuestro [Bootcamp backend Online Lemoncode](https://lemoncode.net/bootcamp-backend#bootcamp-backend/inicio)

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)