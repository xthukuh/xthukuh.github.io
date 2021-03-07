//register mouse/touch press event handlers
function onPressEvent(element, down_callback, up_callback){
	let t, s, d;

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
		element.classList.add('active');
		d = 1;
		s = 500;
		repeat();
	};
	
	//press release (up) handler
	const up_handler = () => {
		element.classList.remove('active');
		d = 0;
		clearTimeout(t);
		if ('function' === typeof up_callback) up_callback();
	};

	//elem no select
	element.unselectable = 'on';
	element.onselectstart = () => false;

	//mouse events
	element.addEventListener('mousedown', () => {
		if (!d) down_handler();
		return false;
	}, false);
	element.addEventListener('mouseup', () => {
		if (d) up_handler();
	}, false);

	//touch events
	element.addEventListener('touchstart', (e) => {
		e.preventDefault();
		if (!d) down_handler();
	}, false);
	element.addEventListener('touchend', (e) => {
		e.preventDefault();
		if (d) up_handler();
	}, false);
	element.addEventListener('touchmove', (e) => {
		e.preventDefault();
		let touch = e.touches[0];
		let elem = document.elementFromPoint(touch.pageX, touch.pageY);
		if (elem != element && d) up_handler();
		else if (elem == element && !d) down_handler();
	}, false);

	//key events - keydown [enter, space]
	element.addEventListener('keydown', (e) => {
		if ([13, 32].includes(Number.parseInt(e.keyCode ? e.keyCode : e.which))){
			e.preventDefault();
			e.stopPropagation();
			if (!d) down_handler();
		}
	}, false);

	//key events - keyup [enter, space]
	element.addEventListener('keyup', (e) => {
		if ([13, 32].includes(Number.parseInt(e.keyCode ? e.keyCode : e.which))){
			e.preventDefault();
			e.stopPropagation();
			if (d) up_handler();
		}
	}, false);
}

