import React, { Component } from "react";
import SettingUpload from "./SettingUpload";
import SettingColors from "./SettingColors";
import SettingPresets from "./SettingPresets";
import SettingDownload from "./SettingDownload";

export class Settings extends Component {
	render() {
		const {photoUpload, colors, minusColor, plusColor, presets, changedPreset, colorqt, colorChanged } = this.props;

		return (
			<aside>
				<SettingUpload photoUpload={photoUpload} />
				<SettingColors
					colors={colors}
					colorqt={colorqt}
					minusColor={minusColor}
					plusColor={plusColor}
					colorChanged={colorChanged}
				/>
				<SettingPresets
					presets={presets}
					changedPreset={changedPreset}
				/>
				<SettingDownload dlClicked={this.props.dlClicked} />
			</aside>
		);
	}
}

export default Settings;
