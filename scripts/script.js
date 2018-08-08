var colorArr = [];
for(let i=0 ; i<8 ; i++) {
	colorArr[i] = generateRandomHex();
}
var colorqt;
var fileReader = new FileReader();

function updateqtnum() {
	document.querySelector("#colorqtnum").innerHTML = document.querySelector("#colorqt").value;
	colorqt = document.querySelector("#colorqt").value;
	showColors();
	drawCircle();
}

function showColors() {
	let colorqt = document.querySelector("#colorqt").value;
	let colors = document.querySelector("#colors > div");
	colors.innerHTML = "";
	for(let i=1 ; i <= colorqt ; i++) {
		let currentInput = colors.appendChild(document.createElement("div"));
		currentInput.appendChild(document.createElement("span")).innerHTML = "Color " + i;
		let colorController = currentInput.appendChild(document.createElement("input"));
		colorController.type = "color";
		colorController.value = colorArr[i-1];
		colorController.className = "colorPicker";
	}
}

function generateRandomHex() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for(var i=0; i<6; i++) {
		color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}

// Stuff to change when loading webpage
window.onload = function() {
	updateqtnum();
	drawCircle();

	document.getElementById("presetsInput").appendChild(document.createElement("option")).innerHTML = "Personalizado";
	for(let i of presets) {
		document.getElementById("presetsInput").appendChild(document.createElement("option")).innerHTML = i.name;
	}
};

// Update when slider changes
document.querySelector("#colorqt").addEventListener("change", function() {
	updateqtnum();
	drawCircle();
	presetToCustom();
});

// Update when color changes
document.querySelector("#colors").addEventListener("change", function() {
	let currentColors = document.getElementsByClassName("colorPicker");
	for(let i=0 ; i<currentColors.length ; i++) {
		colorArr[i] = currentColors[i].value;
	}
	drawCircle();
	presetToCustom();
});

function presetToCustom() {
	document.querySelector("#presetsInput").selectedIndex = 0;
}

// Update when preset is selected
document.querySelector("#presets").addEventListener("change", function() {
	// Get selected preset
	let index = document.getElementById("presetsInput").selectedIndex;
	// If custom, do nothing
	if(index == 0) {
		return false;
	}
	// Change index number to match array's
	index--;
	// Update color quantity
	document.getElementById("colorqt").value = presets[index].qt;
	updateqtnum();
	// Update colors
	var colors = document.getElementsByClassName("colorPicker");
	for(let i=0 ; i<presets[index].qt ; i++) {
		colors[i].value = presets[index].colors[i];
		colorArr[i] = presets[index].colors[i];
	}
	// Finally, update canvas
	drawCircle();
});

// colorqt + and -
document.getElementById("colorqtMinus").addEventListener("click", function() {
	document.getElementById("colorqt").value--;
	updateqtnum();
	presetToCustom();
});
document.getElementById("colorqtPlus").addEventListener("click", function() {
	document.getElementById("colorqt").value++;
	updateqtnum();
	presetToCustom();
});

// Save btn
document.getElementById("dl").addEventListener("click", function() {
	this.href = document.getElementById("preview").toDataURL('image/jpeg');
	this.download = "avatar.jpg";
});