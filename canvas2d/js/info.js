//setup info
function setupInfo(){
	window.infoFont = '16px Arial';
	window.infoColor = '#0095DD';
	window.infoOffsetTop = 20;
	window.infoOffsetX = 8;
	
	window.score = 0;
	window.life = 3;
	window.start = 0;
	window.status = 1; //0=playing,1=pause,2=won,3=lost

	window.infoWinFont = '20px Arial';
	window.infoWinText = 'YOU WIN, CONGRATS!';
	window.infoWinColor = '#579F37';

	window.infoWinScoreY = 40;
	window.infoWinScoreColor = 'black';
	window.infoWinScoreFont = '16px Arial';
	
	window.infoLossFont = '20px Arial';
	window.infoLossText = 'GAME OVER!';
	window.infoLossColor = '#FF6464';
}

//draw score
function drawScore(){
	ctx.font = infoFont;
    ctx.fillStyle = infoColor;
    ctx.fillText(`Score: ${score}`, infoOffsetX, infoOffsetTop);
}

//draw life
function drawLife(){
    let text = `Life: ${life}`;
    let td = getTextDimens(text, infoFont);
    ctx.fillStyle = infoColor;
    ctx.fillText(text, canvas.width - (td.w + infoOffsetX), infoOffsetTop);
}

//draw win
function drawWin(){
	let td = getTextDimens(infoWinText, infoWinFont);
	let tx = (canvas.width/2) - (td.w/2);
	let ty = (canvas.height/2) - (td.h/2);
	ctx.fillStyle = infoWinColor;
	ctx.fillText(infoWinText, tx, ty);
}

//draw win score
function drawWinScore(){
    let text = `Score: ${score}`;
    let td = getTextDimens(text, infoWinScoreFont);
    let tx = canvas.width/2 - td.w/2;
    let ty = canvas.height/2 - td.h/2 - infoWinScoreY;
    ctx.fillStyle = infoWinScoreColor;
    ctx.fillText(text, tx, ty);
}

//draw loss
function drawLoss(){
	let td = getTextDimens(infoLossText, infoLossFont);
	let tx = (canvas.width/2) - (td.w/2);
	let ty = (canvas.height/2) - (td.h/2);
	ctx.fillStyle = infoLossColor;
	ctx.fillText(infoLossText, tx, ty);
}

//get text dimens
function getTextDimens(text, font){
	if (font) ctx.font = font;
	let metrics = ctx.measureText(text);
	let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
	let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
	return {w: metrics.width, h: actualHeight, fh: fontHeight};
}