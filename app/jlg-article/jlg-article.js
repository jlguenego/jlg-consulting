import './jlg-article.scss';

const app = angular.module('jlg-article', []);

app.component('jlgArticleToc', {
	controller: function JLGArticleTocCtrl($scope, $element, $q, $compile, $document, jlgParallax) {

		function getParent(elt, name) {
			const parentElt = elt.parent();
			if (!parentElt[0]) {
				return undefined;
			}
			if (parentElt[0].localName === name) {
				return parentElt;
			}
			return getParent(parentElt, name);
		}

		function makeId(s) {
			return s.replace(/ /g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
		}

		this.$onInit = () => {
			const article = getParent($element, 'article');
			const h2List = article.find('h2');
			let lis = '';
			for (let i = 0; i < h2List.length; i++) {
				const h2 = h2List[i];
				// there is a bug with ui router when we want to modify the DOM of the article.
				// and may be a bug with a without href and angularjs.
				h2.id = makeId(h2.innerHTML);
				lis += `<li><a href="#${h2.id}">${h2.innerHTML}</a></li>`;
			}
			const html = `<ul>${lis}</ul>`;
			$element.html(html);
		};
	}
});
