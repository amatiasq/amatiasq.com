---
---

Siguiendo [este video](https://www.youtube.com/watch?v=R6FDpTv6CYg) aprendí la notación _flecha_ en matemáticas:

```
3↑3 = 3^3^3 = 3^27 = 7_625_597_484_987
```

Que se vuelve más brutal cuantas más flechas añadimos

```
3↑↑3 = 3↑3↑3 = 3↑7_625_597_484_987
3↑↑↑3 = 3↑↑3↑↑3 = 3↑3↑3↑3↑3↑3↑3↑3... (repetir 7_625_597_484_987 veces)
```

Así que me pregunté que tan lejos puede una computadora llevar estos cálculos, para ello creé la función `flecha` que representa ésta operación

```js
function flecha(base, exponente) {
    let valor = base;

    for (let i = 0; i < exponente; i++) {
        valor = valor ** base;
    }

    return valor;
}

flecha(3, 3) // 7625597484987
flecha(3, 3).toString().length //13
```

Tiene buena pinta, el número y cálculo para una sola flecha es correcto, hagamos la función que maneja expresiones de múltiples flechas (`3↑↑3` y `3↑↑↑3`), para esto la cantidad the flechas será un nuevo parámetro al final.

```js
function muchasFlechas(base, exponente, amount = 1) {
    if (amount === 1) {
        // only one flecha, use the previous function
        return flecha(base, exponente);
    }

    let valor = base;

    for (let i = 0; i < exponente; i++) {
        valor = valor ** muchasFlechas(base, exponente, amount - 1)
    }

    return valor;
}

muchasFlechas(2, 2, 1) // 16
muchasFlechas(2, 2, 2) // 1.157920892373162e+77
muchasFlechas(3, 3, 1) // 7625597484987
```

Bien, funciona como esperábamos, ahora llevémoslo más allá y obtengamos el valor de `3↑↑3`

```js
muchasFlechas(3, 3, 2) // Infinity
```

Mh... hemos llegado al límite de Javascript para el tipo `number`. Pero... había una propuesta para una nueva función `BigInt` que añadiría un nuevo tipo numérico para manejar números enteros grandes.

- https://github.com/tc39/proposal-bigint
- https://www.proposals.es/proposals/BigInt
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt

Si, y está listo para ser usado, solo necesitamos añadir `n` al final del número para hacerlo BigInt 🎉

```js
muchasFlechas(3n, 3n, 1) // 7625597484987n
muchasFlechas(3n, 3n, 2)

// Uncaught RangeError: Maximum BigInt size exceeded
//     at muchasFlechas (<anonymous>:8:19)
//     at <anonymous>:1:1
```

Vaya, ni BigInt puede manejar `3↑↑3`.

Pues hasta aquí llegamos, alcanzamos el límite de Javascript para cálculos de enteros 🤷

Si te preguntas que  tiene esto que ver con el número de Graham bueno es...

```js
let g = [4]

for (let i = 1; i <= 64; i++) {
    let capaAnterior = g[i - 1]
    g[i] = muchasFlechas(3, 3, capaAnterior)
}

const NUMERO_DE_GRAHAM = g[64]
```

O

```js
let g1 = muchasFlechas(3, 3, 4)
let g2 = muchasFlechas(3, 3, g1)
let g3 = muchasFlechas(3, 3, g2)
let g4 = muchasFlechas(3, 3, g3)
let g5 = muchasFlechas(3, 3, g4)
let g6 = muchasFlechas(3, 3, g5)
let g7 = muchasFlechas(3, 3, g6)
let g8 = muchasFlechas(3, 3, g7)
let g9 = muchasFlechas(3, 3, g8)
let g10 = muchasFlechas(3, 3, g9)
let g11 = muchasFlechas(3, 3, g10)
let g12 = muchasFlechas(3, 3, g11)
let g13 = muchasFlechas(3, 3, g12)
let g14 = muchasFlechas(3, 3, g13)
let g15 = muchasFlechas(3, 3, g14)
let g16 = muchasFlechas(3, 3, g15)
let g17 = muchasFlechas(3, 3, g16)
let g18 = muchasFlechas(3, 3, g17)
let g19 = muchasFlechas(3, 3, g18)
let g20 = muchasFlechas(3, 3, g19)
let g21 = muchasFlechas(3, 3, g20)
let g22 = muchasFlechas(3, 3, g21)
let g23 = muchasFlechas(3, 3, g22)
let g24 = muchasFlechas(3, 3, g23)
let g25 = muchasFlechas(3, 3, g24)
let g26 = muchasFlechas(3, 3, g25)
let g27 = muchasFlechas(3, 3, g26)
let g28 = muchasFlechas(3, 3, g27)
let g29 = muchasFlechas(3, 3, g28)
let g30 = muchasFlechas(3, 3, g29)
let g31 = muchasFlechas(3, 3, g30)
let g32 = muchasFlechas(3, 3, g31)
let g33 = muchasFlechas(3, 3, g32)
let g34 = muchasFlechas(3, 3, g33)
let g35 = muchasFlechas(3, 3, g34)
let g36 = muchasFlechas(3, 3, g35)
let g37 = muchasFlechas(3, 3, g36)
let g38 = muchasFlechas(3, 3, g37)
let g39 = muchasFlechas(3, 3, g38)
let g40 = muchasFlechas(3, 3, g39)
let g41 = muchasFlechas(3, 3, g40)
let g42 = muchasFlechas(3, 3, g41)
let g43 = muchasFlechas(3, 3, g42)
let g44 = muchasFlechas(3, 3, g43)
let g45 = muchasFlechas(3, 3, g44)
let g46 = muchasFlechas(3, 3, g45)
let g47 = muchasFlechas(3, 3, g46)
let g48 = muchasFlechas(3, 3, g47)
let g49 = muchasFlechas(3, 3, g48)
let g50 = muchasFlechas(3, 3, g49)
let g51 = muchasFlechas(3, 3, g50)
let g52 = muchasFlechas(3, 3, g51)
let g53 = muchasFlechas(3, 3, g52)
let g54 = muchasFlechas(3, 3, g53)
let g55 = muchasFlechas(3, 3, g54)
let g56 = muchasFlechas(3, 3, g55)
let g57 = muchasFlechas(3, 3, g56)
let g58 = muchasFlechas(3, 3, g57)
let g59 = muchasFlechas(3, 3, g58)
let g60 = muchasFlechas(3, 3, g59)
let g61 = muchasFlechas(3, 3, g60)
let g62 = muchasFlechas(3, 3, g61)
let g63 = muchasFlechas(3, 3, g62)

const NUMERO_DE_GRAHAM = muchasFlechas(3, 3, g63)
```

En casos como este la expresión "más que átomos en el universo" se queda corta.
