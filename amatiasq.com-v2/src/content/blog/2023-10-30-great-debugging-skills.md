---
title: Great debugging skills
---

Combining a broad curiosity with two decades coding blessed me with a good smell to bug-catching, I'm planning to add "Great debugging skills" to my CV but just adding a sentence there doesn't feel right. A paragraph trying to summary

Let's get clear, this is the difficult part of coding. Everything works nicely until the code does something you don't expect and worse, don't want.

And I have the exact story to exemplify that... this was 2009.

## Background

I joined a team that was re-building a huge remote control web application (via applet), this is the high point of `jQuery`, which I managed to avoid for is, in my opinion awful, practice of hiding errors.

There had been already an attempt to rewrite the app using `jQuery` but that needed 10+ seconds to open a modal. I heard the amount of methods in the return value of the `jQuery()` made each invocation expensive. That meant `$()` was also expensive since it was just an alias.

## Second v2.0

I then joined a team whose aim was to rewrite it a second time with the following pattern:

```js
function Form(url) {
    // private field
    var fields = [];
    // public field
    this.el = document.createElement('form');

    // private methods
    function validateFields() {
        // do something with fields
        // remember .map() .filter() .aggregate() etc. don't exist
    }

    // public method
    //
    // we had to duplicate the name so the callstack wasn't
    //      error in 'anonymous' function
    // I begged for years for automatically-named arrow functions
    // they weren't
    this.addField = function addField(field) {
        // semicolons were required
        // sometimes we just forgot
        // and no tooling fixed it for JS
        fields.push(field)
    }

    this.el.addEventListener('submit', function(event) {
        event.preventDefault();
        validateFields();
        // submit();
    });
}

var form = new Form("");
document.body.appendChild(form.el);
```

I was amazed Javascript could allow you to do something like this, it was _classy_, but wondered if the functions were re-created on each invocation. With time we started noticing memory issues and started researching it. Everything was as any other coding experience until I met my mentor @raul.

## Third v2.0

He had started a different re-writing of the application, a third Version 2.0 made from scratch with the following pattern:

```js
function Form(action) {
    // private field, just convention
    this._fields = [];
    // public field
    this.action = action;
}
Form.prototype.addField = function addField(field) {
    // ahh simpler times
    this.field.push(field)
};

var form = new Form("")
```

This is where I learnt about the protype inheritance and understood that the function `addField` is a single one, shared across all instances which magically are injected on invocation via **THE LAST DOT RULE**.

## The last dot rule

This is a simple explanation of what is `this` inside a function.
Skip to the end to continue the story.

> Look at where line where the function is invoked. Whatever is before the last dot, right before the function name, that will be `this` inside that function, and only for that invocation.

```js
// in global scope `this` is the window object
this

// call addEventListener and pass window as `this`
window.addEventLister();

// call function appendChild with document.body as `this`
document.body.appendChild()

function whatIsThis() {
    // this can be window, or anything before the dot
    return this;
}

// whatIsThis is invoked with no `this`
// so the one from the global scope is passed
// global scope is implicit before the last dot
whatIsThis() === window;

// because every global variable belongs to the global scope
window.whatIsThis() === window

var container = { whatIsThis: whatIsThis };
container.whatIsThis() === container;

document.body.whatIsThis = whatIsThis;
document.body.whatIsThis() === document.body;

// What is `this` in a function?
// WHATEVER IS BEFORE THE LAST DOT!
```

This rule allows javascript to reuse the same functions on different instances. The first snippet where the functions were closures with access to the constructor internals had to be a different function for each instance of the "class".

## The big refactor

Over several months and with the help of @oriol, we rewrote the whole application and I saw the internals of an infinite table running on Internet Explorer 6 written in ECMAScript 3. It rendered millions of rows dynamically loading redering only as many rows as fitted vertically on the screen + 3 for buffer simulating a virtually infinite scroll without droping a single FPS.

At a given point there was this bug that gathered a mass of developers in front of a single screen. "The issue is in this class" one of them repeated showing one of the files we autored.

## The bug

Let me try to reproduce it from memory, I'll make it up as `Rectangle` but it was actually some abstract internal gear of the system.

```js
function Rectangle(paramA, paramB, paramC) {
    alert(paramA)
    prompt(paramB)
    console.log(paramC)
    this.el = ce('div');
    this.someField = '';
}
Rectangle.prototype.enabled = true;
Rectangle.prototype.sides = 4;
Rectangle.prototype.anchor = 'center';
Rectangle.prototype.styles = { color: 'red', borderColor: 'blue' }
Rectangle.prototype.iAmAMethod = function iAmAMethod() {
    this.someField = 'potato';
};
```

Did you spot it? The styles approach was quite comon, every component with UI had it, but after spending a few hours investigating the issue a light bulb turned on in my head and I ran to my computer to isolate the bug.

Setting fields in the prototype wasn't rare, I preferred to separate methods and fields by keeping the latter in the constructor but it was common to find simple ones. But this `styles` one... reminded me of those pointers that I read in a C++ book when I was just grabbing any programming book to see what to learn.

## Pointers in Javascript

Pointers are a special type of variable, it contains a numbe but we don't use it as a number. We use it as an address to a different position in memory.

```c
int myInt = 1;
// ⬇ create an int pointer...
int* myPointerToInt = &myInt;
//                    ⬆ ...that points to the address of this int
```

In Javascript we can assume every single variable is a pointer. So when we say `document.body.querySelector()` we mean

```js
// read the object that `document` points to
const a = document;
// and get copy it's `body` pointer
const b = a.body;
// from the object that `body` points to, get the `querySelector` pointer
const c = b.querySelector;
// and invoke that function
// but pass `document.body` as `this`
// and ".button" as first argument
c.call(document.body, '.button')
```

What can be even more difficult to see is what happens when we _set_ a pointer and when we modify what it points to.

```js
// a points to String(potato)
let a = 'potato';
// now we change the pointer, a points to a different address
a = 'other-potato'

// we create an object, b points to it
const b = { a };
// c points to the same object as b
const c = b;
// we modify the object's a property;
b.a = null;
// which is the same object c points to
console.log(c.a); // prints null
```

## The solution

And that was exactly what happened with that class, the `styles` property was a property of the _prototype_, so whenever an instance modified it

```js
const a = new Rectangle();
const b = new Rectangle();

console.log(b.styles.color) // red

// we're changing the object `styles` points to
// `styles` is a pointer that lives in the prototype object
// so all instances point to the same address in memory
// changing the object in one will change it for all
a.styles.color = 'purple'

console.log(b.styles.color) // purple
```

That doesn't happen if we move `styles` to the constructor because it's invoked once per instance and each instance will get it's own styles object with it's own, different, pointer.

For when I confirmed that was the issue my teammates were already gone and our Version Control System didn't allow us to edit a file while another person had it open. Yep, that's how it was. So the next day I let my team know of the findings and we promptly moved `styles` to the constructor which solved the issue.


```js
function Rectangle(paramA, paramB, paramC) {
    // this is a different object for each instance
    this.styles = { color: 'red', borderColor: 'blue' };
}
Rectangle.prototype.enabled = true;
Rectangle.prototype.sides = 4;
Rectangle.prototype.anchor = 'center';
```

issues because when we changed them we _changed the pointer_, not the properties of the object they point to.

```js
const a = new Rectangle();
// we find the object the pointer `a` points to
// and change it's `enabled` property
// IT DOESN'T HAVE ONE
// reading `enabled` before this line will not find it
// so JS will check if the prototype has it, and return that
// setting it here creates the property `enabled` at the moment
// in the object `a` points to
a.enabled = false
```

We stopped defining "class fields" in the prototype for hygene but never spent the time to remove them all.

## Pride

I was proud of myself at the time, this was among my firsts chances as a programmer and being able to see something my whole team was looking for granted me the confidence to follow my intuition when debugging, and it has come quite handy.

Look at the stars.
