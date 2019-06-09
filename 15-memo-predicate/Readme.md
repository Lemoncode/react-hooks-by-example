# 15 Memo predicate

In this sample we will enhance rendering performance hooking to 'shouldComponentUpdate'.

We are going to implement a customer satisfaction widget, based on smily faces, it will accept a range value (0 to 500), and the faces will have a range of values 0..100, 100..200, 200..300, 300..400, 400..500. We will only fire the render option whenever the value jumps into the next or previous range.

# Steps

- We will take as starting point sample _00 boilerplate_. Copy the content of the project to a fresh folder an execute _npm install_.

```bash
npm install
```

- Let's copy the five smiley faces (you can copy them from the sample implementation in github).

- Let's add the following content into the _src/styles.css_  css file to add the smileys styles:

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

- Let's create a simple component in  _src/demo.js_,  we will start by just adding something hardcoded in file:

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

- Let's make a quick test on _index.js_:

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
- Let's make a check point and run the sample: check that is working as expected.

```
npm start
```

- Now it's time to link the property with the proper faces, let's create a style function for that in _demo.js_

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

- In _index.js_ let's add a state variable to hold the current satisfaction level plus an slider to let the user update it.

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

- Let's run the sample:

```
npm start
```

- Let's add a rendering optimization, we should only trigger the render whenever the level just changes the satisfaction range:

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

- Now if we place a breakpoint in the faceComponent render method we can see that render is only triggered when you change from a satisfaction range (e.g. 99 to 100).

```
npm start
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
