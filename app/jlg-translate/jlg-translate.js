import './jlg-translate.scss';

const app = angular.module('jlg-translate', []);

app.component('jlgTranslate', {
	controller: function JLGTranslateCtrl($scope, $element, $attrs, $compile, jlgTranslate) {
		this.jlgTranslate = jlgTranslate;

		$scope.$watch('$ctrl.jlgTranslate.current', () => {
			let html = '';
			for (let lang in jlgTranslate.languages) {
				const active = (lang === jlgTranslate.current) ? ' class="active" ' : '';
				html += `<item ${active} ng-click="$ctrl.update('${lang}')"><div>
				<span class="flag-icon flag-icon-${jlgTranslate.languages[lang]}"></span></div>
				</item>`;
			}
			$element.html(html);
			$compile($element.contents())($scope);
		});

		this.update = (newLang) => {
			// jlgTranslate.current = newLang;/
			const regex = new RegExp(`^(.*)/${jlgTranslate.current}/(.*)$`);
			const newUrl = window.location.href.replace(regex, `$1/${newLang}/$2`);
			window.location = newUrl;
		};


	}
});

app.service('jlgTranslate', function Language() {
	this.languages = {
		fr: 'fr',
		en: 'gb',
	};
	this.current = document.baseURI.replace(/^.*\/(..)\/$/, '$1');
});
