import React, { Component } from 'react'
import "@simonwep/pickr/dist/pickr.min.css"
import Pickr from "@simonwep/pickr/dist/pickr.min"

export class Picker extends Component {

	componentDidMount() {
		const pickr = new Pickr({
			el: '#pickr',
			showAlways: true,
			inline: true,
			useAsButton: true,
			comparison: false,
			default: this.props.colors[this.props.pickerIndex],
			swatches: this.props.colors,
			defaultRepresentation: 'HEX',
			components: {
				preview: false,
				opacity: false,
				hue: true,
				interaction: {
						hex: false,
						hsla: false,
						hsva: false,
						cmyk: false,
						input: false,
						clear: false,
						save: true
				}
			},
			strings: { save: 'Elegir color' }
		});

		pickr.on('change', (color) => { 
			let newColor = color.toHEXA().toString();
			this.props.colorChanged(newColor, this.props.pickerIndex);
		})

		pickr.on('save', () => {
			if(navigator.vibrate) navigator.vibrate(16);
			this.handleClose();
		})
	}

	handleClose = () => {
		this.props.closePicker();
	}

	render() {
		return (
			<div id="picker" onClick={(e) => { if(e.currentTarget === e.target) this.handleClose() }}>
				<div id="pickr"></div>
				
			</div>
		)
	}
}

export default Picker
