//button clear
let btn_clear = document.getElementById('btn-clear');
btn_clear.addEventListener('click', clearCtx, false);

//button update
let btn_update = document.getElementById('btn-update');
btn_update.addEventListener('click', draw, false);

//button reset
let btn_reset = document.getElementById('btn-reset');
btn_reset.addEventListener('click', reset, false);

//button scale plus
let btn_scale_plus = document.getElementById('btn-scale-plus');
btn_scale_plus.addEventListener('click', () => scaleAdd(getFloatInput('scale_btn_step')), false);

//button scale minus
let btn_scale_minus = document.getElementById('btn-scale-minus');
btn_scale_minus.addEventListener('click', () => scaleAdd(-getFloatInput('scale_btn_step')), false);

//button center
let btn_center = document.getElementById('btn-center');
btn_center.addEventListener('click', centerCanvas, false);

/*
//wheel zoom
canvas.onwheel = function(event){
    event.preventDefault();
    scaleAdd(event.deltaY * -getFloatInput('scale_wheel_step', 0.01));
}
*/