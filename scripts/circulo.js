// Variables init
checkLocalStorage();
var colorqt = localStorage.getItem("colorqt");


// Stuff to do when web loads
window.onload = function() {
	loadPresets();
	document.getElementById("presetsInput").addEventListener("change", presetChosen);
	showColors();
	drawCircle();
}


// +/- buttons event listener
document.getElementById("colorqtMinus").addEventListener("click", function() {
	plusminusButtons("-")
});
document.getElementById("colorqtPlus").addEventListener("click", function() {
	plusminusButtons("+")
});


// Save button
document.getElementById("dl").addEventListener("click", function() {
	this.href = document.getElementById("preview").toDataURL('image/jpeg');// Catch canvas content as jpeg
	this.download = "avatar.jpg"; // File name

	document.getElementById("dlimg").src = document.getElementById("preview").toDataURL('image/jpeg', 0.8); // Preview

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

// This function returns a random color in hex
function generateRandomHex() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for(var i=0; i<6; i++) {
		color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}


// Load presets and fill the combobox
function loadPresets() {
	document.getElementById("presetsInput").appendChild(document.createElement("option")).innerHTML = "Personalizado";
	for(let i of presets) {
		document.getElementById("presetsInput").appendChild(document.createElement("option")).innerHTML = i.name;
	}
	presetToCustom();
}


// Local storage init
function checkLocalStorage() {
	// If no colorqt is set on LS, get the default value
	if(localStorage.getItem("colorqt") == undefined) {
		localStorage.setItem("colorqt", document.getElementById("colorqt").value);
	}
	// If colorqt is present, set it to the page value
	else {
		document.getElementById("colorqt").value = localStorage.getItem("colorqt");
	}
	
	// If no colors or wrong quantity of colors are set on LS, generate 8 random colors
	if(
		localStorage.getItem("colors") == undefined || 
		JSON.parse(localStorage.getItem("colors")).length != 8) {
		var colorArr = [];
		for(let i=0 ; i<8 ; i++) {
			colorArr[i] = generateRandomHex();
		}
		localStorage.setItem("colors", JSON.stringify(colorArr));
	}
}


// +/- buttons event action
function plusminusButtons(action) {
	navigator.vibrate(16);
	var colorqtval = document.getElementById("colorqt");
	switch(action) {
		case "+": // Plus button
		colorqtval.value++;
			break;
		case "-": // Minus button
		colorqtval.value--;
			break;
		default:
			break;
	}
	// Failsafes
	if(colorqtval.value > 8) {
		colorqtval.value = 8;
	}
	if(colorqtval.value < 1) {
		colorqtval.value = 1;
	}
	updateColorqt();
}


// Update colorqt and draw circle
function updateColorqt() {
	colorqt = document.getElementById("colorqt").value;
	localStorage.setItem("colorqt", colorqt);
	showColors();
	drawCircle();
}


// Show color buttons and pickers based on the quantity set on LS
function showColors() {
	let colors = document.getElementById("colors");
	colors.innerHTML = ""; // Clear colors
	for(let i=0 ; i < colorqt ; i++) {
		// Create button with its background color
		let currentInput = colors.appendChild(document.createElement("button"));
		currentInput.style.backgroundColor = JSON.parse(localStorage.getItem("colors"))[i];
		// Vibrate when tapped on mobile
		currentInput.onclick = function() { navigator.vibrate(10); }
		// Create color picker
		let picker = new CP(currentInput, "click");
		picker.self.className += " animation-fadein"
		// Create close button
		let closebtn = picker.self.appendChild(document.createElement("a"));
		closebtn.className = "btn";
		closebtn.innerHTML = "Elegir color";
		closebtn.onclick = function() { picker.exit(); }
		picker.self.onclick = function(event) { if(event.target == this) picker.exit(); }
		// Set default color to the color picker
		picker.set(JSON.parse(localStorage.getItem("colors"))[i]);
		// Save color whenever the picker detects a change
		picker.on("change", function(color) {
			this.source.style.backgroundColor = "#" + color;
			changedColor(i, color);
		});
	}
}


// Update color array
function changedColor(index, color) {
	var colorArr = JSON.parse(localStorage.getItem("colors"));
	colorArr[index] = "#" + color;
	localStorage.setItem("colors", JSON.stringify(colorArr));
	// presetToCustom();
	drawCircle();
}


// Change preset combobox to custom
function presetToCustom() {
	document.querySelector("#presetsInput").selectedIndex = 0;
}


// Chosen preset
function presetChosen() {
	let index = document.getElementById("presetsInput").selectedIndex;
	// If custom, do nothing
	if(index == 0) {
		return false;
	}
	// Change index number to match array's
	index--;
	// Update color quantity
	document.getElementById("colorqt").value = presets[index].qt;
	updateColorqt();
	// Update colors
	var currentColors = JSON.parse(localStorage.getItem("colors"));
	for(let i=0 ; i<presets[index].qt ; i++) {
		currentColors[i] = presets[index].colors[i];
	}
	localStorage.setItem("colors", JSON.stringify(currentColors));
	showColors();
}


// Dismiss overlay
function dismissOverlay() {
	document.getElementById("overlay-bg").style.opacity = 0;
	document.getElementById("overlay-bg").style.pointerEvents = "none";
}