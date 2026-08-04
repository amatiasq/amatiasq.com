define(function(require) {
	'use strict';

	var Base = require('core/base');
	var mainLoader = require('tools/loader').instance;

	var Image = Base.extend({

		get loaded() {
			return this.data.complete;
		},
		get width() {
			return this._crop ? this._width : this.data.width;
		},
		get height() {
			return this._crop ? this._height : this.data.height;
		},

		init: function(source) {
			this.path = source;
			this.data = mainLoader.addImage(source);

			this._flipX = false;
			this._flipY = false;
			this._crop = false;

			this._x = 0;
			this._y = 0;
			this._width = null;
			this._height = null;
		},

		flipX: function() {
			this._flipX = !this._flipX;
			return this;
		},
		flipY: function() {
			this._flipY = !this._flipY;
			return this;
		},

		crop: function(x, y, width, height) {
			return this._cropInto(new Image(this.path), x, y, width, height);
		},

		_cropInto: function(child, x, y, width, height) {
			child._crop = true;
			child._x = this._x + x || 0;
			child._y = this._y + y || 0;
			child._width = width || null;
			child._height = height || null;
			return child;
		},

		_calcSize: function() {
			if (this._crop) {
				if (!this._width)  this._width  = this.data.width -  this._x;
				if (!this._height) this._height = this.data.height - this._y;
			}
		},

		draw: function(context) {
			this._calcSize();
			context.save();

			if (this._flipX || this._flipY) {
				context.translate(this._flipX ? this.width : 0, this._flipY ? this.height : 0);
				context.scale(this._flipX ? -1 : 1, this._flipY ? -1 : 1);
			}

			if (!this._crop)
				context.drawImage(this.data, 0, 0, this.width, this.height);
			else
				context.drawImage(this.data, this._x, this._y, this._width, this._height,
					0, 0, this._width, this._height);

			context.restore();
		}
	});

	return Image;
});
