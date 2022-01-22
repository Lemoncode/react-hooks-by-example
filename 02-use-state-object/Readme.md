[<img align="left" src="https://images.squarespace-cdn.com/content/v1/56cdb491a3360cdd18de5e16/1536155167931-3JJ7O74IM4QP88L0RQS9/3_200.png" alt="español" width="170"/>](https://lemoncode.net/) 


[<img align="right" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Spain_flag_icon.svg/1200px-Spain_flag_icon.svg.png" alt="english" width="50"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/02-use-state-object/Readme_es.md)
[<img align="right" src="https://assets.stickpng.com/images/580b585b2edbce24c47b2836.png" alt="inglés" width="47"/>](https://github.com/Lemoncode/react-hooks-by-example/blob/master/02-use-state-object/Readme.md)
  
<br>
<br>

# 02 Use State Object

## Resume

This example takes the [_01-use-state_](https://github.com/Lemoncode/react-hooks-by-example/blob/master/01-use-state/Readme.md) as a starting point.

In the previous example we stored a string in the state, but
...do we need to use a _useState_ per each basic fild, can we store an object using
useState? Yes you can, but we have to take into consideration that updates on this
object must be done following the principle of immutability (we never
add an update on a given object, we create a new one).

## Steps

- First we copy the previous example, and execute a _npm install_

```bash
npm install
```

- Let's go store in the state an object that has the name
  and last name of a given user, we can write something like:

_./src/demo.tsx_

```diff
export const MyComponent: React.FC = () => {
-  const [myName, setMyName] = React.useState("John Doe");
+  const [userInfo, setUserInfo] = React.useState({
+    name: 'John',
+    lastname: 'Doe',
+  });
```

By doing this we create a state that stores the object, but it would a good idea to
get benefit of using TypeScript and add strong typing, this will help us finding silly bugs
like _Ouch ! I forgot to type the "t" in lastname_.

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

- Coold, now that we got our object stored and typed, let's display the user name and lastname.

```diff
  return (
    <>
-      <h4>{myName}</h4>
+      <h4>{userInfo.name} {userInfo.lastname}</h4>
-      <input value={myName} onChange={(e) => setMyName(e.target.value)} />
    </>
  );
```

If we start the application we can see how the name and surname are displayed.

- Let's jump on the main thing, updating the name field..., we might be tempted to update userInfo, but this won't
  work, anyway let's give a try (**SPOILER ALERT: THIS IS WRONG**):

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

This is not going to work, we are again applying a Java / Angular approach,
we are trying to modify something that is alive only when the function is being
executed, once the component is rerended this value will be lost.

- The way to do this is by creating a new objecto and assigning it using the _setState_
  method, in order to do this copy we use the spread operator (by doing this all the fields
  that doesn't change are just passed as they are, they are not recreated).

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

Now it works, when we want to update _userInfo_ we do
the request to update the state and we create a new object
copying all the properties of the old one and creating a new
entry for the one that had changes.

- Let's do the same for lastname, before reading the solution
  try to solve it by yourself, it's a good exercise.

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

Now we can test and see that we can update both the name and
surname.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
