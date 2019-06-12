import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class SettingDownload extends Component {
	render() {
		return (
			<div id="settingDownload">
				<button className="btn" onClick={this.props.dlClicked}><FontAwesomeIcon icon="cloud-download-alt" />Descargar</button>
			</div>
		)
	}
}

export default SettingDownload
