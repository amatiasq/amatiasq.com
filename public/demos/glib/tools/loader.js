define(function(require) {
	'use strict';

	var Base = require('core/base');

	var Loader = Base.extend({

		init: function() {
			this.loaded = true;
			this.images = [];
			this._callbacks = [];
		},

		addImage: function(url) {
			if (Loader.cache[url])
				return Loader.cache[url];

			var el = new Image();
			el.src = url;
			Loader.cache[url] = el;
			this.images.push(el);
			this.loaded = false;

			this.run();
			return el;
		},

		run: function() {
			var end = function() {
				this.loaded = true;
				this._callbacks.forEach(function(a) { a() });
				this._callbacks = [];
			}.bind(this);

			var loaded = [];
			this.images.filter(function(element) {
				return !element.complete;
			}).forEach(function(element, index) {
				loaded[index] = false;
				element.onload = function() {
					console.log('received');
					loaded[index] = true;
					if (loaded.every(Boolean)) end();
				};
			});

			if (!loaded.length)
				end();
		},

		onLoad: function(listener) {
			if (typeof listener !== 'function')
				return;

			if (this.loaded)
				setTimeout(listener, 0);
			else
				this._callbacks.push(listener);
		}

	}, {

		cache: {},

		get instance() {
			if (!this._instance)
				this._instance = new this();

			return this._instance;
		}

	});

	return Loader;

});
