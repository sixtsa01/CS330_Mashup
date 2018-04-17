const randInt = max => Math.floor(Math.random() * max);

const jLen = object => Object.keys(object).length;

const jStr = object => JSON.stringify(object);

var map;

function genColors(avatar, sex) {
	let colors = [];
	for (let i = 0; i < jLen(avatar[sex]['colors']); i++) {
		let color = avatar[sex]['colors'][i][Object.keys(avatar[sex]['colors'][i])[0]];
		colors.push(`"${color}":${randInt(16777216)}`);
	}
	return colors;
}

function genAttributes(avatar, sex) {
	let attributes = [];
	for (let i = 0; i < jLen(avatar[sex]); i++) {
		let counter = Object.keys(avatar[sex])[i];
		if (typeof avatar[sex][counter] === 'object') {
			const attribute = jStr(avatar[sex][counter][randInt(avatar[sex][counter].length)]);
			attributes.push(attribute.substr(1,attribute.length-2));
		}
	}
	return attributes.slice(0,attributes.length-(avatar[sex]['sex']+3));
}

function genBody(avatar, sex) {
	let body = [];

	const build = jStr(avatar[sex]['build'][randInt(jLen(avatar[sex]['build']))]);
	body.push(build.substr(1,build.length-2));
	if (sex !== 'male') {
		const chestSize = jStr(avatar[sex]['chestSize'][randInt(jLen(avatar[sex]['chestSize']))]);
		body.push(chestSize.substr(1,chestSize.length-2));
	}
	return body;
}

function genUrl(avatar, sex) {
	let comic = data.imoji[randInt(data.imoji.length)].comic_id;
	let attributes = genAttributes(avatar,sex);
	let colors = genColors(avatar,sex);
	let body = genBody(avatar,sex);
	let outfit = avatar[sex]['outfit'][randInt(avatar[sex]['outfit'].length)];
	let proportion = avatar[sex]['proportion'][randInt(avatar[sex]['proportion'].length)];
	let scale = 3;
	sex = avatar[sex]['sex'];

	let url = `https://render.bitstrips.com//render/${comic}/316830037_16_s4-v1.png?pd2={${attributes}}&colours={${colors}}&body={${body}}&sex=${sex}&outfit=${outfit}&proportion=${proportion}&cropped="body"&scale=${scale}&style=4`;
        console.log(url)
	return url;
}

function clickedOn() {
	FB.api(
		'/me?fields=gender',
		'GET',
		{},
		function(response) {
			console.log(response)
			var gender = response.gender
			var image = genUrl(bitmoji,gender);
        		var marker = new google.maps.Marker({
				position: {lat: 43.3111, lng: -91.8063},
				map: map,
				icon: image
			});
			
		}
	);
}

function initMap() {
        var area = {lat: 43.3111, lng: -91.8063};
        map = new google.maps.Map(document.getElementById('map'), {
		center: area,
                zoom: 8
	});
	return map
}
