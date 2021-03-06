//setup ball
function setupBall(){
	window.ballRadius = 7;
	window.ballColor = 'red';
	resetBall();
}

//reset ball
function resetBall(){
	window.x = canvas.width / 2;
	window.y = canvas.height - paddleHeight - ballRadius;
	window.dx = 2;
	window.dy = -2;
}

//ball move
function ballMove(){
	x += dx;
	y += dy;
}

//ball collision detection
function ballCollision(){
	//has hit x walls
	if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx; //ball movement deflect
	
	//has hit y top wall
	if (y + dy < ballRadius) dy = Math.abs(dy); //ball movement down

	//has hit y bottom wall
	else if (dy > 0 && y + dy > canvas.height - ballRadius) gameLoss();
}

//draw ball
function drawBall(){
    ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = ballColor;
	ctx.fill();
	ctx.closePath();
}