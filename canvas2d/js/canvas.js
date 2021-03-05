(function(){
	let canvas = document.getElementById('canvas');
	let ctx = canvas.getContext('2d');
	let x = canvas.width/2;
	let y = canvas.height-30;
	let dx = 2;
	let dy = -2;
	let ballRadius = 10;
	let paddleHeight = 10;
	let paddleWidth = 75;
	let paddleX = (canvas.width-paddleWidth) / 2;
	let rightPressed = false;
	let leftPressed = false;
	let interval;
	let brickRowCount = 3;
	let brickColumnCount = 5;
	let brickWidth = 75;
	let brickHeight = 20;
	let brickPadding = 10;
	let brickOffsetTop = 30;
	let brickOffsetLeft = 30;
	let score = 0;
	let lives = 3;
	let stop = false;
	let pause = false;
	let bricks = [];
	let colors = {
		danger: '#FF6464',
		success: '#579F37',
		primary: '#0095DD',
		green: 'green',
		light: '#858585',
	};

	function resetBricks(){
		bricks = [];
		for (let c = 0; c < brickColumnCount; c++){
		    bricks[c] = [];
		    for (let r = 0; r < brickRowCount; r++){
		        bricks[c][r] = {x: 0, y: 0, status: 1};
		    }
		}
	}

	function resetBall(){
		x = canvas.width/2;
		y = canvas.height-30;
		dx = 2;
		dy = -2;
		paddleX = (canvas.width-paddleWidth)/2;
	}

	function newGame(){
		score = 0;
		lives = 3;
		stop = false;
		resetBricks();
		resetBall();
		draw();
	}

	function unPauseGame(){
		pause = false;
		draw();
	}

	function clearCtx(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	function drawBricks(){
	    for (var c = 0; c < brickColumnCount; c++){
	        for (var r = 0; r < brickRowCount; r++){
	            if (bricks[c][r].status == 1){
	                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
	                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
	                bricks[c][r].x = brickX;
	                bricks[c][r].y = brickY;
	                ctx.beginPath();
	                ctx.rect(brickX, brickY, brickWidth, brickHeight);
	                ctx.fillStyle = colors.primary;
	                ctx.fill();
	                ctx.closePath();
	            }
	        }
	    }
	}

	function drawBall(){
	    ctx.beginPath();
		ctx.arc(x, y, ballRadius, 0, Math.PI*2);
		ctx.fillStyle = colors.green;
		ctx.fill();
		ctx.closePath();
	}

	function drawPaddle(){
	    ctx.beginPath();
	    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	    ctx.fillStyle = colors.primary;
	    ctx.fill();
	    ctx.closePath();
	}

	function drawScore(){
	    ctx.font = "16px Arial";
	    ctx.fillStyle = colors.primary;
	    ctx.fillText("Score: "+score, 8, 20);
	}

	function drawLives(){
	    ctx.font = "16px Arial";
	    ctx.fillStyle = colors.primary;
	    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
	}

	function getTextDimens(text, font){
		if (font) ctx.font = font;
		let metrics = ctx.measureText(text);
		let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
		let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
		return {w: metrics.width, h: actualHeight, fh: fontHeight};
	}

	function drawCenterText(text, font, fillStyle){
		let td = getTextDimens(text, font);
		ctx.fillStyle = fillStyle;
	    ctx.fillText(text, (canvas.width/2) - (td.w/2), (canvas.height/2) - (td.h/2));
	}

	function drawGameWinText(){
		clearCtx();
		drawCenterText("YOU WIN, CONGRATS!", "20px Arial", colors.success);
		drawGameStartText();
	}

	function drawGameOverText(){
		clearCtx();
		drawCenterText("GAME OVER!", "20px Arial", colors.danger);
		drawGameStartText();
	}

	function drawGameStartText(){
		let font = "12px Arial";
		let text = 'Click or press enter to start new game.';
		let td = getTextDimens(text, font);
		ctx.fillStyle = colors.light;
	    ctx.fillText(text, (canvas.width/2) - (td.w/2), canvas.height - (td.h));
	}

	function collisionDetection(){
		for(let c = 0; c < brickColumnCount; c ++){
			for(let r = 0; r < brickRowCount; r++){
				let b = bricks[c][r];
				if (b.status == 1){
					if (x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
						dy = -dy;
						b.status = 0;
						score++;

						//win
						if (score == brickRowCount*brickColumnCount){
							stop = true; //*
							drawGameWinText();
							console.log("YOU WIN, CONGRATS!");
						}
					}
				}
			}
		}
	}

	function isEnterKey(e){
		let keycode = (e.keyCode ? e.keyCode : e.which);
        return keycode == '13';
	}

	function keyDownHandler(e){
		if (pause) unPauseGame();
		if (stop && isEnterKey(e)) newGame();
		if (e.key.toLowerCase() == "p") pause = true;
		if (e.key == "Right" || e.key == "ArrowRight"){
	        rightPressed = true;
	    }
	    else if(e.key == "Left" || e.key == "ArrowLeft"){
	        leftPressed = true;
	    }
	}

	function keyUpHandler(e){
	    if (e.key == "Right" || e.key == "ArrowRight"){
	        rightPressed = false;
	    }
	    else if(e.key == "Left" || e.key == "ArrowLeft"){
	        leftPressed = false;
	    }
	}

	function mouseMoveHandler(e){
		let relativeX = e.clientX - canvas.offsetLeft;
		if (relativeX > 0 && relativeX < canvas.width){
			paddleX = relativeX - paddleWidth/2;
		}
	}

	function mouseClickHandler(e){
		if (pause) unPauseGame();
		if (stop) newGame();
	}

	let btn_left = document.getElementById('btn-left');
	if (btn_left){
		btn_left.addEventListener("mousedown", () => leftPressed = true, false);
		btn_left.addEventListener("mouseup", () => leftPressed = false, false);
	}

	let btn_right = document.getElementById('btn-right');
	if (btn_right){
		btn_right.addEventListener("mousedown", () => rightPressed = true, false);
		btn_right.addEventListener("mouseup", () => rightPressed = false, false);
	}

	let btn_reset = document.getElementById('btn-reset');
	if (btn_reset) btn_reset.addEventListener("click", () => setTimeout(newGame, 10), false);

	let btn_pause = document.getElementById('btn-pause');
	if (btn_pause) btn_pause.addEventListener("click", () => {
		setTimeout(() => {
			console.log('pause', pause);
			if (pause){
				pause = 0;
				draw();
			}
			else pause = 1;
		}, 10);
	}, false);

	//event listeners (keys)
	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);
	//document.addEventListener("mousemove", mouseMoveHandler, false);
	document.addEventListener("click", mouseClickHandler, false);

	//draw
	function drawGame(){
		//clear
		clearCtx();
		
		//draw
		drawBricks();
		drawBall();
		drawPaddle();
		drawScore();
		drawLives();
	}

	function draw(){
		drawGame();
		collisionDetection();

		//stop/pause
		if (stop || pause) return;

		//ball has hit x boundaries
		if (x + dx > canvas.width-ballRadius || x + dx < ballRadius){
			dx = -dx;
		}

		//ball has hit y top boundary 
		if (y + dy < ballRadius) {
			dy = -dy;
		}
		else if (y + dy > canvas.height-ballRadius){

			//ball has hit paddle
			if (x > paddleX && x < paddleX + paddleWidth){
				dy = -dy;
			}
			else {
				lives--;
				if (!lives){
					//game over
					stop = true;
					drawGameOverText();
					console.log('GAME OVER!');
				}
				else {
					pause = true;
					resetBall();
					drawGame();
				}
			}
		}

		//stop
		//if (stop) return;
		if (stop || pause) return;

		//move paddle
		if (rightPressed && paddleX < canvas.width-paddleWidth){
			paddleX += 7;
		}
		else if(leftPressed && paddleX > 0){
			paddleX -= 7;
		}

		//update ball pos
		x += dx;
		y += dy;

		//draw
		requestAnimationFrame(draw);
	}

	//start new game
	newGame();

})();