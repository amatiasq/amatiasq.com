define(function(require) {
	'use strict';

	var Vector = require('core/vector');
	var Image = require('asset/image');

	// var Sprite = CocaCola.extend({ transparent: true });

	var Sprite = Image.extend({

		init: function(source, tileWidth, tileHeight, gapX, gapY) {
			this.base(source);
			this._tileCache = {};
			this.tilesize = Vector(tileWidth, tileHeight);
			this.gap = Vector(gapX || 0, gapY || gapX || 0);
			this.square = this.tilesize.clone().merge(this.gap);
		},

		dispose: function() {
			this.tilesize.dispose();
			this.gap.dispose();
			this.square.dispose();
		},

		crop: function(x, y, width, height) {
			return this._cropInto(
				new Sprite(this.path, this.tilesize.x, this.tilesize.y, this.gap.x, this.gap.y),
				x, y, width, height);
		},

		_createTile: function(tile) {
			var coords = this._tileCoords(Math.abs(tile));
			var img = new Image(this.path)
				.crop(this._x + coords.x, this._y + coords.y, this.tilesize.x, this.tilesize.y);
			coords.dispose();
			return img;
		},

		_tileCoords: function(tile) {
			if (!this.loaded) throw new Error('Image ' + this.path + ' is not loaded yet');

			this._calcSize();
			if (!this.tilesPerRow)
				this.tilesPerRow = Math.floor((this.width + this.gap.x) / this.square.x);

			tile--;
			var row = Math.floor(tile / this.tilesPerRow);
			var col = tile % this.tilesPerRow;
			return Vector(col * this.square.x, row * this.square.y);
		},

		draw: function(context, tile) {
			if (!tile) {
				console.warn('Printing whole sprite');
				return this.base(context);
			}

			if (!this._tileCache[tile]) {
				var img = this._createTile(tile);
				if (tile < 0) img.flipX();
				this._tileCache[tile] = img;
			}

			this._tileCache[tile].draw(context);
		}
	});

	return Sprite;
});
