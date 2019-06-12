import React, { Component } from "react";
import Settings from "./Settings";
import Preview from "./Preview";
// import presets from "../scripts/presets.json";

// This sets the maximum colors
const maxColors = 8;

export class Generator extends Component {
	state = {
		// Current colors used for the circle
		colors: [],
		colorqt: maxColors, // this will be overwritten anyway
		photo: null,
		presets: []
	};

	componentWillMount() {
		// Fetch presets JSON
		fetch("/circulo/scripts/presets.json")
		.then(response => response.json())
		.then(data => { // Order alphabetically by item name
			data.sort((a, b) => {
				let itemA = a.name.toUpperCase();
				let itemB = b.name.toUpperCase();
				return (itemA < itemB) ? -1 : (itemA > itemB) ? 1 : 0;
			});
			this.setState({presets: data})
		})
		.catch(error => console.error("Pasó algo malo al cargar los preseteados, no los vas a poder usar :/", error))
	}

	// Random color generator (hex)
	generateRandomColor = () => {
		let letters = "0123456789ABCDEF".split("");
		let color = "#";
		for (var i = 0; i < 6; i++) {
			color += letters[Math.round(Math.random() * 15)];
		}
		return color;
	};

	// Generate new color array and quantity and save them into the state (calling this fx will override any value)
	initializeRandomColors = () => {
		let initialColors = [];
		for (let i = 0; i < maxColors; i++) {
			initialColors.push(this.generateRandomColor()); // Generate 8 random colors and push them to the colors array
		}
		this.setState({
			colors: initialColors,
			colorqt: Math.floor(Math.random() * maxColors) + 1
		}); // set the initial color quantity to a random number (1-max)
	};

	// Method to change colors to the selected preset
	changeColorsToPreset = presetIndex => {
		let currentColors = [...this.state.colors]; // Get current colors
		const newColors = [...this.state.presets[presetIndex].colors]; // Get selected preset colors
		newColors.forEach((color, index) => (currentColors[index] = color)); // Merge them into an array, overwriting the colors on the required positions
		this.setState({
			colors: currentColors,
			colorqt: this.state.presets[presetIndex].qt
		});
	};

	// Get uploaded photo and save it on state
	photoUpload = evt => {
		let img = new Image();
		if(evt.target.files.length === 0 || !evt.target.files[0].type.match("image.*")) return false; // Check that the file is valid
		img.src = URL.createObjectURL(evt.target.files[0]);
		img.onload = () => this.setState({photo: img})
	};

	// Color add or remove
	minusColor = () => {
		// remove
		if(navigator.vibrate) navigator.vibrate(16);
		if (this.state.colorqt > 1) {
			// Check that there's at least one color
			this.setState({ colorqt: this.state.colorqt - 1 });
		}
	};
	plusColor = () => {
		// add
		if(navigator.vibrate) navigator.vibrate(16);
		if (this.state.colorqt < maxColors)
			// Check that there's more than
			this.setState({ colorqt: this.state.colorqt + 1 });
	};

	handleColorChanged = (color, index) => {
		let newColors = [...this.state.colors];
		newColors[index] = color;
		this.setState({ colors : newColors })
	}

	componentDidMount() {
		// Generate random colors if the user hasn't got any saved on his local storage
		if (!localStorage.getItem("colors")) {
			this.initializeRandomColors();
		} else {
			// Get colors from LS if the user has them
			let lscolors = JSON.parse(localStorage.getItem("colors"));
			let lsqt = JSON.parse(localStorage.getItem("colorqt"));
			this.setState({ colors: lscolors });
			this.setState({ colorqt: lsqt });
		}
	}

	componentDidUpdate() {
		if ( // Check that the user hasn't fiddled with the safe values
			this.state.colors.length < maxColors ||
			this.state.colorqt <= 0 ||
			this.state.colorqt > maxColors
		)
			this.initializeRandomColors() // reset colors if some value is wrong
		else {
			localStorage.setItem("colors", JSON.stringify(this.state.colors)); // Save the colors state to the ls whenever this component updates
			localStorage.setItem("colorqt", this.state.colorqt); // Save the colors quantity to the ls whenever this component updates
		}
	}

	render() {
		return (
			<main>
				<Settings
					photoUpload={this.photoUpload}
					colors={this.state.colors}
					colorChanged={this.handleColorChanged}
					colorqt={this.state.colorqt}
					minusColor={this.minusColor}
					plusColor={this.plusColor}
					presets={this.state.presets}
					changedPreset={this.changeColorsToPreset}
					dlClicked={this.props.dlClicked}
				/>
				<Preview colors={this.state.colors} colorqt={this.state.colorqt} photo={this.state.photo} />
			</main>
		);
	}
}

export default Generator;
