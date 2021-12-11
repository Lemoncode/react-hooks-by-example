# 15 Memo predicate

In this example we will enhance rendering performance hooking to 'shouldComponentUpdate'.

We are going to implement a customer satisfaction widget, based on smily faces, it will accept a range value (0 to 500), and the faces will have a range of values 0..99, 100..199, 200..299, 300..399, 400..500. We will only fire the render option whenever the value jumps into the next or previous range.

# Steps

- We will take as starting point sample _15-promise-unmounted_. Let's copy the content of the project to a fresh folder an execute _npm install_.

```bash
npm install
```
- We have to make a slight change in this example in our _webpack.config.js_

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

- Let's copy the five smiley faces (you can copy them from the sample implementation in github)  into the route _src/assets_.

- Let's add the following content into the _src/styles.css_  css file to add the smileys styles:

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

- Let's change the component _src/demo.tsx_,  we will start by just adding something hardcoded in the component:

```tsx
import * as React from "react";

export const MyComponent = (props) => {
  const { level } = props;

  return (
    <div className="somewhat-satisfied" />
  )
};
```

- Let's make a quick test on _app.tsx_:

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

- Let's make a check point and run the sample: check that is working as expected.

```
npm start
```

- Now it's time to link the property with the proper faces, let's create a style function for that in _demo.tsx_

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

- export const MyComponent = props => {
+ export const MyComponent: React.FC<Props> = (props) => {

  const { level } = props;

  return (
-    <div className="somewhat-satisfied"/>
+    <div className={setSatisfactionClass(level)}/>
  );
}
```

- In app.tsx_ let's add a state variable to hold the current satisfaction level plus an slider to let the user update it.

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

- Let's run the sample:

```
npm start
```

- Let's add a rendering optimization, we should only trigger the render whenever the level just changes the satisfaction range:

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
```isSameRange);
```

- Now if we place a breakpoint in the FaceComponent render method we can see that render is only triggered when you change from a satisfaction range (e.g. 99 to 100).

```
npm start
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend