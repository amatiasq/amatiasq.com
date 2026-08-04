/*globals context*/

define(function(require) {
	'use strict';

	var Entity = require('game/entity');

	return Entity.extend({

		init: function(input) {
			this.base(input);
			this.direction = 'down';
			this.moving = false;
			this.target =

			input.bind(input.KEY.UP, 'up');
			input.bind(input.KEY.DOWN, 'down');
			input.bind(input.KEY.LEFT, 'left');
			input.bind(input.KEY.RIGHT, 'right');
		},

		updateLocation: function(calc) {
			if (!this.moving) return;

			if ((this.direction === 'up' || this.direction === 'down') && this.pos.y === calc.pos.y)
				this.moving = false;

			if ((this.direction === 'left' || this.direction === 'right') && this.pos.x === calc.pos.x)
				this.moving = false;

			var target;

			if (this.direction === 'up') {
				target = Math.floor(this.pos.y / this.height) * this.height;
				if (this.pos.y > target && calc.pos.y <= target) {
					calc.pos.y = target;
					this.moving = false;
				}
			}
			if (this.direction === 'down') {
				target = Math.ceil(this.pos.y / this.height) * this.height;
				if (this.pos.y < target && calc.pos.y >= target) {
					calc.pos.y = target;
					this.moving = false;
				}
			}
			if (this.direction === 'left') {
				target = Math.floor(this.pos.x / this.width) * this.width;
				if (this.pos.x > target && calc.pos.x <= target) {
					calc.pos.x = target;
					this.moving = false;
				}
			}
			if (this.direction === 'right') {
				target = Math.ceil(this.pos.x / this.width) * this.width;
				if (this.pos.x < target && calc.pos.x >= target) {
					calc.pos.x = target;
					this.moving = false;
				}
			}

			this.base(calc);
		},

		step: function(clock, collisions) {
			var keyVelocity = 100 * clock.tick;
			var direction;

			if (this.moving) {
				direction = this.direction;
			} else if (this.input.get('up')) {
				direction = 'up';
				this.moving = true;
				this.vel.set(0, -keyVelocity);
			} else if (this.input.get('down')) {
				direction = 'down';
				this.moving = true;
				this.vel.set(0, keyVelocity);
			} else if (this.input.get('left')) {
				direction = 'left';
				this.moving = true;
				this.vel.set(-keyVelocity, 0);
			} else if (this.input.get('right')) {
				direction = 'right';
				this.moving = true;
				this.vel.set(keyVelocity, 0);
			} else {
				this.vel.set(0, 0);
			}

			if (direction)
				this.animation = 'walk-' + direction;
			else if (this.direction)
				this.animation = 'stop-' + this.direction;

			if (this.color) {
				context.fillStyle = this.color;
				context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
			}

			this.direction = direction;
			this.base(clock, collisions);
		},

		draw: function(context) {
			context.save();
			context.translate(
				(context.canvas.width - this.width) / 2 - this.offset.x,
				(context.canvas.height - this.height) / 2 - this.offset.y
			);
			this.animation.draw(context);
			context.restore();
		}
	});
});
