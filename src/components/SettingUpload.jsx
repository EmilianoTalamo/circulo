import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class SettingUpload extends Component {
	render() {
		return (
			<div id="settingUpload">
				<h2 className="subtitle">Foto</h2>
				<label htmlFor="uploadButton" className="btn"><FontAwesomeIcon icon="camera" />Seleccionar foto</label>
				<input type="file" name="uploadButton" id="uploadButton" accept="image/*" onChange={(evt) => this.props.photoUpload(evt)}></input>
			</div>
		)
	}
}

export default SettingUpload
