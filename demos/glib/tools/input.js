define(function(require) {
	'use strict';

	var Base = require('core/base');


	function mouse() {

	}

	function key(code) {
		return function(signals, el, signal) {
			el.addEventListener('keydown', function(event) {
				if (event.which === code) signals[signal] = true;
			}, true);
			el.addEventListener('keyup', function(event) {
				if (event.which === code) signals[signal] = false;
			}, true);
		};
	}


	return Base.extend({

		init: function(element) {
			this.signals = {};
			this.$el = element || document.body;
		},

		bind: function(type, signal) {
			type(this.signals, this.$el, signal);
		},

		get: function(signal) {
			return !!this.signals[signal];
		},

		KEY: {
			MOUSE1: mouse('MOUSE1'),
			MOUSE2: mouse('MOUSE2'),
			MWHEEL_UP: mouse('MWHEEL_UP'),
			MWHEEL_DOWN: mouse('MWHEEL_DOWN'),

			0: key(48),
			1: key(49),
			2: key(50),
			3: key(51),
			4: key(52),
			5: key(53),
			6: key(54),
			7: key(55),
			8: key(56),
			9: key(57),
			A: key(65),
			B: key(66),
			C: key(67),
			D: key(68),
			E: key(69),
			F: key(70),
			G: key(71),
			H: key(72),
			I: key(73),
			J: key(74),
			K: key(75),
			L: key(76),
			M: key(77),
			N: key(78),
			O: key(79),
			P: key(80),
			Q: key(81),
			R: key(82),
			S: key(83),
			T: key(84),
			U: key(85),
			V: key(86),
			W: key(87),
			X: key(88),
			Y: key(89),
			Z: key(90),

			LEFT: key(37),
			UP: key(38),
			RIGHT: key(39),
			DOWN: key(40),
			ENTER: key(13),
			SPACE: key(32),
			ESC: key(27),
			TAB: key(9),
			SHIFT: key(16),
			CTRL: key(17),
			COMMAND: key(91),
			ALT: key(18),
			BACKSPACE: key(8),
			PAUSE: key('PAUSE'),
			CAPS: key(20),
			PAGE_UP: key('PAGE_UP'),
			PAGE_DOWN: key('PAGE_DOWN'),
			END: key('END'),
			HOME: key('HOME'),
			INSERT: key('INSERT'),
			DELETE: key('DELETE'),
			F1: key(112),
			F2: key(113),
			F3: key(114),
			F4: key(115),
			F5: key(116),
			F6: key(117),
			F7: key(118),
			F8: key(119),
			F9: key('F9'),
			F10: key('F10'),
			F11: key('F11'),
			F12: key('F12'),
			NUMPAD_0: key('NUMPAD_0'),
			NUMPAD_1: key('NUMPAD_1'),
			NUMPAD_2: key('NUMPAD_2'),
			NUMPAD_3: key('NUMPAD_3'),
			NUMPAD_4: key('NUMPAD_4'),
			NUMPAD_5: key('NUMPAD_5'),
			NUMPAD_6: key('NUMPAD_6'),
			NUMPAD_7: key('NUMPAD_7'),
			NUMPAD_8: key('NUMPAD_8'),
			NUMPAD_9: key('NUMPAD_9'),
			MULTIPLY: key(221),
			ADD: key('ADD'),
			SUBSTRACT: key('SUBSTRACT'),
			DECIMAL: key('DECIMAL'),
			DIVIDE: key(191),
			PLUS: key(187),
			COMMA: key(188),
			MINUS: key(189),
			PERIOD: key(190),
		}
	});
});
