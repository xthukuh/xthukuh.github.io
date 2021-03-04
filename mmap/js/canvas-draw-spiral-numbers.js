//draw numbers spiral
function drawSpiralNumbers(indexes){
    if (!('object' === typeof indexes && indexes && Object.keys(indexes).length)){
        console.error('Invalid spiral indexes!', indexes);
        return;
    }
    let lengths = [], max = Object.keys(indexes).length;
    for (let i = 1; i <= max; i ++){
        if (!indexes.hasOwnProperty(i)){
            console.error('Undefined spiral index!', i, indexes);
            continue;
        }
        let pos = indexes[i];
        lengths.push(pos.radius);
        drawBall(pos.x, pos.y, 2);
        drawSpiralNumberText(String(i), pos.x, pos.y, pos.angle_deg);
    }
    return Math.max(...lengths);
}

//get text dimens
function getTextDimens(text, font){
    if (font) ctx.font = font;
    let metrics = ctx.measureText(text);
    let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
    let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    return {w: metrics.width, h: actualHeight, fh: fontHeight};
}

//draw text from center
function drawSpiralNumberText(text, x, y, angle_deg){
    let rotate_angle_deg = 90 + angle_deg;
    let rotate_angle = deg2rad(rotate_angle_deg);

    let font = '12px Arial';
    let td = getTextDimens(text, font);
    let tw = td.w, th = td.h;
    x -= (tw/2);
    y -= (th/2);
    let tx = x + (tw/2);
    let ty = y + (th/2);

    //ctx save
    ctx.save();

    //matrix transformation
    ctx.translate(tx, ty);
    ctx.rotate(rotate_angle);
    ctx.translate(-tx, -ty);

    //draw text
    ctx.fillStyle = getInputValue('spiral_num_fill', 'blue');
    ctx.fillText(text, x, y);

    //ctx restore
    ctx.restore();
}