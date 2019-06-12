import React, { Component } from "react";
import Picker from "./Picker";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export class SettingColors extends Component {
	state = {
		picker: false,
		pickerIndex: null
	};

	openPicker = index => {
		// openPicker closes the picker first (if any) and it opens it again on the next tick, to force a reset of the Picker component
		this.closePicker();
		if (navigator.vibrate) navigator.vibrate(10);
		setImmediate(() => this.setState({ picker: true, pickerIndex: index }));
	};

	closePicker = () => {
		this.setState({ picker: false });
	};

	render() {
		const { colors, colorqt } = this.props;
		const colorsToShow = colors.slice(0, colorqt);

		return (
			<div id="settingColors">
				<h2 className="subtitle">Colores</h2>
				<div id="colorqtButtons">
					<button onClick={this.props.minusColor}>-</button>
					<button onClick={this.props.plusColor}>+</button>
				</div>
				<TransitionGroup id="colorPickers">
					{colorsToShow.map((colorPicker, index) => (
						<CSSTransition
							key={"pickerSelector" + index}
							timeout={200}
							classNames="pickerSelectorAnim"
							appear={false}
							enter={true}
							exit={true}
						>
							<div
								onClick={() => this.openPicker(index)}
								style={{
									backgroundColor: colorPicker
								}}
								className="pickerSelector"
							/>
						</CSSTransition>
					))}
				</TransitionGroup>

				<CSSTransition
					in={this.state.picker}
					unmountOnExit
					classNames="fadeUp"
					timeout={300}
					appear={true}
					enter={true}
					exit={true}
				>
					<Picker
						pickerIndex={this.state.pickerIndex}
						colorChanged={this.props.colorChanged}
						closePicker={this.closePicker}
						colors={this.props.colors}
					/>
				</CSSTransition>
			</div>
		);
	}
}

export default SettingColors;
