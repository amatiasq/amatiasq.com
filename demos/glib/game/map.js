define(function(require) {
	'use strict';

	var Base = require('core/base');

	return Base.extend({

		init: function(tilesize, data) {
			this.tilesize = tilesize;
			this.data = data;

			this.height = data.length;
			this.width = data[0] ? data[0].length : 0;
		},

		getTile: function(x, y) {
			var row = Math.floor(y / this.tilesize);
			var col = Math.floor(x / this.tilesize);
			return this.data[row][col];
		},

		setTile: function(x, y, tile) {
			var row = Math.floor(y / this.tilesize);
			var col = Math.floor(x / this.tilesize);
			this.data[row][col] = tile;
		}
	});
});
