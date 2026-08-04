define(function(require) {
	'use strict';

	var Vector = require('core/vector');
	var Map = require('game/map');

	function getX(item) { return item.x }
	function getY(item) { return item.y }
	function dispose(item) { item.dispose() }


	return Map.extend({
		fits: function(fromX, fromY) { //, toX, toY, width, height) {
			this.getTile(fromX, fromY);
		},

		trace: function(fromX, fromY, width, height, destX, destY) {
			var tilesize = this.tilesize;
			var areaX = Math.min(fromX, destX);
			var areaY = Math.min(fromY, destY);
			var areaEndX = Math.max(fromX, destX) + width;
			var areaEndY = Math.max(fromY, destY) + height;
			var tileStartX = Math.max(Math.floor(areaX / tilesize), 0);
			var tileStartY = Math.max(Math.floor(areaY / tilesize), 0);
			var tileEndX = Math.min(Math.floor((areaEndX - 0.01) / tilesize), this.width);
			var tileEndY = Math.min(Math.floor((areaEndY - 0.01) / tilesize), this.height);

			var tiles = [];
			var result = {
				pos: Vector(destX, destY),
				collisionX: false,
				collisionY: false
			};

			for (var i = tileStartY; i <= tileEndY; i++)
				for (var j = tileStartX; j <= tileEndX; j++)
					if (this.data[i][j])
						tiles.push(Vector(j, i));

			// If no tiles in the movement zone
			if (!tiles.length)
				return result;

			// If movement is only vertical
			if (fromX === destX) {
				result.collisionY = true;
				result.pos.y = fromY < destY ?
					Math.min.apply(null, tiles.map(getY)) * tilesize - height:
					Math.max.apply(null, tiles.map(getY)) * tilesize + tilesize;

				tiles.forEach(dispose);
				return result;
			}

			// If movement is only horizontal
			if (fromY === destY) {
				result.collisionX = true;
				result.pos.x = fromX < destX ?
					Math.min.apply(null, tiles.map(getX)) * tilesize - width:
					Math.max.apply(null, tiles.map(getX)) * tilesize + this.tilesize;

				tiles.forEach(dispose);
				return result;
			}

			// TODO: Diagonal movement collision
			return result;

			/*

	function createDesplacement(origin) {
		return function(x, y) {
			return Vector(
				x - origin.x * (y / origin.y),
				y - origin.y * (x / origin.x)
			);
		};
	}
	function hasSameSign(num1, num2) {
		return num1 * num2 > 0;
	}

	function closest(source, num1, num2) {
		var diff1 = Math.abs(source - num1);
		var diff2 = Math.abs(source - num2);
		return diff1 < diff2 || diff1 === diff2;
	}


			// Otherwise we have to perform heavy diagonal collision detection
			// to know if the tiles in the area are actually on the way

			var axis = Vector(destY - fromX, destX - fromY);
			var desplacement = createDesplacement(axis);
			var center = Vector(areaX + (areaEndX - areaX) / 2, areaY + (areaEndY - areaY) / 2);
			var halfSize = Vector(width / 2, height / 2);
			var lateral1, lateral2;

			if (hasSameSign(axis.x, axis.y)) {
				lateral1 = desplacement(center.x - halfSize.x, center.y - halfSize.y);
				lateral2 = desplacement(center.x + halfSize.x, center.y + halfSize.y);
			} else {
				lateral1 = desplacement(center.x - halfSize.x, center.y + halfSize.y);
				lateral2 = desplacement(center.x + halfSize.x, center.y - halfSize.y);
			}

			var despMin = Math.min(lateral1.y, lateral2.y);
			var despMax = Math.max(lateral1.y, lateral2.y);
			var startCenter = Vector(fromX + halfSize.x, fromY + halfSize.y);
			var startEnd = Vector(fromX + width, fromY + height);

			console.log('NEW ONE')

			var collides = tiles.map(function(tile) {
				var pos = tile.multiply(tilesize);
				var end = pos.clone().add(tilesize);

				var vertices = [
					pos,
					Vector(pos.x, end.y),
					Vector(end.y, pos.x),
					end
				];

				// If all vertices are out of our figure limits and on the same side there is no collision.
				var verticesDesp = vertices.map(function(vertex) { return desplacement(vertex.x, vertex.y).y });
				if (verticesDesp.every(function(value) { return value < despMin }) ||
					verticesDesp.every(function(value) { return value > despMax }))
					return false;

				var center = pos.clone().add(tilesize / 2);
				var from = Vector(
					closest(center.x, fromX, startEnd.x) ? fromX : startEnd.x,
					closest(center.y, fromY, startEnd.y) ? fromY : startEnd.y
				);
				var to = Vector(
					closest(startCenter.x, end.x, pos.x) ? end.x : pos.x,
					closest(startCenter.y, end.y, pos.y) ? end.y : pos.y
				);
				var size = to.diff(from);

				console.log(fromX, fromY, destX, destY);
				console.log(from.toString(), to.toString());
				console.log(size.round(2).toString());
				console.log(size.abs().toString());

				if (size.x < size.y) {
					return Vector(size.x, Infinity);
				} else if (size.x > size.y) {
					return Vector(Infinity, size.y);
				} else {
					console.log('PERFECT!');
					return Vector(0, 0);
				}
			}).filter(Boolean);

			if (collides.length) {
				var movement = collides.reduce(function(max, mov) {
					if (Math.abs(mov.x) < Math.abs(max.x)) max.x = mov.x;
					if (Math.abs(mov.y) < Math.abs(max.y)) max.y = mov.y;
					return max
				}, Vector(Infinity, Infinity));

				if (movement.x !== Infinity) {
					result.collisionX = true;
					result.pos.x = fromX + movement.x;
				}

				if (movement.y !== Infinity) {
					result.collisionY = true;
					result.pos.y = fromY + movement.y;
				}
			}

			return result;
			*/
		}
	});
});
