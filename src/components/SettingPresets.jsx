import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class SettingPresets extends Component {
	change = (evt) => {
		if(evt.target.value !== 'custom')
			this.props.changedPreset(evt.target.value);
	}

	componentWillUpdate() {
		document.getElementById("presetsInput").selectedIndex = 0;
	}

	render() {
		return (
			<div id="settingPresets">
				<h2 className="subtitle">Preseteados</h2>
				<p><FontAwesomeIcon icon={['far', 'question-circle']} />Abrí el campo de abajo para ver y seleccionar la combinación de colores predeterminados que necesites.</p>
				<select name="presetsInput" id="presetsInput" onChange={this.change}>
					<option value="custom" disabled hidden>Ver preseteados</option>
					{this.props.presets.map((preset, index) => (
						<option value={index} key={'preset'+index}>{ preset.name }</option>
					))}
				</select>
			</div>
		)
	}
}

export default SettingPresets
