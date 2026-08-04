/**
 * Provides:
 *     Function extend(Function parent, Object config);
 *
 * It extends constructors with it's methods
 * Also provides to every method who overwrites another one
 *   with a this.base() method to invoke overwrote method.
 * This feature is based in Dean Edwards implementation:
 *   http://dean.edwards.name/weblog/2006/03/base/
 *
 * Created constructor has methods
 *    .extend(Object config)
 * and
 *    .inject(Object config)
 */

//jshint camelcase:false
/*globals module*/

(function(root, undefined) {
	'use strict';

	function empty() { }
	var has = Object.prototype.hasOwnProperty;

	var _ = Object.keys ? {
		each: function each_ECMA5(collection, callback) {
			Object.keys(collection).forEach(callback);
		},
		getOwn: function getOwn_ECMA5(target, prop) {
			return Object.getOwnPropertyDescriptor(target, prop);
		},
		get: function get_ECMA5(target, prop) {
			var descriptor;
			while (target) {
				descriptor = Object.getOwnPropertyDescriptor(target, prop);
				if (descriptor) return descriptor;
				target = Object.getPrototypeOf(target);
			}
		},
		set: function set_ECMA5(target, prop, descriptor) {
			Object.defineProperty(target, prop, descriptor);
		},
		wrap: function wrap_ECMA5(funct, base) {

			// HACK: Performance of the second function is NEFAST!
			if (extend.performanceHack) {
				return function() {
					var a = this.base;
					this.base = base.value;
					// If you are here and don't know what to do, debug into the next line
					var result = funct.apply(this, arguments);
					this.base = a;
					return result;
				};
			}

			base.configurable = true;

			return function() {
				var original = Object.getOwnPropertyDescriptor(this, 'base');
				Object.defineProperty(this, 'base', base);
				// If you are here and don't know what to do, debug into the next line
				var result = funct.apply(this, arguments);
				Object.defineProperty(this, 'base', original || empty);
				return result;
			};
		}
	} : {
		each: function each_FALLBACK(collection, callback) {
			for (var i in collection)
				if (has.call(collection, i))
					callback(i);
		},
		getOwn: function getOwn_FALLBACK(target, prop) {
			return has.call(target, prop) ? { value: target[prop] } : null;
		},
		get: function get_FALLBACK(target, prop) {
			return { value: target[prop] };
		},
		set: function set_FALLBACK(target, prop, descriptor) {
			if (descriptor)
				target[prop] = descriptor.value;
		},
		wrap: function wrap_FALLBACK(funct, base) {
			return function() {
				var a = this.base;
				this.base = base.value;
				// If you are here and don't know what to do, debug into the next line
				var result = funct.apply(this, arguments);
				this.base = a;
				return result;
			};
		}
	};

	/**
	 * Adds every item in config to obj
	 * If it's a function it will wrap it in order to have this.base();
	 *
	 * @param obj <Object> The object where the properties will be injected.
	 * @param config <JSON> The object with methdos to inject.
	 */
	function inject(target, props) {
		if (!props) return;

		_.each(props, function(prop) {
			var desc = _.getOwn(props, prop);
			var base = _.get(target, prop);

			if (desc && typeof desc.value === 'function' && base)
				desc.value = _.wrap(desc.value, base);

			_.set(target, prop, desc);
		});
	}

	function copy(target, source) {
		_.each(source, function(prop) {
			_.set(target, prop, _.getOwn(source, prop));
		});
	}

	/// Dummy, just for prototype
	function intermediate() { }

	/**
	 * Creates a new function who's prototype property extend <Parent>'s prototype property.
	 *
	 * @param Parent <Function> The constructor of the type to extend.
	 * @param config <JSON> Object with methods to add to the new type.
	 * @returns <Function> The constructor of the new type.
	 */
	function extend(Parent, config, statics) {
		config = config || {};

		// We create the constructor
		var ctor = has.call(config, 'constructor') &&
				typeof config.constructor === 'function' ?
				_.wrap(config.constructor, Parent) :
				function() { Parent.apply(this, arguments); };

		// Add basic static methods
		ctor.extend = function(desc, statics) {
			return extend(this, desc, statics);
		};
		ctor.inject = function(desc, statics) {
			inject(this.prototype, desc);
			inject(this, statics);
			return this;
		};

		// Copy parent's statics
		copy(ctor, Parent);
		inject(ctor, statics);

		// Extend parent prototype
		intermediate.prototype = Parent.prototype;
		ctor.prototype = new intermediate;

		// Apply new methods
		ctor.inject(config);
		// Fix constructor
		ctor.prototype.constructor = ctor;

		return ctor;
	}

	extend.performanceHack = false;

	if (typeof module !== 'undefined' && module.exports)
		module.exports = extend;
	else if (typeof define !== 'undefined' && define.amd)
		define(function() { return extend });
	else
		root.extend = extend;

})(this);
