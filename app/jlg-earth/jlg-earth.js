import './jlg-earth.scss';
import { stars } from './jlg-stars.js';

const app = angular.module('jlg-earth', []);

let isEarthLoaded = false;
let i = 0;

app.component('jlgEarth', {
	template: '<stars></stars><earth></earth>',
	controller: function JLGEarth($element) {

		let stop = false;

		if (isEarthLoaded) {
			$element.addClass('fade-in');
		} else {
			$element.addClass('transition');
		}

		var onresizing = false;

		var elt = $element.find('earth')[0];
		var starsElt = $element.find('stars')[0];

		stars.init(starsElt);

		var scene = new THREE.Scene();

		var renderer;
		var camera;


		function init(elt) {
			renderer = new THREE.WebGLRenderer({ alpha: true });
			// transparent background
			renderer.setClearColor(0x000000, 0);
			// the size of the renderer
			renderer.setSize(elt.clientWidth, elt.clientHeight);
			elt.innerHTML = '';
			elt.appendChild(renderer.domElement);

			if (camera) {
				scene.remove(camera);
			}
			camera = new THREE.PerspectiveCamera(50,
				elt.clientWidth / elt.clientHeight * 0.8, 1, 10000);
			camera.position.set(0, 300, 400);
			scene.add(camera);
		}

		// Load the big earth image.
		var loader = new THREE.TextureLoader();
		setTimeout(() => {
			loader.load('../img/earth3.jpg', function(texture) {
				isEarthLoaded = true;

				$element.addClass('earth-loaded');

				init(elt);
				// AMBIENT LIGHT
				var ambientLight = new THREE.AmbientLight(0x444444, 0.7); // soft white light
				scene.add(ambientLight);

				// THE EARTH
				var geometry = new THREE.SphereGeometry(300, 64, 64);
				var material = new THREE.MeshLambertMaterial({
					map: texture
				});
				var sphere = new THREE.Mesh(geometry, material);
				scene.add(sphere);

				// THE SUN (very far from the earth, so direction light)
				var lumiere = new THREE.DirectionalLight(0xffffff, 1);
				lumiere.position.set(4000, 0, 0);
				scene.add(lumiere);



				function animate() {
					if (stop) {
						return;
					}
					if (onresizing) {
						onresizing = false;
						init(elt);
					}
					// on fait tourner le cube sur ses axes x et y
					// sphere.rotation.x += 0.01;
					const speed = 0.0004;
					const angle = speed * i;
					// sphere.rotation.x = angle;
					sphere.rotation.y = angle;
					let x = 4000 * Math.cos(angle);
					let z = 4000 * Math.sin(angle);
					lumiere.position.set(x, 0, z);

					// on bouge la camera
					camera.position.x = 150;
					camera.position.y = 300;
					camera.position.z = 800;
					// on effectue le rendu de la scène
					renderer.render(scene, camera);
					i++;

					requestAnimationFrame(animate);
				}
				animate();
			});
		}, 0);


		window.onresize = function() {
			onresizing = true;
			stars.init(starsElt);
		};

		this.$onDestroy = () => {
			stop = true;
		};

	}
});
