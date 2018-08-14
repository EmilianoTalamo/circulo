// Variable initialization
var colorqt;


// Create color array and fill it with random colors
var colorArr = [];
for(let i=0 ; i<8 ; i++) {
	colorArr[i] = generateRandomHex();
}


// Stuff to do when web loads
window.onload = function() {

	// Get position of quantity slider
	updateqtnum();

	// Draw canvas circle
	drawCircle();

	// Load presets
	document.getElementById("presetsInput").appendChild(document.createElement("option")).innerHTML = "Personalizado";
	for(let i of presets) {
		document.getElementById("presetsInput").appendChild(document.createElement("option")).innerHTML = i.name;
	}
};


// Quantity slider event listener
document.querySelector("#colorqt").addEventListener("change", function() {
	updateqtnum(); // Update number and colors
	drawCircle(); // Draw canvas circle
	presetToCustom(); // Change preset to custom
});


// Quantity slider buttons
// Button (-)
document.getElementById("colorqtMinus").addEventListener("click", function() {
	document.getElementById("colorqt").value--;
	updateqtnum();
	presetToCustom();
});
// Button (+)
document.getElementById("colorqtPlus").addEventListener("click", function() {
	document.getElementById("colorqt").value++;
	updateqtnum();
	presetToCustom();
});


// Color change event listener
document.querySelector("#colors").addEventListener("change", function() {
	// Get all colors and write them to the array
	let currentColors = document.getElementsByClassName("colorPicker");
	for(let i=0 ; i<currentColors.length ; i++) {
		colorArr[i] = currentColors[i].value;
	}
	drawCircle(); // Draw canvas circle
	presetToCustom(); // Change preset to custom
});


// Preset chosen
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


// Save button
document.getElementById("dl").addEventListener("click", function() {
	this.href = document.getElementById("preview").toDataURL('image/jpeg'); // Catch canvas content as jpeg
	this.download = "avatar.jpg"; // File name

	// Trigger share overlay
	document.getElementById("overlay-bg").style.opacity = 1;
	document.getElementById("overlay-bg").style.pointerEvents = "all";
});

// Overlay close button
document.getElementById("close").addEventListener("click", function() {
	dismissOverlay();
});

// Overlay: Close when clicking overlay background
document.getElementById("overlay-bg").addEventListener("click", function(e) {
	if(e.target == this) {
		dismissOverlay();
	}
});


// Functions

// This function updates the number of the color quantity slider and calls the colors updater function, it also draws the canvas again
function updateqtnum() {
	document.querySelector("#colorqtnum").innerHTML = document.querySelector("#colorqt").value;
	colorqt = document.querySelector("#colorqt").value;
	showColors(); // Color updater function
	drawCircle(); // Draw canvas circle
}


// Colors updater function. Gets the value of the slider and updates the quantity of colors to be shown
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


// Random color generator (hex)
function generateRandomHex() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for(var i=0; i<6; i++) {
		color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}


// This changes the presets dropdown to custom when triggered
function presetToCustom() {
	document.querySelector("#presetsInput").selectedIndex = 0;
}


// Dismiss overlay
function dismissOverlay() {
	document.getElementById("overlay-bg").style.opacity = 0;
	document.getElementById("overlay-bg").style.pointerEvents = "none";
}