var preview = document.getElementById("preview");
var ctx = preview.getContext("2d");

function clearCanvas() {
	preview.getContext('2d').clearRect(0, 0, preview.width, preview.height);
	drawCircle();
}

document.getElementById("pic").onchange = function(e) {
	if(!document.getElementById("pic").files[0].type.match("image.*")){
		return false;
	}

	clearCanvas();

	fileReader.onload = function(file) {
		var img = new Image();
		
		img.onload = function() {
			drawCircle();
			var posX, posY, drawW, drawH;
			var ogheight = img.naturalHeight;
			var ogwidth = img.naturalWidth;
			// if uploaded pic is wide
			if(ogwidth > ogheight) {
				drawW = 400 * Math.abs(ogwidth / ogheight);
				drawH = 400;
				posY = 0;
				posX = (400 - drawW) / 2;
			}
			// if uploaded pic is tall
			else if(ogwidth < ogheight) {
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
			ctx.drawImage(img,posX,posY,drawW,drawH);
		};
    img.src = event.target.result;
    };
		fileReader.readAsDataURL(e.target.files[0]);
};

// Circulo

function drawCircle() {
	ctx.clearRect(0, 0, ctx.width, ctx.height);
	ctx.globalCompositeOperation = 'source-over';
	var offset = 300;
	var angle1 = 0, angle2 = 0;
	for(let i=1 ; i<=colorqt ; i++) {
		ctx.beginPath();
		ctx.lineWidth = "20";
		ctx.strokeStyle=colorArr[i-1];
		angle1 = angle2;
		angle2 = 360/colorqt * i;
		ctx.arc(200,200,190,(Math.PI/180)*angle1+offset,(Math.PI/180)*angle2+offset,false);
		ctx.stroke();
	}
	ctx.globalCompositeOperation = 'destination-over';
}

