//button toggle
const btn_toggle = document.getElementById('btn-toggle');
btn_toggle.addEventListener('click', function(){
	if ('function' === typeof window.animationToggle) animationToggle();
	else console.error('window.animationToggle is undefined!');
}, false);

//button toggle text setter
window.setBtnToggleText = (text) => btn_toggle.innerText = text;