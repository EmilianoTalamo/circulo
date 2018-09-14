// Variable initialization
var fileReader = new FileReader();
var preview = document.getElementById("preview");
var ctx = preview.getContext("2d");


// Get selected photo
document.getElementById("pic").onchange = function(e) {
	// If the file is not a picture do nothing
	if(!document.getElementById("pic").files[0].type.match("image.*")){
		return false;
	}

	// Clear the canvas content
	clearCanvas();

	// When the file finished loading
	fileReader.onload = function(file) {
		var img = new Image();
		
		img.onload = function() {
			drawCircle();
			var posX, posY, drawW, drawH;
			var ogheight = img.naturalHeight; // Get file height
			var ogwidth = img.naturalWidth; // Get file width

			// Aspect ratio correction

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

			// Position the corrected image to the canvas
			ctx.drawImage(img,posX,posY,drawW,drawH);
			drawCircle();
		};
    img.src = event.target.result;
    };
		fileReader.readAsDataURL(e.target.files[0]);
};


// This function will draw the circle with the desired settings
function drawCircle() {
	ctx.clearRect(0, 0, ctx.width, ctx.height);

	// Draw on the top layer
	ctx.globalCompositeOperation = 'source-over';

	// This sets the starting drawing point on the top center angle of the circle
	var offset = 300;

	// Initial position of the angles
	var angle1 = 0, angle2 = 0;

	// This loop draws the segments of the circle based on the quantity chosen by the user
	for(let i=1 ; i<=colorqt ; i++) {
		ctx.beginPath();
		ctx.lineWidth = "20"; // Width of the stoke (constant across all strokes)
		let strokeColor = JSON.parse(localStorage.getItem("colors"))[i-1];
		ctx.strokeStyle=strokeColor; // Color of the current stroke
		angle1 = angle2;
		angle2 = 360/colorqt * i;
		ctx.arc(200,200,190,(Math.PI/180)*angle1+offset,(Math.PI/180)*angle2+offset,false);
		ctx.stroke();
	}

	// Draw on the back layer again
	ctx.globalCompositeOperation = 'destination-over';
}


// This function clears the canvas entirely, and draws a new circle
function clearCanvas() {
	preview.getContext('2d').clearRect(0, 0, preview.width, preview.height);
	drawCircle();
}