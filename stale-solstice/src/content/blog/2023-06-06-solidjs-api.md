---
title:
    en: SolidJS API
    es: SolidJS API (english)
tags:
  - a
  - b
  - c
  - en: en
    es: es
---

## `createSignal`

```js
const [counter, setCounter] = createSignal(initialValue);
return <h1>{counter()}</h1> // dependencies = [counter]
```

Setter only has effect if `newValue !== currentValue`.
- Override this behaviour with `setCounter(newValue, { equals: false })`
- Custom equality checker with `setCounter(newValue, { equals: (newVal, oldVal) => newVal === oldVal + 1 })`

### Derived signal

To create a signal that is the computed value of another signal

```js
const calculatedValue = () => {
    return counter() + 1;
};
```

## `createEffect`

- Registers a operation that depends on a signal
- First execution happens after the component is added to the DOM and before repaint
- Can _read_ state but **DONT WRITE STATE FROM `createEffect`**

```js
createEffect(() => {
    doSomething(counter());
});
```

### What if I want to write state?

That's `createMemo()`

```js
const plusOne = createMemo(() => {
    return counter() + 1;
})
```

What's the difference with a **derived signal**? that's executed on every invocation while `createMemo` _memoizes_ the result until `counter()` changes.

We can pass initialValue and custom equality checker.

```js
const plusOne = createMemo((prevValue) => {
    return counter() + prevValue;
}, initialValue, {
    equals: (newVal, oldVal) => newVal === oldVal + 1 // or false
})
```

### Return value can be cyclical

```js
createEffect((a) => {
    // return value will be passed to the next invocation
    return counter() + a;

    // Argument for first execution
}, initialValue);
```

### `onCleanup`

```js
createEffect(() => {
    const fetch = fetcher();
    onCleanup(() => fetch.abort());
});
```

## `createResource`

Mixes signals with `async`.

```js
const fetchUser = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return user;
};

const [user, { mutate: mutateUser, refetch: refetchUser }] = createResource(fetchUser);

return (
    <Switch>
        <Match when={user.loading}><p>Loading...<p></Match>
        <Match when={user.error}><p>ERROR: {user.error}<p></Match>
        {/* get latest value */}
        {/* user() does almost the same but returns null if re-fetching */}
        <Match when={user.latest}>...</Match>
    </Switch>
)
```

### What if the async function depends on a signal?

```js
createResource(userId, fetchUser);
```

### What if the async function depends on more signals?

```js
createResource(
    () => [userId(), roleId()],
    ([userId, roleId]) => fetchUser(userId, roleId)
);
```

### What does `mutate` do?

Mutate is just a setter, it updates the value in-memory.

### What does `refetch` do?

Are you dumb?

### And how do I update the data in the server?

I don't know! use `fetch()` to call and endpoint or something.
Remember to use `mutate` to immediately update the user and `refetch` after the operation is successful.
