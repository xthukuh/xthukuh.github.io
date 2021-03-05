function main(){
	//cube rotation
	window.cubeRotation = 0.0;

	//canvas
	const canvas = document.querySelector('#canvas');
	window.canvas = canvas;
	
	//canvas webgl
	const gl = canvas.getContext('webgl');
	window.gl = gl;

	//check webgl support
	if (!gl){
		console.error('WebGL not supported!');
		return;
	}

	//vertex shader program
	const vsSource = `
		attribute vec4 aVertexPosition;
		attribute vec4 aVertexColor;

		uniform mat4 uModelViewMatrix;
		uniform mat4 uProjectionMatrix;

		varying lowp vec4 vColor;

		void main(void){
			gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
			vColor = aVertexColor;
		}
	`;

	//fragment shader program
	const fsSource = `
		varying lowp vec4 vColor;

		void main(void){
			gl_FragColor = vColor;
		}
	`;

	//init shader program
	const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

	//program info
	const programInfo = {
		program: shaderProgram,
		attribLocations: {
			vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
			vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
		},
		uniformLocations: {
			projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
			modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
		}
	};

	//build buffers
	const buffers = initBuffers(gl);

	//animation stop
	window.animation_stop = 0;
	window.animating = 0;
	const animationRunningState = (stopped, ...debug) => {
		window.animating = stopped ? 0 : 1;
		if ('function' === typeof window.setBtnToggleText) setBtnToggleText(`${stopped ? 'Start' : 'Stop'} Animation`);
	};

	//animation duration timeout
	//let d = 0, d_max = 30;
	
	//draw scene repeatedly
	let then = 0;
	function render(now){
		//set animating state
		if (!animating) animationRunningState();

		//animation frame time (now) to seconds
		now *= 0.001;
		const deltaTime = now - then;

		//animation check stop
		if (animation_stop) return animationRunningState(1);
		/*
		//animation duration timeout check
		d += then ? deltaTime : 0;
		if (d >= d_max) return animationRunningState(1);
		*/

		then = now;
		drawScene(gl, programInfo, buffers, deltaTime);
		requestAnimationFrame(render); //next animation frame
	}

	//animation toggle
	window.animationToggle = (start) => {
		if (start || !animating){
			window.animation_stop = 0;
			if (animating) return; //ignore if already animating
			requestAnimationFrame(render); //start animation frame
		}
		else window.animation_stop = 1;
	};

	//start animation frame
	animationToggle(1);
}

//init main
onPageLoad(main);