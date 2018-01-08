function generateStars(elt) {
	const width = elt.clientWidth;
	const height = elt.clientHeight;
	const density = 0.001;
	const count = width * height * density;
	const array = [];
	for (let i = 0; i < count; i++) {
		array.push({
			x: Math.ceil(Math.random() * width),
			y: Math.ceil(Math.random() * 5000),
			r: Math.ceil(Math.random() * 1.5),
			luminosity: Math.ceil(Math.random() * 10) + 90,
			opacity: Math.random() * 0.5,
			duration: Math.random() * 1 + 1,
		});
	}
	return array;
}

function toSVG(a) {
	let html = '';
	for (let i = 0; i < a.length; i++) {
		const e = a[i];
		html += `
<circle cx="${e.x}" cy="${e.y}" r="${e.r}" 
	stroke-width="0" fill="hsl(60, 100%, ${e.luminosity}%)" opacity="${e.opacity}" >
</circle>`;
	}
	return html;
}

class Stars {
	init(elt) {

		const stars = toSVG(generateStars(elt));


		let html = `
<svg>
    <defs>
        <filter id="f1" x="0" y="0">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
        </filter>
    </defs>
    ${stars}
</svg>       
        `;
		elt.innerHTML = html;
	}
}

export const stars = new Stars();
