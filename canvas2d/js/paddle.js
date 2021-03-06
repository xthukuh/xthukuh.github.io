//setup paddle
function setupPaddle(){
	window.paddleLeft = 0;
	window.paddleRight = 0;
	window.paddleHeight = 7;
	window.paddleWidth = 70;
	window.paddleStep = 5;
	window.paddleEdge = 2;
	window.paddleColor = 'black';
	window.paddleY = canvas.height - paddleHeight;
	resetPaddle();
}

//reset paddle
function resetPaddle(){
	window.paddleX = (canvas.width - paddleWidth) / 2;
}

//move paddle
function paddleMove(){
	//move left
	if (paddleLeft && paddleX > 0) paddleX -= paddleStep;

	//move right
	if (paddleRight && paddleX < canvas.width - paddleWidth) paddleX += paddleStep;
}

//paddle collision detection
function paddleCollision(){
	//has hit paddle top
	if (dy > 0 && y + dy > paddleY - ballRadius){
		let paddleR = paddleX + paddleWidth;
		
		//has hit paddle
		if (x + ballRadius > paddleX && x - ballRadius < paddleR){

			//has hit corder
			if (dx > 0 && x <= paddleX + paddleEdge || dx < 0 && x >= paddleR - paddleEdge) dx = -dx; //ball movement deflect
			
			//reflect dy
			dy = -Math.abs(dy); //ball movement up
		}
	}
}

//draw paddle
function drawPaddle(){
	ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = paddleColor;
    ctx.fill();
    ctx.closePath();
}