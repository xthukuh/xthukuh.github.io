//convert deg to rad
function deg2rad(deg){
    return deg * Math.PI / 180;
}

//convert rad to deg
function rad2deg(rad){
    return rad * 180 / Math.PI;
}

//circlical number i.e. cnum(420, 360) = 60
function cnum(num, max){
    if (num < max) return num;
    if (num == max) return 0;
    return num - (Math.floor(num/max) * max) || max;
}

//round
function round(num, places){
    num = Number.parseFloat(num);
    if (!isNaN(places) && (places = Math.abs(Number.parseInt(places))) >= 1){
        num = +num.toFixed(places);
    }
    return num;
}

//get number multiples
function getMultiples(n){
	let arr = [1, n], m = Math.floor(Math.sqrt(n));
	for (let i = m; i > 1; i --){
		if ((n % i) == 0){
			let a = n / i;
			arr.push(i, a);
		}
	}
	arr.sort((a, b) => a - b); //sort asc
	return arr;
}