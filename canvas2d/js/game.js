//game win
function gameWin(){
	status = 2;
}

//game loss
function gameLoss(){
	life -= 1;
	if (life > 0){
		resetPaddle();
		resetBall();
		status = 1;
	}
	else status = 3;
}

//set btn pause text
function setBtnPauseText(){
	let text = 'Pause';
	if (status == 1) text = start ? 'Resume' : 'Start';
	else if (status > 1) text = 'Start';
	setTimeout(() => btn_pause.innerText = text);
}

//game pause
function gamePause(){
	status = 1;
	setBtnPauseText();
}

//game resume
function gameResume(){
	start = 1;
	status = 0;
	setBtnPauseText();
	requestAnimationFrame(render);
}

//game pause toggle
function gamePauseToggle(){
	if (status == 0) gamePause();
	else if (status == 1) gameResume();
}

//game reset
function gameReset(paused){
	status = 1;
	
	//reset values
	setupInfo();
	setupBricks();
	setupPaddle();
	setupBall();
	setBtnPauseText();
	
	//game resume
	if (!paused) setTimeout(gameResume, 200);
	else draw();
}

//draw
function draw(){
	//detect collision
	brickCollision();
	paddleCollision();
	ballCollision();

	//clear canvas
	clearCtx();
	
	//game won
	if (status == 2){
		drawWinScore();
		drawWin();
		return;
	}

	//game loss
	if (status == 3){
		drawWinScore();
		drawLoss();
		return;
	}

	//draw scene
	drawBricks();
	drawPaddle();
	drawBall();
	drawScore();
	drawLife();

	//movement
	paddleMove();
	ballMove();

	//return 1 to continue
	return 1;
}

//render animation
function render(){
	//paused
	if (status == 1){
		setBtnPauseText();
		return;
	}

	//draw
	if (!draw()){
		setBtnPauseText();
		return;
	}

	//next frame
	requestAnimationFrame(render);
}