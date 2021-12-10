# 02 Use State Object

## Resume

This example takes the _01-use-state_ example as a starting point.

In the previous example we stored a string in the state, but
not all are basic types, can we store an object using
useState? Sure yes, the only thing that when we want to introduce
changes in state we have to follow the principle of immutability
and do not modify the original object.

## Steps

- First we copy the previous example, and do a _npm install_

```bash
npm install
```

- Let's go to store in the state an object that has the name
  and last name of a user, first we can write something like:

_./src/demo.tsx_

```diff
export const MyComponent: React.FC = () => {
-  const [myName, setMyName] = React.useState("John Doe");
+  const [userInfo, setUserInfo] = React.useState({
+    name: 'John',
+    lastname: 'Doe',
+  });
```

So we create a state to which we store the object, but it would come to us
good to have some strong typing, to help us find silly bugs
of the type I forgot to put the "t" in lastname.

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

- We already have the _useState_ typed in which we have userInfo,
  we are going to show the data by default.

```diff
  return (
    <>
-      <h4>{myName}</h4>
+      <h4>{userInfo.name} {userInfo.lastname}</h4>
-      <input value={myName} onChange={(e) => setMyName(e.target.value)} />
    </>
  );
```

- If we start the application we can see how the name and surname are displayed.

- Now let's go to the nougat, we might be tempted to directly modify userInfo and
  see what happens, do something like (**SPOILER ALERT: THIS IS WRONG**):

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

This is not going to work, we have rethought in Java mentality,
we are trying to modify something that is alive in the moment
that this function is executed, we have to ask the state
that we are going to introduce a modification.

- The way to do this is by passing the state a new object, in which
  values ​​that do not change are kept and those that change are created as
  new object / input, here comes the spread operator (the three dots)
  to the rescue.

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
the request to update the state and we create a new object for it
copying all the properties of the old one and as last happens we crush
the value of the property that has changed.

- Let's go to do the same for lastname, if you want to give the pause in this
  video and try it on your own.

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
