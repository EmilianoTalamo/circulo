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
					<h3>Se {this.isiOS() && "generó" || "está descargando"} tu nueva foto de perfil 😘</h3>
					<img
						src={this.props.previewimg}
						alt="Tu imagen generada"
						id="dlimg"
					/>
					{this.isiOS() && <p className="iOS-msg">☝ Mantené apretada la imagen y elegí "Guardar imagen" ☝</p>}
					<p className="shareText">Quedó hermoso, compartí el amor en las redes sociales</p>
					<div className="shareButtons">
						<a className="btn"
							href={"http://twitter.com/home?status=" + twMsg}
							target="_blank"
						> <FontAwesomeIcon icon={['fab', 'twitter']} />
							
						</a>
						<a className="btn"
							href={"https://www.facebook.com/sharer/sharer.php?u=" + fbMsg}
							target="_blank"
						> <FontAwesomeIcon icon={['fab', 'facebook-f']} />
						</a>
					</div>
					<hr />
					<p className="donationText">Esta app es totalmente gratis y libre de publicidad, pero me pondría muy feliz que consideres donar 👇</p>
					<div className="donationButtons">
					<a className="btn paypal" href="https://paypal.me/emilianotalamo" target="_blank">PayPal</a>
					<a href="https://www.mercadopago.com/mla/checkout/start?pref_id=187303563-81461516-65d0-4293-86ff-b837c6ab604b" className="btn mercadopago" target="_blank">MercadoPago</a>
					</div>
					
				</div>
			</div>
		);
	}
}

export default Popup;
