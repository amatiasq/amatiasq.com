define(function(require) {
	'use strict';

	var Base = require('core/base');
	var Vector = require('core/vector');
	var Animation = require('asset/animation');

	var count = 0;
	return Base.extend({

		get width() {
			return this._width || (this.tile.tilesize ? this.tile.tilesize.x : this.tile.width);
		},
		set width(value) {
			this._width = value;
		},
		get height() {
			return this._height || (this.tile.tilesize ? this.tile.tilesize.y : this.tile.height);
		},
		set height(value) {
			this._height = value;
		},

		get tile() {
			return this._tile;
		},
		set tile(value) {
			if (typeof value === 'string')
				value = new Image(value);

			this._tile = value;
		},

		get animation() {
			return this._animation;
		},
		set animation(value) {
			if (typeof value === 'string')
				value = this.animations[value];

			this._animation = value;
		},

		init: function(input) {
			this.$id = count++;
			this._tile = null;
			this._animation = null;

			this.input = input;
			this.animations = {};
			this.offset = Vector(0, 0);
			//this.bounciness = 0;

			this.maxVel = Vector(100, 100);
			this.friction = Vector(0, 0);
			this.accel = Vector(0, 0);
			this.vel = Vector(0, 0);
			this.pos = Vector(0, 0);
		},

		dispose: function() {
			this.maxVel.dispose();
			this.friction.dispose();
			this.accel.dispose();
			this.vel.dispose();
			this.pos.dispose();
		},

		addAnimation: function(id, interval, animation) {
			this.animations[id] = new Animation(this.tile, interval, animation);
		},

		_nextPos: function(clock) {
			if (!this.accel.isZero) {
				var accel = this.accel.clone().multiply(clock.tick);
				this.vel.merge(accel);
				accel.dispose();
			} else {
				var friction = this.friction.clone().multiply(clock.tick);
				this.vel.toZero(friction);
				friction.dispose();
			}

			this.maxVel.negate();
			this.vel.min(this.maxVel);
			this.maxVel.negate();
			this.vel.max(this.maxVel);
			return this.pos.clone().merge(this.vel);
		},

		updateLocation: function(calc) {
			this.pos.x = calc.pos.x;
			this.pos.y = calc.pos.y;
		},

		step: function(clock, collisions) {
			var next = this._nextPos(clock);
			var calc = collisions.trace(this.pos.x, this.pos.y, this.width, this.height, next.x, next.y);
			this.updateLocation(calc);
			this.animation.step();
			calc.pos.dispose();
			next.dispose();
		},

		draw: function(context) {
			context.save();
			context.translate(this.pos.x - this.offset.x, this.pos.y - this.offset.y);
			this.animation.draw(context);
			context.restore();
		},

		debug: function() {
			console.log('Entity --[' + this.$id +
				'{ pos: ' + this.pos.round() +
				', vel: ' + this.vel.round() +
				', accel: ' + this.accel.round() + ' }');
		}
	});
});
