import './jlg-parallax.scss';

const app = angular.module('jlg-parallax', []);

app.value('jlgParallax', { secureMode: false});

app.component('jlgParallax', {
	bindings: {
		src: '@',
	},
	controller: function JLGParallaxCtrl($scope, $element, $q, $compile, $document, jlgParallax) {
		function loadImage(imageUrl) {
			return $q(function(resolve, reject) {
				angular.element('<img/>').attr('src', imageUrl).on('load', function() {
					angular.element(this).remove();
					resolve(imageUrl);
				});
			});

		}

		this.$onInit = () => {
			// we do not use template because we want to finely tune the image load.
			loadImage(this.src).then(() => {
				const html = `<img src="${this.src}">`;
				$element.html(html);
				this.img = $element.find('img');
				this.img[0].style.opacity = '0';
				$compile($element.contents())($scope);

				// On ios the rendering and painting are slow.
				// The image height cannot be obtained as expected.

				if (navigator.userAgent.match(/Safari/)) {
					setTimeout(() => {
						this.render();
					}, 20);
				} else {
					this.render();
				}
			});

		};

		this.render = () => {
			if (this.img === undefined) {
				return;
			}
			this.img[0].style.opacity = '1';
			const wh = window.innerHeight;
			const rect = $element[0].getBoundingClientRect();
			const top = rect.top;
			const h = $element[0].clientHeight;
			const H = this.img[0].clientHeight;

			// 2 cases: if the image is heigher than the window,
			// then we do a fix image centered.
			// else we do a moving image.
			let a, b;
			if (wh < H) {
				if (jlgParallax.secureMode) {
					// disable parallax and show the full image (because the iPhone shows saccades even with translate3d)
					a = 0;
					b = 0;
					$element[0].style.height = 'auto';
				} else {
					a = -1;
					b = -(H - wh) / 2;
				}
			} else {
				a = -(H - h) / (wh - h);
				b = 0;
			}
			const offset = a * top + b;
			const transform = `translateY(${offset}px)`;
			this.img[0].style.transform = transform;
			this.img[0].style.webkitTransform = transform;
		};

		window.document.addEventListener('touchmove', () => {
			this.render();
		});

		// for browsers
		window.document.addEventListener('scroll', () => {
			this.render();
		});
	}
});
