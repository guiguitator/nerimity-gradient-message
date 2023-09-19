const color_container = document.getElementById('color-container');
const message = document.getElementById('message');
const preview = document.getElementById('preview');
const result = document.getElementById('result');
var colors = ['#ffffff','#ffae00'];

function updateColors() {
	colors = []
	for (var i = 0; i < color_container.children.length; i++) {
		colors.push(color_container.children[i].value);
	}
	update();
}

function updatePreview(gradient) {
	preview.innerHTML = '';
	for (var i = 0; i < message.value.length; i++) {
		preview.insertAdjacentHTML('beforeend', `<span style="color: ${gradient[i]};">${message.value[i]}</span>`);
	}
}

function updateResult(gradient) {
	result.innerHTML = '';
	for (var i = 0; i < message.value.length; i++) {
		if (message.value[i] != " " && message.value[i] != "\n") {
			result.insertAdjacentHTML('beforeend', `[${gradient[i]}]${message.value[i]}`);
		} else {
			result.insertAdjacentHTML('beforeend', `${message.value[i]}`);
		}
	}
}

function toGradient(len) {
	return chroma.scale(colors).colors(len);
}

function update() {
	var gradient = toGradient(message.value.length);
	updatePreview(gradient);
	updateResult(gradient);
}

function copyResult() {
	var range = document.createRange();
	range.selectNode(result);
	window.getSelection().removeAllRanges();
	window.getSelection().addRange(range);
	document.execCommand("copy");
	window.getSelection().removeAllRanges();
}