//jshint -W040

define(function(require) {
	'use strict';

	var Base = require('core/base');

	var roundCache = {};
	function roundOperator(decimals) {
		if (!roundCache[decimals]) {
			var dec = isNaN(decimals) ? 2 : decimals;
			roundCache[decimals] = Math.pow(10, dec);
		}
		return roundCache[decimals];
	}

	function angleToRadians(angle) {
		angle = angle % 360;

		if (angle < 0)
			angle += 360;

		return angle * Math.PI / 180;
	}

	function radiansToAngle(radians) {
		var angle = radians / Math.PI * 180;

		while (angle < 0)
			angle += 360;

		return angle % 360;
	}

	var pool = [];

	var VectorProto = Base.extend({

		$type: 'vector',

		dispose: function() {
			pool.push(this);
			this.set(NaN, NaN);
		},

		//
		// Base methods
		//

		init: function(x, y) {
			this.x = x;
			this.y = y;
			return this;
		},

		set: function(x, y) {
			this.x = x;
			this.y = y;
			return this;
		},

		equals: function(target) {
			return this.x === target.x && this.y === target.y;
		},

		clone: function() {
			return Vector(this.x, this.y);
		},

		get isZero() {
			return this.x === 0 && this.y === 0;
		},


		//
		// Operator methods
		//

		round: function(decimals) {
			var operator = roundOperator(decimals);
			this.x = Math.round(this.x * operator) / operator;
			this.y = Math.round(this.y * operator) / operator;
			return this;
		},

		abs: function() {
			this.x = Math.abs(this.x);
			this.y = Math.abs(this.y);
			return this;
		},

		add: function(val) {
			this.x += val;
			this.y += val;
			return this;
		},

		multiply: function(val) {
			this.x *= val;
			this.y *= val;
			return this;
		},

		merge: function(vector) {
			this.x += vector.x;
			this.y += vector.y;
			return this;
		},

		sustract: function(vector) {
			this.x -= vector.x;
			this.y -= vector.y;
			return this;
		},

		diff: function(vector) {
			return Vector(this.x - vector.x, this.y - vector.y);
		},

		negate: function() {
			this.x = -this.x;
			this.y = -this.y;
			return this;
		},

		max: function(vector) {
			if (this.x > vector.x)
				this.x = vector.x;

			if (this.y > vector.y)
				this.y = vector.y;

			return this;
		},

		min: function(vector) {
			if (this.x < vector.x)
				this.x = vector.x;

			if (this.y < vector.y)
				this.y = vector.y;

			return this;
		},

		toZero: function(vector) {
			if (this.x !== 0) {
				if (Math.abs(this.x) < Math.abs(vector.x))
					this.x = 0;
				else if (this.x > 0)
					this.x -= vector.x;
				else if (this.x < 0)
					this.x += vector.x;
			}

			if (this.y !== 0) {
				if (Math.abs(this.y) < Math.abs(vector.y))
					this.y = 0;
				else if (this.y > 0)
					this.y -= vector.y;
				else if (this.y < 0)
					this.y += vector.y;
			}
		},


		//
		// Math methods
		//
		get hypotenuse() {
			if (this.isZero)
				return 0;
			return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2), 2);
		},

		get angle() {
			return radiansToAngle(this.radians);
		},

		set angle(value) {
			this.radians = angleToRadians(value);
		},

		get radians() {
			if (this.isZero)
				return 0;

			var arctan = Math.atan(this.y / this.x);

			if (arctan < 0)
				arctan += Math.PI;

			if (this.y < 0 || (this.y === 0 && this.x < 0))
				arctan += Math.PI;

			return arctan;
		},

		set radians(value) {
			// IT RESETS VECTOR HYPOTENUSE TO 1
			this.x = Math.cos(value);
			this.y = Math.sin(value);
		},

		toString: function() {
			return 'V{x:' + this.x + ',y:' + this.y + '}';
		}
	});

	function Vector(x, y) {
		x = x || 0;
		y = y || 0;

		if (this instanceof Vector)
			return this.init(x, y);

		if (pool.length)
			return pool.pop().set(x, y);

		return new Vector(x, y);
	}
	Vector.prototype = VectorProto.prototype;


	Vector.angleToRadians = angleToRadians;
	Vector.radiansToAngle = radiansToAngle;
	Vector.zero = Vector(0, 0);

	return Vector;

});
