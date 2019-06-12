import React, { Component } from "react";

export class Preview extends Component {
	drawPhoto = (preview, ctx) => {
		if (this.props.photo !== null) {
			let posX, posY, drawW, drawH;
			let ogheight = this.props.photo.naturalHeight; // Get file height
			let ogwidth = this.props.photo.naturalWidth; // Get file width

			// Aspect ratio correction
			// if uploaded pic is wide
			if (ogwidth > ogheight) {
				drawW = 400 * Math.abs(ogwidth / ogheight);
				drawH = 400;
				posY = 0;
				posX = (400 - drawW) / 2;
			}

			// if uploaded pic is tall
			else if (ogwidth < ogheight) {
				drawW = 400;
				drawH = 400 * Math.abs(ogheight / ogwidth);
				posY = (400 - drawH) / 2;
				posX = 0;
			}

			// if uploaded pic is 1:1
			else {
				posX = 0;
				posY = 0;
				drawW = 400;
				drawH = 400;
			}
			ctx.drawImage(this.props.photo, posX, posY, drawW, drawH);
		}
	};

	drawCircle = (preview, ctx) => {
		ctx.clearRect(0, 0, ctx.width, ctx.height);

		// Draw on the top layer
		ctx.globalCompositeOperation = "source-over";

		// This sets the starting drawing point on the top center angle of the circle
		var offset = 300;

		// Initial position of the angles
		var angle1 = 0,
			angle2 = 0;

		// This loop draws the segments of the circle based on the quantity chosen by the user
		for (let i = 1; i <= this.props.colorqt; i++) {
			ctx.beginPath();
			ctx.lineWidth = "20"; // Width of the stoke (constant across all strokes)
			let strokeColor = this.props.colors[i - 1];
			ctx.strokeStyle = strokeColor; // Color of the current stroke
			angle1 = angle2;
			angle2 = (360 / this.props.colorqt) * i;
			ctx.arc(
				200,
				200,
				190,
				(Math.PI / 180) * angle1 + offset,
				(Math.PI / 180) * angle2 + offset,
				false
			);
			ctx.stroke();
		}

		// Draw on the back layer again
		ctx.globalCompositeOperation = "destination-over";
	};

	clearCanvas = (preview, ctx) => {
		ctx.save();

		// Use the identity matrix while clearing the canvas
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, preview.width, preview.height);

		// Restore the transform
		ctx.restore();
	};

	componentWillUpdate() {
		const preview = document.getElementsByTagName("canvas")[0];
		const ctx = preview.getContext("2d");
		this.clearCanvas(preview,ctx)
	}

	componentDidUpdate() {
		const preview = document.getElementsByTagName("canvas")[0];
		const ctx = preview.getContext("2d");
		
		this.drawPhoto(preview,ctx);
		this.drawCircle(preview,ctx);
	}

	render() {
		return (
			<figure>
				<canvas width="400" height="400" id="preview" />
			</figure>
		);
	}
}

export default Preview;
