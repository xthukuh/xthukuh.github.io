async function drawMappings(indexes){
	if (!('object' === typeof indexes && indexes && Object.keys(indexes).length)){
        console.error('Invalid spiral indexes!', indexes);
        return;
    }

    const keys_arr = (v) => {
    	let arr = Array.isArray(v) ? v : Object.keys(v);
    	arr = arr.map(o => Number.parseInt(o)).filter(o => !isNaN(o)); //int arr
    	arr = Array.from(new Set(arr)); //unique
    	arr.sort((a, b) => a - b); //sort asc
    	return arr;
    };
	
	let numbers_map = keys_arr(getInputValue('numbers_map').trim().split(','));
	if (!numbers_map.length){
		console.error('No numbers in numbers_map!');
		return;
	}

	let numbers = keys_arr(indexes);
	if (!numbers.length){
		console.error('No numbers in indexes!');
		return;
	}

	let map_num = {};
	let num_min = Math.min(numbers_map);
	for (let i = 0; i < numbers.length; i ++){
		let n = numbers[i];
		if (n < num_min) continue;
		let multiples = getMultiples(n);
		numbers_map.forEach(x => {
			if (multiples.includes(x)){
				if (!(map_num.hasOwnProperty(x) && Array.isArray(map_num[x]))) map_num[x] = [];
				if (!map_num[x].includes(n)) map_num[x].push(n);
			}
		});
	}

	let map_num_keys = keys_arr(map_num);
	let numbers_map_stroke = getInputValue('numbers_map_stroke', 'red').split(',').map(o => o.trim());
	let slen = numbers_map_stroke.length;
	for (let i = 0; i < map_num_keys.length; i ++){
		let m = map_num_keys[i];
		let m_arr = keys_arr(map_num[m]);

		ctx.moveTo(center_x, center_y);
    	ctx.beginPath();

		for (let x = 0; x < m_arr.length; x ++){
			let mx = m_arr[x];
			if (!indexes.hasOwnProperty(mx)){
	            console.error('Undefined spiral index! (mapping)', mx, indexes);
	            continue;
	        }
	        let pos = indexes[mx];
	        ctx.lineTo(pos.x, pos.y);
	        ctx.moveTo(pos.x, pos.y);
	        /*
	        let mstroke = numbers_map_stroke[cnum(i, slen)];
	        const mdraw = () => new Promise((resolve) => {
	        	setTimeout(() => {
		        	let pos = indexes[mx];
			        ctx.lineTo(pos.x, pos.y);
			        ctx.moveTo(pos.x, pos.y);

			        ctx.strokeStyle = mstroke;
				    ctx.stroke();
				    ctx.closePath();
				    resolve();
		        }, 100);
	        });
	        await mdraw();
	        */
		}

		//*
		ctx.strokeStyle = numbers_map_stroke[cnum(i, slen)];
	    ctx.stroke();
	    ctx.closePath();
	    //*/
	}
}