//lab
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let center_x = canvas.width / 2;
let center_y = canvas.height / 2;

//button clear
let btn_clear = document.getElementById('btn-clear');
btn_clear.addEventListener("click", clearCtx, false);

//button update
let btn_update = document.getElementById('btn-update');
btn_update.addEventListener("click", draw, false);

//input values
let input_values = [
    ['spiral_a', 5],
    ['spiral_b', 5],
    ['spiral_max_steps', 500],
    ['spiral_stroke', 'black'],
    ['spiral_space', 15],
    ['spiral_sections', 12],
    ['spiral_num_max', 12 * 4],
    ['spiral_num_fill', 'blue'],
    ['spiral_index_fill', 'red'],
    ['section_offset', 0.5],
    ['section_stroke', '#ddd'],
    ['section_length', canvas.width],
];
input_values.forEach(a => setInputValue(...a));

//round
function round(num, places){
    num = Number.parseFloat(num);
    if (!isNaN(places) && (places = Math.abs(Number.parseInt(places))) >= 1){
        num = +num.toFixed(places);
    }
    return num;
}

//set input value
function setInputValue(id, value){
    let input = document.getElementById(id);
    if (!input){
        let input_wrapper = document.getElementById('inputs-wrapper');
        if (!input_wrapper) throw 'Inputs wrapper is undefined!';
        let div = document.createElement('div');
        div.className = 'input-group';
        div.innerHTML = `<label>${id}:</label><input type="text" id="${id}">`;
        input_wrapper.appendChild(div);
    }
    input = document.getElementById(id);
    if (!input) throw `Input error! (${id})`;
    input.value = String(value);
    return value;
}

//get input value
function getInputValue(id){
    let input = document.getElementById(id);
    if (input) return input.value;
}

//get input value (int)
function getIntInput(id, _default=0){
    let value = getInputValue(id);
    if (isNaN(value)) return _default;
    return Number.parseInt(value);
}

//get input value (float)
function getFloatInput(id, _default=0){
    let value = getInputValue(id);
    if (isNaN(value)) return _default;
    return Number.parseFloat(value);
}

//clear canvas
function clearCtx(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//draw ball
function drawBall(x, y, radius, fill_style){
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fillStyle = fill_style || getInputValue('spiral_index_fill', 'red');
    ctx.fill();
    ctx.closePath();
}

//draw spiral
function drawSpiral(){
    let a = getIntInput('spiral_a', 5);
    let b = getIntInput('spiral_b', 5);
    let spiral_max_steps = getIntInput('spiral_max_steps', 500);
    let spiral_sections = getIntInput('spiral_sections', 12);
    let spiral_space = getFloatInput('spiral_space', 15);
    let spiral_num_max = getIntInput('spiral_num_max', 12 * 4);

    let section_angle_deg = 360/spiral_sections;
    let spiral_indexes = {};
    let buffer_angle_deg = 0;
    let buffer_number = 1;
    
    let cx = center_x, cy = center_y;

    ctx.moveTo(cx, cy);
    ctx.beginPath();

    for (let i = 0; i < spiral_max_steps; i ++){

        let angle = 0.1 * i;
        let x = cx + (a + b * angle) * Math.cos(angle);
        let y = cy + (a + b * angle) * Math.sin(angle);
        ctx.lineTo(x, y);

        let angle_deg = rad2deg(angle);
        if (angle_deg >= buffer_angle_deg && buffer_number <= spiral_num_max){
            let n = deg2rad(buffer_angle_deg);
            let xa = (a + b * n) * Math.cos(n);
            let xb = (a + b * n) * Math.sin(n);
            let xc = Math.sqrt((xa ** 2) + (xb ** 2)) + spiral_space;

            let x1 = cx + Math.cos(n) * xc;
            let y1 = cy + Math.sin(n) * xc;


            let x2 = cx + Math.cos(n + deg2rad(360)) * xc;
            let y2 = cy + Math.sin(n + deg2rad(360)) * xc;
            let dx = x2 - x1;
            let dy = y2 - y2;
            x1 += dx/2
            y1 += 
            spiral_indexes[buffer_number] = {x: x1, y: y1, angle_deg: buffer_angle_deg};
            buffer_angle_deg += section_angle_deg;
            buffer_number += 1;
        }
    }

    ctx.strokeStyle = getInputValue('spiral_stroke', 'black');
    ctx.stroke();
    ctx.closePath();

    return spiral_indexes;
}

//draw numbers spiral
function drawSpiralNumbers(indexes){
    if (!('object' === typeof indexes && indexes && Object.keys(indexes).length)){
        console.log('Invalid spiral indexes!', indexes);
        return;
    }
    let spiral_num_max = getIntInput('spiral_num_max', 12 * 4);
    for (let i = 1; i <= spiral_num_max; i ++){
        if (!indexes.hasOwnProperty(i)){
            console.error('Undefined spiral index!', i, indexes);
            continue;
        }
        let pos = indexes[i];
        drawBall(pos.x, pos.y, 2);
        drawLine(center_x, center_y, getFloatInput('section_length', canvas.width), pos.angle_deg, '#eee');
        drawSpiralNumberText(String(i), pos.x, pos.y, pos.angle_deg);
    }
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

//convert deg to rad
function deg2rad(deg){
    return deg * Math.PI / 180;
}

//convert rad to deg
function rad2deg(rad){
    return rad * 180 / Math.PI;
}

//draw slanted line
function drawLine(x, y, len, slant_angle_deg, stroke_style){
    x = Number.parseFloat(x);
    y = Number.parseFloat(y);
    let x1 = x, y1 = y;
    len = Number.parseFloat(len) || getFloatInput('section_length', canvas.width);
    slant_angle_deg = Number.parseFloat(slant_angle_deg);
    stroke_style = stroke_style || getInputValue('section_stroke', '#ddd');
    if (slant_angle_deg){
        let n = deg2rad(slant_angle_deg);
        x += Math.cos(n) * len;
        y += Math.sin(n) * len;
    }
    else x += len;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x, y);
    ctx.strokeStyle = stroke_style;
    ctx.stroke();
    ctx.closePath();
}

//draw section lines
function drawSectionLines(){
    let spiral_sections = getIntInput('spiral_sections', 12);
    let section_offset = getFloatInput('section_offset', 0.5);
    let section_length = getFloatInput('section_length', canvas.width);
    let slant_angle_deg = 360/spiral_sections;
    let angle_deg = slant_angle_deg * section_offset;
    let x = center_x, y = center_y;
    for (let i = 1; i <= spiral_sections; i ++){
        drawLine(x, y, section_length, angle_deg);
        angle_deg += slant_angle_deg;
    }
}

//get text dimens
function getTextDimens(text, font){
    if (font) ctx.font = font;
    let metrics = ctx.measureText(text);
    let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
    let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    return {w: metrics.width, h: actualHeight, fh: fontHeight};
}

//circlical number i.e. cnum(420, 360) = 60
function cnum(num, max){
    if (num <= max) return num;
    return num - (Math.floor(num/max) * max) || max;
}

//canvas draw
function draw(){
    clearCtx();
    let indexes = drawSpiral();
    drawSpiralNumbers(indexes);
    drawSectionLines();
}

//init draw
draw();

