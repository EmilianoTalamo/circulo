import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class Popup extends Component {

	isiOS = () => {
		let iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
		return iOS;
	}

	render() {
		const twMsg = encodeURI("Si buscan una forma sencilla de personalizar su foto de perfil con un borde de colores, en esta web pueden hacerlo fácilmente: https://emilianotalamo.github.io/circulo")
		const fbMsg = encodeURI("https://emilianotalamo.github.io/circulo")
		
		return (
			<div
				id="overlay-bg"
				onClick={e => {
					if (e.currentTarget === e.target) this.props.onClose();
				}}
			>
				<div id="overlay-content">
					<span className="close" onClick={this.props.onClose}>
						×
					</span>
					<h3>Se {this.isiOS() ? "generó" : "está descargando"} tu nueva foto de perfil 😘</h3>
					<img
						src={this.props.previewimg}
						alt="Tu imagen generada"
						id="dlimg"
					/>
					{this.isiOS() && <p className="iOS-msg"><span role="img" aria-label="Mano apuntando hacia arriba">☝</span> Mantené apretada la imagen y elegí "Guardar imagen" <span role="img" aria-label="Mano apuntando hacia arriba">☝</span></p>}
					<p className="shareText">Quedó hermoso, compartí el amor en las redes sociales</p>
					<div className="shareButtons">
						<a className="btn"
							href={"http://twitter.com/home?status=" + twMsg}
							target="_blank"
							rel="noopener noreferrer"
						> <FontAwesomeIcon icon={['fab', 'twitter']} />
							
						</a>
						<a className="btn"
							href={"https://www.facebook.com/sharer/sharer.php?u=" + fbMsg}
							target="_blank"
							rel="noopener noreferrer"
						> <FontAwesomeIcon icon={['fab', 'facebook-f']} />
						</a>
					</div>
					
				</div>
			</div>
		);
	}
}

export default Popup;
