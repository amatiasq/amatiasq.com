---
title:
  en: NPM Libraries
  es: Librerías NPM

links:
  live: https://www.npmjs.com/~amatiasq
  github: https://github.com/amatiasq/amq-libs

labels:
  - Typescript
  - NPM
  - Libraries
  - Open Source
  - WebRTC
  - WebSocket
---

I creted some npm libraries with chunks of code I use in my projects.
They are all open source and available on npm.

### [@amatiasq/scheduler](https://www.npmjs.com/package/@amatiasq/scheduler)
When you need something to hapen N seconds after you invoked it.
```ts
const scheduler = new Scheduler(
  60 * 1000, // one minute
  () => console.log('hello')
)

// init countdown, will print 'hello' after 60 seconds
schedule.start();

// the scheduler will never have time to finish
// it won't print 'hello' ever
setInterval(
  () => scheduler.restart(), // restart countdown
  59 * 1000 // every 59 seconds
)
```

### [@amatiasq/client-storage](https://www.npmjs.com/package/@amatiasq/client-storage)
Wrapper for localStorage and sessionStorage with JSON serilization and versioning.

```ts
const prefs = new ClientStorage<{ mode: 'dark' | 'light' }>('user.preferences', {
  version: 0,
  default: { mode: 'dark' }
});
```


### [scad-ts](https://www.npmjs.com/package/scad-ts)
A TypeScript library to generate SCAD code.
3D printing from TypeScript and files versioned with git 🧑‍🍳👌

```ts
const lock = createLockShape(ROTATION)
const axis = cylinder(INFINITE, 1, { center: true })

const axisPosition = [
  PILLAR_OFFSET + WALL,
  INTERIOR.y / 2 - HOOK.y - HOOK_GAP - length + adjustement,
] as const

const locks = difference(lock, axis).translate(axisPosition)
const all = union(...cuadrants(locks))
```

### [@amatiasq/emmiter](https://www.npmjs.com/package/@amatiasq/emitter)
A simple event emitter library.

```ts
const emitter = new Emitter()
emitter.subscribe(() => console.log('event'))
emitter() // prints 'event'
```

### [@amatiasq/peer-connection](https://www.npmjs.com/package/@amatiasq/peer-connection)
WebRTC made simple.
Still not simple enough to fit example here.

### [@amatiasq/keyboard](https://www.npmjs.com/package/@amatiasq/keyboard)
Simple class to track keyboard pressed keys.

```ts
const keyboard = new KeyboardController();

if (keyboard.isPressed(KeyCode.Space)) {
  console.log('Space key is pressed');
}

keyboard.onKeyCodeDown(KeyCode.A, () => console.log('DOWN'));
keyboard.onKeyCodeUp(KeyCode.A, () => console.log('UP'));
```

### [@amatiasq/dom](https://www.npmjs.com/package/@amatiasq/dom)
Tagged template to generate DOM. Browser only 😬
```ts
const el = dom`<div>hello ${user.name}!</div>`
```

### [@amatiasq/json-socket](https://www.npmjs.com/package/@amatiasq/json-socket)
WebSocket with type validation, JSON serialization and automatic reconnection.

It's composed by two smaller libraries:
- [@amatiasq/resilient-socket](https://www.npmjs.com/package/@amatiasq/resilient-socket)
- [@amatiasq/nice-socket](https://www.npmjs.com/package/@amatiasq/nice-socket)

```ts
type Input = LoginRequest | Message | LogoutRequest;
type Output = AuthOk | IncomingMessage | Error;

const socket = new JsonSocket<Input, Output>('wss:sockethost.com');

// incoming is of type AuthOk, IncomingMessage or Error
socket.onMessage(incoming => {})

socket.send({ user: 'alice', password: '1234' });
```
