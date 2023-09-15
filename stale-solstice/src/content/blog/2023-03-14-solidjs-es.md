---
---

Los últimos años he pasado de AngularJS (v1) a Angular2+ y desde que probé ReactJS lo consideré mi herramienta de trabajo por defecto.

Estas semanas estuve probando SolidJS y al compararlo con ReactJS hay varias cosas que me gustan.

## Uso directo del DOM

No hay Virtual DOM en SolidJS

> DOM Son las clases y funciones que el navegador te da para modificar HTML como `document.createElement()` y `div.appendChild()`
>
> Virtual DOM es, explicado rápidamente, un montón de código que trae React para que lo uses en lugar del DOM real así React tiene control sobre el navegador.

```js
// Así creamos elementos en SolidJS
const myElement = <div />;
myElement.appendChild(<span />);
```

[Ver en codesandbox.io](https://codesandbox.io/s/rough-river-dq6p8u?file=/index.tsx)

Esto en React no es posible porque `<div />` no devuelve el elemento DOM real sino una representación interna.

```js
const myElement = <div />;
// { type: 'div', key: null, ref: null, props: {}, ... }
console.log(myElement);
```

[Ver en codesandbox.io](https://codesandbox.io/s/blissful-julien-kf7psp?file=/index.tsx)

### Acceso directo a eventos DOM

En la misma línea, ya que React esconde el DOM detrás del Virtual DOM también esconde los eventos del navegador en lo que llaman _eventos sintéticos_.

```js
import { createRoot } from "react-dom/client";

function MyComponent() {
  return (
    <button onClick={(event) => {
      // SyntheticBaseEvent {
      //   _reactName: "onClick",
      //   nativeEvent: PointerEvent,
      //   ...
      // }
      console.log(event);
    }}>
      Hola
    </button>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<MyComponent />);
```

[Ver en codesandbox.io](https://codesandbox.io/s/hardcore-feistel-xyzzoj?file=/index.tsx)

Mientras que Solid no tiene esa necesidad:

```js
function MyComponent() {
  return (
    <button onClick={(event) => {
      // PointerEvent { ... }
      console.log(event);
      event.target.classList.add('clicked')
    }}>
      Hola
    </button>
  );
}

document.body.appendChild(<MyComponent />);
```

[Ver en codesandbox.io](https://codesandbox.io/s/romantic-leftpad-52pbf9?file=/index.tsx)

## Signals vs Hooks

En React se usan Hooks que están "mágicamente" conectados a los componentes y no pueden ser usados fuera de ellos

```js
import { useState } from "react";

function MyComponent() {
  // ok
  const [count, setCount] = useState(0)
}

// Invalid hook call.
// Hooks can only be called inside of the body of a function component.
const [globalCount, setGlobalCount] = useState(0);
```

[Ver en codesandbox.io](https://codesandbox.io/s/festive-perlman-ongnnq?file=/index.tsx)

En SolidJS las Signals no tienen nada que ver con los componentes, son herramientas independientes y pueden ser usadas sin componentes en absoluto.

En SolidJS los componentes solo son una herramienta para organizar el código y nada más.

```js
import { createSignal } from "solid-js";

function MyComponent() {
  // ok
  const [count, setCount] = createSignal(0);
}

// ok
const [globalCount, setGlobalCount] = createSignal(0);
```

[Ver en codesandbox.io](https://codesandbox.io/s/affectionate-wescoff-i2uswe?file=/index.tsx)

## Los componentes se ejecutan una sola vez

En React una función componente se ejecuta cada vez que algo cambia. Esto hizo que el equipo de React se viera en la necesidad de crear el hook `useEffect()` que es, con diferencia, el concepto más difícil de entender de React y cuya principal responsabilidad es "ejecutar código algunas veces en lugar de cada vez que el componente se ejecuta".

```js
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

// podemos poner estos valores en la llamada a useEffect
// pero ahí pierden su significado
// creamos variables para que se entienda lo que hacen
const EXECUTE_ONCE = [];
const EXECUTE_ALWAYS = null;
const ONE_SECOND = 1000;

function MyComponent() {
  const [count, setCount] = useState(0);

  console.log("Renderizando...", count);

  useEffect(() => {
    // setInterval no funcionaría por cuestiones
    // que escapan el alcance de este post
    // es un ejemplo de lo complejo que es useEffect
    setTimeout(() => setCount(count + 1), ONE_SECOND)
  }, EXECUTE_ALWAYS)

  return <div>{count}</div>
}

const root = createRoot(document.getElementById('root'));
root.render(<MyComponent />);
```

[Ver en codesandbox.io](https://codesandbox.io/s/romantic-pine-hv1lem?file=/index.tsx)

Mientras que en SolidJS el componente se ejecuta una sola vez, cualquier cambio en las Signals sólo afecta a la parte del HTML (o código) que use dichas Signals:

```js
import { createSignal } from "solid-js";

const ONE_SECOND = 1000;

function MyComponent() {
  const [count, setCount] = createSignal(0);
  console.log("Renderizando una vez");
  setInterval(() => setCount(count() + 1), ONE_SECOND);
  return <div>{count()}</div>;
}

document.body.appendChild(<MyComponent />);
```

[Ver en codesandbox.io](https://codesandbox.io/s/zen-wood-5cd41k?file=/index.tsx)

Aquí también se puede apreciar la diferencia entre SolidJS y ReactJS, este último al necesitar pasar por la capa de Virtual DOM antes de llegar al DOM real necesita que importemos y usemos más abstracciones:

```js
import { createRoot } from "react-dom/client";
// ... y más adelante ...
createRoot(document.getElementById('root')).render(...)
```

En SolidJS `<MyComponent />` devuelve un objeto DOM real que podemos añadir directamente al `body` (nunca usen `body` con `ReactDOM.createRoot()` o pasarán cosas malas).

He visto personas presentar el hecho de que los componentes se ejecuten una sola vez como algo negativo ya que "pensar cada estado de la aplicación desde cero" es uno de los eslogans de React. Pero, en mi opinión, eso nunca fue verdad debido a la existencia de `useEffect()`. No importa qué componente estés mirando, si tiene `useEffect()` deberemos tener en cuenta las ejecuciones anteriores y posteriores.

## JSX

También hay varios detalles en las diferencias del JSX de ReactJS y de SolidJS como poner clase CSS a un elemento:

- ReactJS: `<div className="a" />`
- SolidJS: `<div class="a" />`
- HTML: `<div class="a"></div>`

U obtener el objeto DOM real en React

```js
import { createRef } from 'react';

function MyComponent() {
  const ref = createRef();
  return <div ref={ref} onClick={() => console.log(ref.current)} />
}
```

Vs obtener el objeto DOM en Solid:

```js
const ref = <div />
```

O

```js
function MyComponent() {
  let ref;
  return <div ref={ref} onClick={() => console.log(ref)} />
}
```

Además Solid viene con varias utilidades en forma de componentes como

- `<Show when={...}>`
- `<For each={...}>`
- `<Dynamic as="div" />`
- [y más](https://www.solidjs.com/docs/latest/api#control-flow)

Que en React deben ser creados a mano o implementados desde código, produciendo una mezcla de JSX y JS difícil de leer.

## Directivas

Finalmente y más importante, esto es una funcionalidad que simplemente no he visto en React (porque tampoco encajaría): extender elementos con código.

Normalmente en React cuando creamos un componente que genera elementos DOM, por ejemplo un `<div>`, debemos asegurarnos que nuestro componente acepta todas las propiedades que acepta `<div>`, extraer las que son relevantes para nuestro componente y pasar el resto al div. Esto es fácil en Javascript pero cuando usamos Typescript se complica un poco:

> Nota: si estás usando Javascript sin Typescript... vé y pruébalo.

```ts
// Si no excluimos las propiedades que
// vamos a sobreescribir Typescript dará error
type DivProps = Omit<
    ComponentProps<"div">,
    "onDrag" | "onDragStart" | "onDragEnd"
>;

type DraggableProps = DivProps & {
  onDrag: (event: MyCustomEvent) => void;
  onDragStart: (event: MyCustomEvent) => void;
  onDragEnd: (event: MyCustomEvent) => void;
};

function Draggable({
  onDrag,
  onDragStart,
  onDragEnd,
  children,
  ...divProps
}: DraggableProps) {
  return (
    <div
      onDrag={handleDrag}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      // `draggable` sólo no funciona
      draggable={true}
      {...divProps}
    >
      {children}
    </div>
  );

  function handleDrag() { /* ... */ }
  function handleDragStart() { /* ... */ }
  function handleDragEnd() { /* ... */ }
}
```

Parece un montón de código "boilerplate", repetitivo y que no aporta mucha información.

En Solid esto se resuelve con directivas, funciones que no son componentes en sí sino que se ejecutan sobre un componente.

Las directivas __extienden__ el DOM en lugar de __contenerlo__.

```js
import { onCleanup } from "solid-js";

function draggable(el, { onDrag, onDragStart, onDragEnd }) {
  el.setAttribute('draggable', 'true')
  el.addEventListener('drag', handleDrag);
  el.addEventListener('dragstart', handleDragStart);
  el.addEventListener('dragstop', handleDragEnd);

  onCleanup(() => {
    el.removeAttribute('draggable')
    el.removeEventListener('drag', handleDrag);
    el.removeEventListener('dragstart', handleDragStart);
    el.removeEventListener('dragstop', handleDragEnd);
  });

  function handleDrag() { /* ... */ }
  function handleDragStart() { /* ... */ }
  function handleDragEnd() { /* ... */ }
}

const element = <div use:draggable={{
  onDrag() { /* ... */ },
  onDragStart() { /* ... */ },
  onDragEnd() { /* ... */ },
}} />;
```

[Ver en codesandbox.io](https://codesandbox.io/s/eager-banach-2tdqdn?file=/index.tsx)

## Contras

Hay dos puntos particularmente dolorosos en Solid al compararlo con React:

### 1. __NO HACER DESTRUCTURING DE LAS PROPERTIES__

El objeto `props` en SolidJS es un `Proxy`, si no sabes lo que eso significa basta con saber que Solid sabe cuándo accedes a `props.algo` y devolverá el valor actualizado si éste cambia.

Si hacemos destructuring de las props estamos leyendo todas las propiedades una sola vez al crear el componente y si alguno era una signal no recibiremos actualizaciones:

```js
import { createSignal } from "solid-js";

// DON'T DO THIS IN SOLID
function MyComponent({ a, b }) {
  return <div>{a} - {b}</div>;
}

const [signal1, setSignal1] = createSignal();
const [signal2, setSignal2] = createSignal();

const element = <MyComponent a={signal1()} b={signal2()} />;

// <div> no se actualizará
setSignal1('Hola')
setSignal2('Mundo')
```

En lugar de eso debemos recibir `props` como una sola variable y acceder a las propiedades allá donde las usemos:

```js
import { createSignal } from "solid-js";

function MyComponent(props) {
  return <div>{props.a} - {props.b}</div>;
}

const [signal1, setSignal1] = createSignal();
const [signal2, setSignal2] = createSignal();

const element = <MyComponent a={signal1()} b={signal2()} />;

// <div> se actualiza una vez
setSignal1('Hola')
// <div> se actualiza otra vez
setSignal2('Mundo')

// o
import { batch } from 'solid-js'

// <div> se actualiza una sola vez
batch(() => {
  setSignal1('Hola')
  setSignal2('Mundo')
})
```

### 2. Manipulación de props

Siguiendo con el punto anterior, eso significa que en Solid no podemos simplemente separar props

```js
const { a, b, ...rest } = props
// o
const newProps = { ...defaultProps, ...props };
```

En lugar de eso Solid nos da dos funciones para hacer estas operaciones: `splitProps()` y `mergeProps()`.

```js
const [vowels, consonants, leftovers] = splitProps(
    props,
    ["a", "e"],
    ["b", "c", "d"]
);
// y
const newProps = mergeProps(defaultProps, props);
```

## Conclusión

En resumen SolidJS es una librería que ha aprendido mucho de React y nos da una experiencia de desarrollo similar pero quitando de en medio todas las capas de abstracción que React añadió (necesariamente) cuando los estándares webs no estaban a la altura de las aplicaciones que estamos desarrollando.

Dejo aquí mi plantilla para crear proyectos con SolidJS, Typescript y Vite como compilador:

https://github.com/amatiasq/vite-solidjs-typescript-boilerplate

Pasen buen día
