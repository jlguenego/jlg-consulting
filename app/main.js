import './css/reset.scss';
import './css/layout.scss';
import './css/module.scss';
import './css/theme.scss';

import './jlg-earth/jlg-earth.js';
import './jlg-menu/jlg-menu.js';
import './jlg-translate/jlg-translate.js';
import './jlg-parallax/jlg-parallax.js';
import './jlg-article/jlg-article.js';

const app = angular.module('main', [
	'jlg-route', 'jlg-earth', 'jlg-menu', 'jlg-bubble', 'jlg-translate', 'jlg-parallax', 'jlg-article'
]);

app.run(($rootScope) => {

	$rootScope.bubble = {
		clients: {
			density: 100,
			radius: 1,
			colors: ['purple'],
			opacity: 0.05,
			height: 12400,
		},
		ux: {
			density: 100,
			radius: 1,
			colors: ['red'],
			opacity: 0.05,
			height: 12400,
		},
		web: {
			density: 100,
			radius: 1,
			colors: ['green'],
			opacity: 0.05,
			height: 12400,
		},
		contact: {
			density: 100,
			radius: 1,
			colors: ['blue'],
			opacity: 0.05,
			height: 12400,
		}
	};
});

app.run(($transitions) => {
	$transitions.onSuccess({}, function(transition) {
		angular.element(document.body).removeClass(transition.from().name);
		angular.element(document.body).addClass(transition.to().name);
	});
});

app.run((jlgParallax) => {
	// you will set this according the smartphone that shows saccades...
	jlgParallax.secureMode = false;
});
