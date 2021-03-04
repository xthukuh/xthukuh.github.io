//canvas
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

let center_x = canvas.width / 2;
let center_y = canvas.height / 2;
let number_indexes = {};

//center canvas
function centerCanvas(){
    let p = canvas.parentNode;
    p.scrollTop = p.scrollTopMax/2;
    p.scrollLeft = p.scrollLeftMax/2;
}

//clear canvas
function clearCtx(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}