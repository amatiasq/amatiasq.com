define(function(require) {
	'use strict';

	var Base = require('core/base');

	var Clock = Base.extend({

		get tick() {
			return this._tick;
		},

		init: function() {
			this.time = 0;
			this.framerate = 60;
			this._tick = 0;
			this.lastChange = 0;
		},

		add: function(seconds) {
			this.lastChange = Date.now();
			this._tick = seconds;
			this.time += seconds;
		},

		real: function() {
			return (Date.now() - this.lastChange) / 1000;
		}
	});

	return Clock;

});
