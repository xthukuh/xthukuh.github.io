//canvas draw
function draw(redraw){
    let scale = getFloatInput('scale', 1);
    let rotate = getFloatInput('rotate', -60);
    let width = getFloatInput('width', 500);
    let height = getFloatInput('height', 500);

    canvas.width = width;
    canvas.height = height;
    center_x = canvas.width / 2;
    center_y = canvas.height / 2;

    clearCtx();

    ctx.save();
    ctx.translate(center_x, center_y);
    ctx.scale(scale, scale);
    ctx.rotate(deg2rad(rotate));
    ctx.translate(-center_x, -center_y);

    number_indexes = drawSpiral();
    let len = drawSpiralNumbers(number_indexes);
    drawSectionLines(len);
    drawMappings(number_indexes);

    let d = Math.ceil(len * 2) + 20;
    if (!redraw && d > 500 && canvas.width != d){
        setInputValue('width', d);
        setInputValue('height', d);
        draw(1);
    }

    ctx.restore();
    centerCanvas();
}