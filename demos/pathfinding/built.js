/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseVector {
        constructor(x, y) {
            this.x = round(x);
            this.y = round(y);
        }
        static fromRadians(radians) {
            return new this(Math.cos(radians), Math.sin(radians));
        }
        static fromDegrees(degrees) {
            return this.fromRadians(degreesToRadians(degrees));
        }
        static fromMagnitude(value) {
            return new this(value, 0);
        }
        static from(degrees, magnitude) {
            const vector = this.fromDegrees(degrees);
            return new this(vector.x * magnitude, vector.y * magnitude);
        }
        static merge(vectorA, vectorB, ...others) {
            let x = vectorA.x + vectorB.x;
            let y = vectorA.y + vectorB.y;
            if (others.length) {
                for (const vector of others) {
                    x += vector.x;
                    y += vector.y;
                }
            }
            return new this(x, y);
        }
        static diff(vectorA, vectorB, ...others) {
            let x = vectorA.x - vectorB.x;
            let y = vectorA.y - vectorB.y;
            if (others.length) {
                for (const vector of others) {
                    x -= vector.x;
                    y -= vector.y;
                }
            }
            return new this(x, y);
        }
        get isZero() {
            return this.x === 0 && this.y === 0;
        }
        get radians() {
            if (this.isZero)
                return 0;
            let arctan = Math.atan(this.y / this.x);
            if (arctan < 0)
                arctan += Math.PI;
            if (this.y < 0 || (this.y === 0 && this.x < 0))
                arctan += Math.PI;
            return arctan;
        }
        get degrees() {
            const degrees = (this.radians / Math.PI * 180) % 360;
            return degrees < 0 ? degrees + 360 : degrees;
        }
        get magnitude() {
            return this.isZero ? 0 : round(Math.sqrt(this.x * this.x + this.y * this.y));
        }
        toJSON() {
            return `{x:${this.x},y:${this.y}}`;
        }
        toString() {
            return `[Vector(${this.x},${this.y})]`;
        }
        add(x, y = x) {
            return this.set(this.x + x, this.y + y);
        }
        sustract(x, y = x) {
            return this.set(this.x - x, this.y - y);
        }
        multiply(x, y = x) {
            return this.set(this.x * x, this.y * y);
        }
        divide(x, y = x) {
            return this.set(this.x / x, this.y / y);
        }
        merge(other) {
            return this.set(this.x + other.x, this.y + other.y);
        }
        diff(other) {
            return this.set(this.x - other.x, this.y - other.y);
        }
        round() {
            return this.set(round(this.x), round(this.y));
        }
        abs() {
            return this.apply(Math.abs);
        }
        apply(operation) {
            return this.set(operation(this.x), operation(this.y));
        }
    }
    BaseVector.round = round;
    /*
     * This version of Vector is immutable, any method that requires a modification
     * of the properties will return a new Vector.
     * If you want mutability you can import { MutableVector } instead
     */
    class Vector extends BaseVector {
        set(x, y) {
            return new Vector(x, y);
        }
        toMutable() {
            return new MutableVector(this.x, this.y);
        }
    }
    Vector.ZERO = new Vector(0, 0);
    Vector.MAX = new Vector(Infinity, Infinity);
    exports.default = Vector;
    class MutableVector extends BaseVector {
        set radians(value) {
            const magnitude = this.magnitude;
            this.x = Math.cos(value) * magnitude;
            this.y = Math.sin(value) * magnitude;
        }
        set degrees(value) {
            this.radians = degreesToRadians(value);
        }
        set magnitude(value) {
            const prevMagnitude = this.magnitude;
            this.x = Math.cos(value) * prevMagnitude;
            this.y = Math.sin(value) * prevMagnitude;
        }
        set(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }
        clone() {
            return new MutableVector(this.x, this.y);
        }
        toImmutable() {
            return new Vector(this.x, this.y);
        }
    }
    exports.MutableVector = MutableVector;
    function degreesToRadians(degrees) {
        degrees = degrees % 360;
        if (degrees < 0)
            degrees += 360;
        return degrees * Math.PI / 180;
    }
    function round(value) {
        return Math.round(value * 100) / 100;
    }


    /***/ }),
    /* 1 */
    /***/ (function(module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    class Color {
        constructor(value) {
            this.value = value;
        }
        toString() {
            let value = this.value.toString(16);
            while (value.length < 6)
                value = '0' + value;
            return `#${value}`;
        }
    }
    Color.TILE = new Color(0x101010);
    Color.CLUSTER = [
        new Color(0x0000ff),
        new Color(0x0000ff),
        new Color(0xffff00),
        new Color(0xff00ff),
        new Color(0x00ffff),
    ];
    exports.Color = Color;
    var Side;
    (function (Side) {
        Side[Side["NORTH"] = 0] = "NORTH";
        Side[Side["SOUTH"] = 1] = "SOUTH";
        Side[Side["EAST"] = 2] = "EAST";
        Side[Side["WEST"] = 3] = "WEST";
        // UP,
        // DOWN,
    })(Side = exports.Side || (exports.Side = {}));


    /***/ }),
    /* 2 */
    /***/ (function(module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    function round(value) {
        return Math.round(value * 100) / 100;
    }
    exports.round = round;
    function drawSquare(ctx, x, y, size, { color = 'black', width = null, } = {}) {
        ctx.save();
        ctx.strokeStyle = color;
        if (width)
            ctx.lineWidth = width;
        ctx.strokeRect(x, y, size, size);
        ctx.restore();
    }
    exports.drawSquare = drawSquare;
    function fillSquare(ctx, x, y, size, { color = 'black' } = {}) {
        // ctx.save();
        ctx.fillStyle = color;
        ctx.fillRect(x, y, size, size);
        // ctx.restore();
    }
    exports.fillSquare = fillSquare;


    /***/ }),
    /* 3 */
    /***/ (function(module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TILE_SIZE = 10;
    exports.CLUSTER_SIZE = 5;
    exports.DIAGONAL_MOVEMENT_COST = Math.SQRT2;
    exports.CLOSER_MODIFIER = 0.1;
    // DEBUG CONSTANTS
    exports.PERF_ITERATIONS = 0;
    exports.RANDOM_PATH_INTERVAL = 500;
    exports.DRAW_GRID = true;
    exports.DRAW_CLUSTERS = true;
    exports.START_COLOR = 'white';
    exports.END_COLOR = 'white';
    exports.PATH_COLOR = 'yellow';
    exports.GRID_MULTIPLIER = 1;
    exports.LOG_AVERAGE = false;


    /***/ }),
    /* 4 */
    /***/ (function(module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];


    /***/ }),
    /* 5 */
    /***/ (function(module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    const utils_1 = __webpack_require__(2);
    class AStar {
        constructor(closerModifier) {
            this.pool = new AStarNodePool(closerModifier);
        }
        getCost(start, path) {
            let cost = 0;
            let prev = null;
            for (const step of path) {
                if (prev)
                    cost += prev.getCostTo(step);
                prev = step;
            }
            return utils_1.round(cost);
        }
        getPath(start, end, area) {
            if (start === end)
                return [end];
            /*
              const before = performance.now();
              const result = this.getPathInternal(start, end, area);
              const after = performance.now();
              AStar.log(after - before, result && result.length);
              return result;
            }

            private getPathInternal(start: T, end: T, area?: IArea): T[] {
            */
            const open = new Set();
            const closed = new Set();
            let current;
            open.add(this.pool.getNode(start));
            while (open.size) {
                current = this.getNext(open, closed);
                if (current.child === end)
                    return this.retrace(start, current);
                // if (current.tile.isEmpty && !this.hasRampBelow(current))
                //  continue;
                for (const [child, relation] of current.child.getNeighbors(area)) {
                    const neighbor = this.pool.getNode(child);
                    const movement = (current.pathCost || 0) + relation.cost;
                    if (child.isObstacle)
                        throw new Error('No obstacle tiles should make it to A* algorithm');
                    if (closed.has(neighbor))
                        continue;
                    if (movement < neighbor.pathCost || !open.has(neighbor)) {
                        neighbor.pathCost = movement;
                        neighbor.estimatedCost = child.estimateDistanceTo(end);
                        neighbor.parent = current;
                        if (!open.has(neighbor))
                            open.add(neighbor);
                    }
                    if (!open.has(neighbor))
                        neighbor.dispose();
                }
            }
            for (const node of closed)
                node.dispose();
        }
        /*
         * Helpers
         */
        getNext(open, closed) {
            let best = null;
            for (let item of open) {
                if (!best || (item.cost < best.cost || (item.cost === best.cost && item.cost < best.cost)))
                    best = item;
            }
            open.delete(best);
            closed.add(best);
            return best;
        }
        retrace(start, end) {
            const path = [];
            let current = end;
            while (current.child !== start) {
                path.push(current.child);
                current = current.parent;
            }
            return path.reverse();
        }
        static log(time, steps) {
            this.logs.push(time);
            const total = this.logs.reduce((sum, current) => sum + current);
            const average = total / this.logs.length;
            // console.log(`[A*] ${this.round(time)}ms for ${steps} steps (avg ${this.round(average)}ms)`);
        }
        static round(value) {
            return Math.round(value * 100) / 100;
        }
    }
    /*
     * PERFORMANCE
     */
    AStar.logs = [];
    exports.default = AStar;
    class AStarNode {
        constructor(_child, closerModifier) {
            this._child = _child;
            this.closerModifier = closerModifier;
            this._isDisposed = false;
        }
        get child() {
            this.checkDisposed();
            return this._child;
        }
        get cost() {
            this.checkDisposed();
            return this.pathCost + this.estimatedCost * this.closerModifier;
        }
        get isDisposed() {
            return this._isDisposed;
        }
        init() {
            this._isDisposed = false;
        }
        dispose() {
            this.pathCost = null;
            this.estimatedCost = null;
            this.parent = null;
            this._isDisposed = true;
        }
        checkDisposed() {
            if (this.isDisposed)
                throw new DisposedInstanceInvocationError(`Instance of ${this.constructor.name} is disposed!`);
        }
    }
    class AStarNodePool {
        constructor(closerModifier) {
            this.closerModifier = closerModifier;
            this.pool = new WeakMap();
            this.using = new Set();
        }
        get liveInstancesCount() {
            return this.using.size;
        }
        getNode(tile) {
            let instance;
            if (this.pool.has(tile))
                instance = this.pool.get(tile);
            else
                instance = new AStarNode(tile, this.closerModifier);
            this.pool.set(tile, instance);
            this.using.add(instance);
            instance.init();
            return instance;
        }
        dispose(node) {
            if (Array.isArray(node)) {
                node.forEach(entry => this.dispose(entry));
                return;
            }
            this.using.delete(node);
            node.dispose();
        }
    }
    class DisposedInstanceInvocationError extends Error {
    }


    /***/ }),
    /* 6 */
    /***/ (function(module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    const node_1 = __webpack_require__(11);
    const cluster_1 = __webpack_require__(9);
    const vector_1 = __webpack_require__(0);
    class Pathfinding {
        constructor(world, algorithm, clusterSize) {
            this.world = world;
            this.algorithm = algorithm;
            this.clusterSize = clusterSize;
            this.nodes = [];
            this.tempNodes = new WeakMap();
            if (clusterSize < 3)
                throw new Error('Cluster size has to be an integer bigger than 2');
            this.size = new vector_1.default(world.size.x / clusterSize, world.size.y / clusterSize);
            this.clusters = [];
            const areaSize = new vector_1.default(clusterSize, clusterSize);
            for (let j = 0; j < this.size.y; j++) {
                this.clusters[j] = [];
                for (let i = 0; i < this.size.x; i++) {
                    const range = world.getRange(areaSize.multiply(i, j), areaSize);
                    this.clusters[j][i] = new cluster_1.Cluster(world, algorithm, new vector_1.default(i, j), range);
                }
            }
            this.processConnections();
        }
        resolve(start, end) {
            if (start.isObstacle || end.isObstacle)
                return null;
            const startCluster = this.getClusterFor(start);
            if (startCluster === this.getClusterFor(end)) {
                return {
                    levels: [],
                    tiles: startCluster.resolve(start, end),
                };
            }
            const startNode = this.getTempNodeFor(start);
            const endNode = this.getTempNodeFor(end);
            const result = this.resolveInternal(startNode, endNode);
            startNode.disconnect();
            endNode.disconnect();
            return result;
        }
        resolveInternal(startNode, endNode) {
            const path = this.algorithm.getPath(startNode, endNode);
            if (!path)
                return null;
            const tiles = [];
            let prev = startNode;
            for (const step of path) {
                const between = this.fixBridges(last(tiles), this.getTilesBetween(prev, step));
                tiles.push(between);
                prev = step;
            }
            return {
                levels: [path],
                tiles: [].concat(...tiles),
            };
        }
        fixBridges(prev, current) {
            if (!prev)
                return current;
            const lastTile = last(prev);
            const firstTile = current[0];
            if (lastTile.isNeighbor(firstTile))
                return current;
            return [
                ...this.algorithm.getPath(lastTile, current[0]),
                ...current.slice(1),
            ];
        }
        getTilesBetween(start, end) {
            const { childA, childB } = start.getRelation(end);
            const isSorted = start.hasChild(childA);
            const startTile = isSorted ? childA : childB;
            const endTile = isSorted ? childB : childA;
            const cluster = this.getClusterFor(startTile);
            if (this.getClusterFor(endTile) !== cluster)
                throw new Error('Tiles are from different clusters');
            return cluster.resolve(startTile, endTile);
        }
        processConnections() {
            this.forEach(cluster => {
                for (const entrance of cluster.processEntrances()) {
                    const node = this.getNodeFor(entrance);
                    for (const [connection, path] of cluster.getConnections(entrance)) {
                        const connectionNode = this.getNodeFor(connection);
                        const relation = {
                            cost: this.algorithm.getCost(entrance, path),
                            childA: entrance,
                            childB: connection,
                        };
                        node.setNeighbor(connectionNode, relation);
                        connectionNode.setNeighbor(node, relation);
                    }
                }
            });
            /*
            this.nodes.map(node => {
              let message = '';

              for (let [ neighbor, relation ] of node.getNeighbors()) {
                message += `${node.id} - ${(neighbor as Node).id} = ${relation.cost}\n`;
              }

              console.log(message);
            });
            */
        }
        findNode(child) {
            return this.nodes.find(node => node.hasChild(child));
        }
        getNodeFor(child) {
            let node = this.findNode(child);
            if (!node) {
                node = new node_1.Node();
                node.addChild(child);
                this.nodes.push(node);
            }
            return node;
        }
        getTempNodeFor(child) {
            if (this.tempNodes.has(child))
                return this.tempNodes.get(child).reconnect();
            const cluster = this.getClusterFor(child);
            const node = new node_1.TemporalNode();
            node.addChild(child);
            for (const [connection, path] of cluster.getConnections(child)) {
                node.setNeighbor(this.getNodeFor(connection), {
                    cost: this.algorithm.getCost(child, path),
                    childA: child,
                    childB: connection,
                });
            }
            const overlappingNode = this.findNode(child);
            if (overlappingNode) {
                node.setNeighbor(overlappingNode, {
                    cost: 0,
                    childA: child,
                    childB: child,
                });
            }
            this.tempNodes.set(child, node);
            return node.reconnect();
        }
        getClusterFor(child) {
            const index = child.location
                .divide(this.clusterSize)
                .apply(Math.floor);
            return this.clusters[index.y][index.x];
        }
        forEach(iterator) {
            for (let row of this.clusters)
                for (let cluster of row)
                    iterator(cluster, this);
        }
    }
    exports.Pathfinding = Pathfinding;
    function last(list) {
        return list[list.length - 1];
    }


    /***/ }),
    /* 7 */
    /***/ (function(module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    const tile_1 = __webpack_require__(13);
    const area_1 = __webpack_require__(12);
    const vector_1 = __webpack_require__(0);
    class World extends area_1.Area {
        constructor(data, tileSize, diagonalMovementCost) {
            const grid = [];
            data.forEach((row, j) => {
                let tiles = grid[j] = [];
                row.forEach((value, i) => {
                    tiles[i] = new tile_1.default(new vector_1.default(i, j), tileSize, value, diagonalMovementCost);
                });
            });
            super(grid);
            this.tileSize = tileSize;
            this.forEach(tile => tile.setWorld(this));
        }
    }
    exports.World = World;


    /***/ }),
    /* 8 */
    /***/ (function(module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    const config_1 = __webpack_require__(1);
    const constants = __webpack_require__(3);
    const vector_1 = __webpack_require__(0);
    const map_data_1 = __webpack_require__(4);
    const a_star_1 = __webpack_require__(5);
    const pathfinding_1 = __webpack_require__(6);
    const utils_1 = __webpack_require__(2);
    const world_1 = __webpack_require__(7);
    console.log(JSON.stringify(constants, null, '  '));
    let world;
    let aStar;
    let pathfinding;
    let canvas;
    let ctx;
    let prevPath = null;
    const timeCost = [];
    init();
    const failure = [world.get(25, 0), world.get(56, 25)];
    const successful = [world.get(25, 2), world.get(33, 30)];
    if (constants.PERF_ITERATIONS)
        performanceTest(constants.PERF_ITERATIONS);
    frame();
    if (constants.RANDOM_PATH_INTERVAL)
        setInterval(randomPath, constants.RANDOM_PATH_INTERVAL);
    function init() {
        measure(() => {
            const data = constants.GRID_MULTIPLIER
                ? multiplyGrid(map_data_1.default, constants.GRID_MULTIPLIER)
                : map_data_1.default;
            world = new world_1.World(data, constants.TILE_SIZE, constants.DIAGONAL_MOVEMENT_COST);
            aStar = new a_star_1.default(constants.CLOSER_MODIFIER);
            pathfinding = new pathfinding_1.Pathfinding(world, aStar, constants.CLUSTER_SIZE);
        }, {
            message: 'INIT',
        });
        canvas = document.querySelector('canvas');
        ctx = canvas.getContext('2d');
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
        ctx.translate(constants.TILE_SIZE, constants.TILE_SIZE);
    }
    function frame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (constants.DRAW_CLUSTERS)
            drawClusters();
        world.forEach((tile) => tile.print(ctx, constants.DRAW_GRID));
        requestAnimationFrame(frame);
    }
    function drawClusters() {
        pathfinding.forEach((cluster, pathfinding) => {
            const depth = 0;
            const size = Math.pow(constants.CLUSTER_SIZE, (depth + 1)) * constants.TILE_SIZE;
            const coords = cluster.location.multiply(size);
            utils_1.drawSquare(ctx, coords.x, coords.y, size, {
                color: config_1.Color.CLUSTER[depth].toString(),
                width: (depth + 1) * 2,
            });
        });
    }
    function randomPath() {
        if (prevPath)
            prevPath.remove();
        let start, end;
        do {
            start = new vector_1.default(random(world.size.x), random(world.size.y));
        } while (world.get(start.x, start.y).isObstacle);
        do {
            end = new vector_1.default(random(world.size.x), random(world.size.y));
        } while (world.get(end.x, end.y).isObstacle);
        console.log(`drawPath(world.get(${start.x}, ${start.y}), world.get(${end.x}, ${end.y}))`);
        prevPath = drawPath(world.get(start.x, start.y), world.get(end.x, end.y));
    }
    function drawPath(from, to) {
        const { duration, result } = measure(() => pathfinding.resolve(from, to) || { tiles: [] }, {
            log: false,
        });
        for (const tile of result.tiles)
            tile.color = constants.PATH_COLOR;
        from.color = constants.START_COLOR;
        to.color = constants.END_COLOR;
        result.remove = () => {
            from.color = null;
            to.color = null;
            for (const tile of result.tiles)
                tile.color = null;
        };
        if (constants.LOG_AVERAGE) {
            timeCost.push(duration);
            const average = timeCost.reduce((prev, current) => prev + current) / timeCost.length;
            console.log('AVERAGE A*', average, result.tiles.length);
        }
        return result;
    }
    function performanceTest(repetitions) {
        const cases = {
            'successful non-hierarchical': () => {
                for (let i = 0; i < repetitions; i++)
                    aStar.getPath(successful[0], successful[1]);
            },
            'failure non-hierarchical': () => {
                for (let i = 0; i < repetitions; i++)
                    aStar.getPath(failure[0], failure[1]);
            },
            'successful hierarchical': () => {
                for (let i = 0; i < repetitions; i++)
                    pathfinding.resolve(successful[0], successful[1]);
            },
            'failure hierarchical': () => {
                for (let i = 0; i < repetitions; i++)
                    pathfinding.resolve(failure[0], failure[1]);
            },
        };
        for (const key of Object.keys(cases))
            measure(cases[key], { message: key });
    }
    function random(max = 1, min = 0) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    function measure(operation, { message = 'Operation', log = true } = {}) {
        const before = performance.now();
        const result = operation();
        const after = performance.now();
        const duration = after - before;
        if (log)
            console.log(`${message} = ${duration}ms`);
        return { duration, result };
    }
    function multiplyGrid(grid, multiplier) {
        if (multiplier === 0)
            return [];
        if (multiplier === 1)
            return grid;
        const result = [];
        grid.forEach((row, y) => {
            for (let i = 0; i < multiplier; i++)
                result[y * multiplier + i] = [];
            row.forEach((value, x) => {
                for (let i = 0; i < multiplier; i++)
                    for (let j = 0; j < multiplier; j++)
                        result[y * multiplier + i][x * multiplier + j] = value;
            });
        });
        return result;
    }


    /***/ }),
    /* 9 */
    /***/ (function(module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    const config_1 = __webpack_require__(1);
    class Cluster {
        constructor(world, algorithm, location, area) {
            this.world = world;
            this.algorithm = algorithm;
            this.location = location;
            this.area = area;
            this.paths = new WeakMap();
        }
        resolve(start, end) {
            if (this.paths.has(start) && this.paths.get(start).has(end))
                return this.paths.get(start).get(end);
            return this.algorithm.getPath(start, end, this.area);
        }
        processEntrances() {
            this.entrances = new Set([
                ...this.processSideEntrances(config_1.Side.NORTH),
                ...this.processSideEntrances(config_1.Side.SOUTH),
                ...this.processSideEntrances(config_1.Side.EAST),
                ...this.processSideEntrances(config_1.Side.WEST),
            ]);
            this.resolveEntrancesPaths();
            return this.getEntrances();
        }
        resolveEntrancesPaths() {
            const paths = this.paths = new WeakMap();
            for (const entrance of this.entrances)
                for (const other of this.entrances)
                    if (entrance !== other && (!paths.has(other) || !paths.get(other).has(entrance)))
                        this.addPathsToCache(entrance, other);
        }
        getEntrances() {
            return [...this.entrances];
        }
        getConnections(node) {
            if (!this.paths.has(node))
                for (const entrance of this.entrances)
                    this.addPathsToCache(node, entrance);
            return this.paths.get(node);
        }
        addPathsToCache(start, end) {
            const paths = this.paths;
            const path = this.resolve(start, end);
            if (!path)
                return;
            if (!paths.has(start))
                paths.set(start, new Map());
            if (!paths.has(end))
                paths.set(end, new Map());
            path.unshift(start);
            paths.get(start).set(end, path);
            paths.get(end).set(start, [...path].reverse());
            /*
            const color = COLORS[index++ % COLORS.length];

            for (const step of path)
              if (!step.color)
                step.color = color;
            */
        }
        processSideEntrances(direction) {
            const tiles = this.getSideTiles(direction);
            const entrances = [];
            for (const tile of tiles) {
                const neighbor = this.world.getNeighbor(tile, direction);
                if (neighbor && !tile.isObstacle && !neighbor.isObstacle)
                    entrances.push(tile);
            }
            return this.reduceEntrances(entrances, direction);
        }
        reduceEntrances(entrances, direction) {
            const result = [];
            for (const tile of entrances) {
                let neighborsCount = 0;
                for (const other of entrances) {
                    if (tile !== other && tile.isNeighbor(other))
                        neighborsCount++;
                }
                if (neighborsCount === 0 || neighborsCount === 1) {
                    // (tile as any).color = 'blue';
                    result.push(tile);
                }
            }
            return result;
        }
        getSideTiles(direction) {
            switch (direction) {
                // case Side.UP:
                // case Side.DOWN:
                //   return [].concat(...this.area);
                case config_1.Side.NORTH:
                    return this.area.getRow(0);
                case config_1.Side.SOUTH:
                    return this.area.getRow(-1);
                case config_1.Side.EAST:
                    return this.area.getCol(-1);
                case config_1.Side.WEST:
                    return this.area.getCol(0);
            }
            throw new Error(`Unknown side: [${direction}]`);
        }
    }
    exports.Cluster = Cluster;
    const COLORS = ['green', 'orange', 'gray', 'cyan', 'pink', 'purple'];


    /***/ }),
    /* 10 */
    /***/ (function(module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    class SubclassExpectedError extends Error {
    }
    exports.SubclassExpectedError = SubclassExpectedError;


    /***/ }),
    /* 11 */
    /***/ (function(module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    class Node {
        constructor() {
            this.children = new Set();
            this.neighbors = new Map();
            this.dirty = true;
            this.id = `${Node.idCounter++}`;
        }
        get location() {
            return this.sampleChild ? this.sampleChild.location : null;
        }
        get travelCost() {
            if (this.dirty) {
                // TODO: Consider using the highest travelCost instead of an average
                //       To improve what isObstacle means
                this._travelCost = average(this.children, 'travelCost');
            }
            return this._travelCost;
        }
        get isObstacle() {
            return this.travelCost === 1;
        }
        addChild(child) {
            this.dirty = true;
            this.children.add(child);
            this.sampleChild = child;
            // (child as any).color = 'brown';
            // (child as any).content = this.id;
        }
        hasChild(child) {
            if (this.children.has(child))
                return true;
            for (const entry of this.children) {
                if (entry.isNeighbor(child)) {
                    this.addChild(child);
                    return true;
                }
            }
            return false;
        }
        setNeighbor(node, relation) {
            const current = this.neighbors.get(node);
            if (!current || current.cost > relation.cost)
                this.neighbors.set(node, relation);
        }
        removeNeighbor(node) {
            this.neighbors.delete(node);
        }
        getNeighbors() {
            return this.neighbors;
        }
        getRelation(neighbor) {
            if (!this.isNeighbor(neighbor))
                throw new Error('Argument should be a neighbor');
            return this.neighbors.get(neighbor);
        }
        isNeighbor(node) {
            return this.neighbors.has(node);
        }
        getCostTo(neighbor) {
            return this.getRelation(neighbor).cost;
        }
        estimateDistanceTo(node) {
            return this.sampleChild.estimateDistanceTo(node.sampleChild);
        }
    }
    Node.idCounter = 0;
    exports.Node = Node;
    class TemporalNode extends Node {
        reconnect() {
            for (const [neighbor, relation] of this.getNeighbors())
                neighbor.setNeighbor(this, relation);
            return this;
        }
        disconnect() {
            for (const [neighbor, relation] of this.getNeighbors())
                neighbor.removeNeighbor(this);
        }
    }
    exports.TemporalNode = TemporalNode;
    function average(list, property) {
        let sum = 0;
        for (const entry of list)
            sum += entry[property];
        return sum / list.size;
    }


    /***/ }),
    /* 12 */
    /***/ (function(module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    const config_1 = __webpack_require__(1);
    const vector_1 = __webpack_require__(0);
    class Area {
        constructor(grid) {
            this.grid = grid;
            const firstRow = grid[0];
            const firstTile = grid[0][0];
            this.size = new vector_1.default(firstRow.length, grid.length);
            this.offset = firstTile.location;
        }
        get(x, y) {
            const entry = this.grid[y];
            return entry ? entry[x] : null;
        }
        getRow(y) {
            if (y < 0)
                y = this.size.y + y;
            return this.grid[y] || null;
        }
        getCol(x) {
            if (x < 0)
                x = this.size.x + x;
            if (x < 0 || x >= this.size.x)
                return null;
            return this.grid.map(row => row[x]);
        }
        getRange(point, size) {
            const result = [];
            for (let j = 0; j < size.y; j++) {
                result[j] = [];
                const row = this.grid[j + point.y];
                if (!row)
                    continue;
                for (let i = 0; i < size.x; i++) {
                    const tile = row[i + point.x];
                    if (!tile)
                        break;
                    result[j][i] = tile;
                }
            }
            return new Area(result);
        }
        getNeighbor(tile, direction) {
            const index = vector_1.default.diff(tile.location, this.offset);
            switch (direction) {
                // case Side.UP:
                // case Side.DOWN:
                case config_1.Side.NORTH:
                case config_1.Side.SOUTH:
                    return this.get(index.x, index.y + (direction === config_1.Side.NORTH ? -1 : +1));
                case config_1.Side.EAST:
                case config_1.Side.WEST:
                    return this.get(index.x + (direction === config_1.Side.WEST ? -1 : +1), index.y);
            }
        }
        getNeighbors(tile) {
            const index = vector_1.default.diff(tile.location, this.offset);
            const result = [];
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0)
                        continue;
                    const cell = this.get(index.x + j, index.y + i);
                    if (cell)
                        result.push(cell);
                }
            }
            return result;
        }
        forEach(iterator) {
            this.grid.forEach((row, i) => row.forEach((tile, j) => iterator(tile, j, i, this)));
        }
    }
    exports.Area = Area;


    /***/ }),
    /* 13 */
    /***/ (function(module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    const config_1 = __webpack_require__(1);
    const vector_1 = __webpack_require__(0);
    const errors_1 = __webpack_require__(10);
    const utils_1 = __webpack_require__(2);
    class Tile {
        constructor(location, size, _travelCost, diagonalMovementCost) {
            this.location = location;
            this.size = size;
            this._travelCost = _travelCost;
            this.diagonalMovementCost = diagonalMovementCost;
        }
        get isObstacle() {
            return this.travelCost === 1;
        }
        get travelCost() {
            return this._travelCost;
        }
        setWorld(world) {
            this.world = world;
        }
        getNeighbors(area = this.world) {
            const neighbors = area.getNeighbors(this);
            const result = new Map();
            for (const neighbor of neighbors)
                if (!neighbor.isObstacle || neighbor === this)
                    result.set(neighbor, {
                        cost: this.isAdjacent(neighbor) ? 1 : this.diagonalMovementCost,
                    });
            return result;
        }
        getCostTo(neighbor) {
            const tile = neighbor;
            if (this === neighbor)
                return 0;
            if (this.isAdjacent(tile))
                return 1;
            if (this.isDiagonal(tile))
                return this.diagonalMovementCost;
            debugger;
            throw new Error('Argument should be a neighbor');
        }
        estimateDistanceTo(tile) {
            const diff = vector_1.default.diff(this.location, tile.location).abs();
            const layerMovement = diff.x > diff.y
                ? this.diagonalMovementCost * 10 * diff.y + 10 * (diff.x - diff.y)
                : this.diagonalMovementCost * 10 * diff.x + 10 * (diff.y - diff.x);
            return utils_1.round(layerMovement); // + z * LAYER_CHANGE_COST;
        }
        isNeighbor(other) {
            if (!(other instanceof Tile))
                throw new errors_1.SubclassExpectedError(`Expected Tile but ${other.constructor.name} found`);
            return this.isAdjacent(other) || this.isDiagonal(other);
        }
        isAdjacent(other) {
            return vector_1.default.diff(this.location, other.location).magnitude === 1;
        }
        isDiagonal(other) {
            return (vector_1.default.diff(this.location, other.location).magnitude ===
                vector_1.default.round(Math.SQRT2));
        }
        print(ctx, drawGrid) {
            const x = this.location.x * this.size;
            const y = this.location.y * this.size;
            const obstacleColor = 'purple';
            if (drawGrid) {
                utils_1.drawSquare(ctx, x, y, this.size, {
                    color: this.isObstacle ? obstacleColor : config_1.Color.TILE.toString(),
                });
            }
            if (this.isObstacle) {
                ctx.fillStyle = obstacleColor;
                ctx.fillRect(x, y, this.size, this.size);
            }
            if (this.color) {
                ctx.fillStyle = this.color;
                ctx.fillRect(x, y, this.size, this.size);
            }
            if (this.content) {
                ctx.font = '14px Arial';
                ctx.textAlign = 'center';
                ctx.fillStyle = 'black';
                ctx.fillText(this.content, x + this.size / 2, y + this.size - 2);
            }
        }
        toString() {
            return `[Tile(${this.location.toJSON()})]`;
        }
    }
    exports.default = Tile;


    /***/ })
    /******/ ]);
    //# sourceMappingURL=built.js.map