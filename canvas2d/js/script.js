//get canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//canvas size
function canvasResize(){
	let ww = window.innerWidth, wh = window.innerHeight, w, h;
	if (ww < 575.98){
		w = ww - 20;
		h = Math.min(wh - 60 - 100, 400);
	}
	else {
		w = 500;
		h = 400;
	}
	canvas.width = w;
	canvas.height = h;
	console.log('canvas resize', canvas.width, canvas.height, ww, wh);

	//reset game
	gameReset(1);
}

//clear canvas
function clearCtx(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//init game on page load
onPageLoad(() => canvasResize());