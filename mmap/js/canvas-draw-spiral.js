//draw spiral
function drawSpiral(){
    let a = getIntInput('spiral_a', 5);
    let b = getIntInput('spiral_b', 5);
    let sections = getIntInput('sections', 12);
    let numbers_max = getIntInput('numbers_max', 12 * 4);

    let section_angle_deg = 360/sections;
    let spiral_indexes = {};
    let buffer_angle_deg = 0;
    let buffer_number = 1;
    
    let cx = center_x, cy = center_y;
    
    ctx.moveTo(cx, cy);
    ctx.beginPath();

    let i = -1, maxed = 0;
    while (1){
        i ++;

        //draw spiral line
        let angle = 0.1 * i;
        let x = cx + (a + b * angle) * Math.cos(angle);
        let y = cy + (a + b * angle) * Math.sin(angle);
        ctx.lineTo(x, y);

        let angle_deg = rad2deg(angle);

        //maxed break
        if (maxed && angle_deg >= maxed) break;
        if (maxed) continue; //no indexes after maxed

        //set indexes
        if (angle_deg >= buffer_angle_deg){
            let n = deg2rad(buffer_angle_deg); //get spiral section angle[1]
            let xa = (a + b * n) * Math.cos(n); //adjacent (x)[1]
            let xb = (a + b * n) * Math.sin(n); //opposite (y)[1]
            let xc = Math.sqrt((xa ** 2) + (xb ** 2)); //hypotenuse[1]

            let n2 = n + deg2rad(360); //get upper spiral section angle (n + 360)[2]
            let xa2 = (a + b * n2) * Math.cos(n2); //adjacent (x)[2]
            let xb2 = (a + b * n2) * Math.sin(n2); //opposite (y)[2]
            let xc2 = Math.sqrt((xa2 ** 2) + (xb2 ** 2)); //hypotenuse[2]

            let d = xc2 - xc; //get hypotenuse difference
            let c = xc + (d/2); //get midpoint between hypotenuse[1] and upper hypotenuse[2]

            let x1 = cx + Math.cos(n) * c; //calculate adjacent (x) using hypotenuse midpoint (adding center_x)
            let y1 = cy + Math.sin(n) * c; //calculate opposite (y) using hypotenuse midpoint (adding center_y)
            
            //buffer update
            spiral_indexes[buffer_number] = {x: x1, y: y1, angle_deg: buffer_angle_deg, radius: xc2};
            buffer_angle_deg += section_angle_deg;
            buffer_number += 1;
        }

        //max steps - set maxed
        if (buffer_number > numbers_max) maxed = angle_deg + 360;
    }

    ctx.strokeStyle = getInputValue('spiral_stroke', 'black');
    ctx.stroke();
    ctx.closePath();

    //return
    return spiral_indexes;
}