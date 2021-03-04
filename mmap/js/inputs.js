//input values
let input_values = [
    ['numbers_max', 144],
    ['numbers_map', '2,3,4'],
    ['numbers_map_stroke', 'green,red,blue'],
    ['height', 500],
    ['width', 500],
    ['sections', 12],
    ['section_offset', 0.5],
    ['scale', 0.75],
    ['rotate', -60],
    ['spiral_a', 5],
    ['spiral_b', 5],
    ['spiral_stroke', '#ddd'],
    ['spiral_num_fill', '#888'],
    ['spiral_index_fill', 'black'],
    ['map_stroke', '#eee'],
    ['map_select_stroke', 'green'],
    ['section_stroke', '#ddd'],
    ['section_mid_stroke', ''],
    ['scale_btn_step', 0.05],
    ['scale_wheel_step', 0.01],
];

function reset(){
    input_values.forEach(a => setInputValue(...a));
    draw();
}

//set input value
function setInputValue(id, value, readonly){
    let input = document.getElementById(id);
    if (!input){
        let input_wrapper = document.getElementById('inputs-wrapper');
        if (!input_wrapper) throw 'Inputs wrapper is undefined!';
        let div = document.createElement('div');
        div.className = 'input-group';
        div.innerHTML = `<label>${id}:</label><input type="text" id="${id}"${readonly ? ' readonly' : ''}>`;
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

//scale add
function scaleAdd(n){
    setInputValue('scale', round(getFloatInput('scale', 1) + n, 2));
    draw();
}