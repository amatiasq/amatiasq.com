define(function(require) {
	'use strict';

	var extend = require('core/extend');

	return extend(Object, {

		constructor: function() {
			if (this.$factory) {
				var value = this.$factory;
				if (value) return value;
			}

			this.init.apply(this, arguments);
		},

		init: function() { },
		dispose: function() { },
	});

});
