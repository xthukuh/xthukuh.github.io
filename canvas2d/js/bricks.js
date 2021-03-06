//setup bricks
function setupBricks(){
    window.brickWidth = 40;
    window.brickHeight = 10;
    window.brickPadding = 10;
    window.brickOffsetX = 20;
    window.brickOffsetTop = 40;
    let w = brickWidth + brickPadding;
    let b = Math.round(canvas.width/w);
    let bw = (b * w) - brickPadding - (brickOffsetX * 2);
    window.brickColumnCount = Math.round(bw/w);
    window.brickOffsetX = brickPadding + (canvas.width - (brickColumnCount * w) - brickPadding)/2;
    window.brickRowCount = 5;
    window.bricksColor = 'green';
    resetBricks();    
}

//reset bricks
function resetBricks(){
    window.bricks = [];
    for (let c = 0; c < brickColumnCount; c ++){
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r ++){
            bricks[c][r] = {x: 0, y: 0, status: 1, score: 1};
        }
    }
}

//brick collision detection
function brickCollision(){
    let unhit_bricks = 0;
    for (let c = 0; c < brickColumnCount; c ++){
        for (let r = 0; r < brickRowCount; r ++){
            let b = bricks[c][r]; //get brick
            if (b.status != 1) continue; //ignore hit
            unhit_bricks ++; //add unhit

            //if brick is hit
            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                dy = -dy; //ball movement deflect
                b.status = 0; //brick hit
                unhit_bricks --; //remove unhit
                score += b.score; //add brick score
            }
        }
    }

    //check win
    if (!unhit_bricks) gameWin();
}

//draw bricks
function drawBricks(){
    for (let c = 0; c < brickColumnCount; c++){
        for (let r = 0; r < brickRowCount; r++){
            if (!bricks[c][r].status) continue;

            let brickX = (c * (brickWidth + brickPadding)) + brickOffsetX;
            let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;

            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = bricksColor;
            ctx.fill();
            ctx.closePath();
        }
    }
}