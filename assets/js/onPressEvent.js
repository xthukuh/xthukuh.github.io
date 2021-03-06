//register mouse/touch press event handlers
function onPressEvent(element, down_callback, up_callback){
	let t, s;

	//check element
	if (!(element && 'function' === typeof element.addEventListener)){
		console.error('Invalid onPressEvent element!', element);
		return;
	}

	//check callbacks
	if (!('function' === typeof down_callback || 'function' === typeof up_callback)){
		console.error('Invalid onPressEvent callbacks!');
		return;
	}

	//press down repeat action
	const repeat = () => {
		t = setTimeout(repeat, s);
		s = s < 50 ? s : s/2; //speed up
		if ('function' === typeof down_callback) down_callback();
	};

	//press down handler
	const down_handler = () => {
		s = 500;
		repeat();
	};
	
	//press release (up) handler
	const up_handler = () => {
		clearTimeout(t);
		if ('function' === typeof up_callback) up_callback();
	};

	//register press down events
	element.addEventListener('mousedown', down_handler, false);
	element.addEventListener('ontouchstart', down_handler, false);

	//register press release (up) events
	element.addEventListener('mouseup', up_handler, false);
	element.addEventListener('ontouchend', up_handler, false);
}