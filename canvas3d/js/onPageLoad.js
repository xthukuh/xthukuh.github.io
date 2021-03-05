//run callback on page load
function onPageLoad(callback){
	let ready_fired = false;

	//ready method
	const ready = () => {
		//ignore if already fired
		if (ready_fired) return;
		ready_fired = true;

		//call callback
		if ('function' === typeof callback) callback();
	};

	//if already loaded call ready
	if (document.readyState === 'complete'){
		setTimeout(ready, 1);
		return;
	}

	//register listeners to call ready (document DOMContentLoaded && window load)
	if (document.addEventListener){
		document.addEventListener('DOMContentLoaded', ready, false);
		window.addEventListener('load', ready, false);
	}
	else {
		document.attachEvent('onreadystatechange', () => {
			if (document.readyState === 'complete') ready();
		});
		window.attachEvent('onload', ready);
	}
}