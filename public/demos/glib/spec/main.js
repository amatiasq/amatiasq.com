requirejs.config({ baseUrl: '../' })([

	'test/game/entity.spec',

], function() {
	'use strict';
	mocha.run();
});
