import React, { Component } from "react";
// Font Awesome thingys
import { library } from "@fortawesome/fontawesome-svg-core";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import {
	faCamera,
	faCloudDownloadAlt
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebookF } from "@fortawesome/free-brands-svg-icons";
// App components and styles
import Header from "./components/Header";
import Generator from "./components/Generator";
import About from "./components/About";
import Popup from "./components/Popup";
import "./styles/circulo.scss";

import { CSSTransition } from 'react-transition-group';

// Font Awesome icons
library.add(
	faCamera,
	faCloudDownloadAlt,
	faTwitter,
	faFacebookF,
	faQuestionCircle
);

class App extends Component {
	state = {
		img: null,
		popup: false
	};

	handleDl = () => {
		let img = document.getElementById("preview").toDataURL("image/jpeg", 0.9);
		this.setState({ img, popup: true });
		if(navigator.platform && !/iPad|iPhone|iPod/.test(navigator.platform)) {
			let a = document.createElement("a");
			a.href = img;
			a.download = "avatar.jpg";
			a.target= "_blank";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	};

	handleClose = () => {
		this.setState({ popup: false });
	};

	render() {
		const popup = (
				<Popup
					key={"popup"}
					handleDL={this.handleDL}
					previewimg={this.state.img}
					onClose={this.handleClose}
				/>
		
		);
		return (
			<React.Fragment>
				<Header />
				<Generator dlClicked={this.handleDl} />
				<About />
				<CSSTransition
				in={this.state.popup}
				unmountOnExit
				classNames="fadeUp"
				timeout={ 300 }
				appear={true}
				enter={true}
				exit={true}
				>
					{popup}
			</CSSTransition>
			</React.Fragment>
		);
	}
}

export default App;
