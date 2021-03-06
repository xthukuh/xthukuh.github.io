//buttons
const btn_reset = document.getElementById('reset');
const btn_pause = document.getElementById('pause');
const btn_left = document.getElementById('left');
const btn_right = document.getElementById('right');

//on btn reset
onPressEvent(btn_reset, () => gameReset(1));

//on btn pause
onPressEvent(btn_pause, () => gamePauseToggle());

//left down handler
function leftDownHandler(){
	window.paddleLeft = 1;
	if (status == 1) setTimeout(gameResume); //unpause
}

//left up handler
function leftUpHandler(){
	window.paddleLeft = 0;
}

//right down handler
function rightDownHandler(){
	window.paddleRight = 1;
	if (status == 1) setTimeout(gameResume); //unpause
}

//right up handler
function rightUpHandler(){
	window.paddleRight = 0;
}

//register btn left press
onPressEvent(btn_left, leftDownHandler, leftUpHandler);

//register btn right press
onPressEvent(btn_right, rightDownHandler, rightUpHandler);

//key press listeners
const KEY_ENTER = 13;
const KEY_SPACE = 32;
const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const KEY_A = 65; //left (awsd)
const KEY_D = 100; //right (awsd)

//key down handler
function keyDownHandler(e){
	//get key code
	let code = Number.parseInt(e.keyCode ? e.keyCode : e.which);
	
	//reset/pause/resume
	if ([KEY_ENTER, KEY_SPACE].includes(code)){
		if (status == 0 || status == 1) gamePauseToggle();
		else if (status > 1) gameReset();
		return;
	}

	//left down
	if ([KEY_A, KEY_LEFT].includes(code)) return leftDownHandler();
	
	//right down
	if ([KEY_D, KEY_RIGHT].includes(code)) return rightDownHandler();
}

//key up handler
function keyUpHandler(e){
	//get key code
	let code = Number.parseInt(e.keyCode ? e.keyCode : e.which);

	//left up
	if ([KEY_A, KEY_LEFT].includes(code)) return leftUpHandler();
	
	//right up
	if ([KEY_D, KEY_RIGHT].includes(code)) return rightUpHandler();
}

//register key event handlers
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);