//draw ball
function drawBall(x, y, radius, fill_style){
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fillStyle = fill_style || getInputValue('spiral_index_fill', 'red');
    ctx.fill();
    ctx.closePath();
}

//draw slanted line
function drawLine(x, y, len, slant_angle_deg, stroke_style){
    x = Number.parseFloat(x);
    y = Number.parseFloat(y);
    let x1 = x, y1 = y;
    slant_angle_deg = Number.parseFloat(slant_angle_deg);
    if (slant_angle_deg){
        let n = deg2rad(slant_angle_deg);
        x += Math.cos(n) * len;
        y += Math.sin(n) * len;
    }
    else x += len;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x, y);
    if (stroke_style) ctx.strokeStyle = stroke_style;
    ctx.stroke();
    ctx.closePath();
}

//draw section lines
function drawSectionLines(len){
    let section_stroke = getInputValue('section_stroke').trim();
    let section_mid_stroke = getInputValue('section_mid_stroke').trim();
    if (!section_stroke && !section_mid_stroke) return;
    let sections = getIntInput('sections', 12);
    let section_offset = getFloatInput('section_offset', 0.5);
    let angle_deg = 360/sections;
    let a = angle_deg, b = angle_deg * section_offset;
    for (let i = 1; i <= sections; i ++){
        if (section_mid_stroke) drawLine(center_x, center_y, len, a, section_mid_stroke);
        if (section_stroke) drawLine(center_x, center_y, len, b, section_stroke);
        a += angle_deg;
        b += angle_deg;
    }
}