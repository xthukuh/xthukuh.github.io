function initBuffers(gl){
	//create a buffer for the cube's vertex positions
	const positionBuffer = gl.createBuffer();

	//select the positionBuffer as the one to apply buffer
	//operations to from here out
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	
	//array of positions for the cube
	const positions = [
		//front face
		-1.0, -1.0,  1.0,
		 1.0, -1.0,  1.0,
		 1.0,  1.0,  1.0,
		-1.0,  1.0,  1.0,

		//back face
		-1.0, -1.0, -1.0,
		-1.0,  1.0, -1.0,
		 1.0,  1.0, -1.0,
		 1.0, -1.0, -1.0,

		//top face
		-1.0,  1.0, -1.0,
		-1.0,  1.0,  1.0,
		 1.0,  1.0,  1.0,
		 1.0,  1.0, -1.0,

		//bottom face
		-1.0, -1.0, -1.0,
		 1.0, -1.0, -1.0,
		 1.0, -1.0,  1.0,
		-1.0, -1.0,  1.0,

		//right face
		 1.0, -1.0, -1.0,
		 1.0,  1.0, -1.0,
		 1.0,  1.0,  1.0,
		 1.0, -1.0,  1.0,

		//left face
		-1.0, -1.0, -1.0,
		-1.0, -1.0,  1.0,
		-1.0,  1.0,  1.0,
		-1.0,  1.0, -1.0,
	];

	//pass the list of positions into WebGL to build the
	//shape. We do this by creating a Float32Array from the
	//JavaScript array, then use it to fill the current buffer.
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

	//faces color
	const faceColors = [
		[1.0,  1.0,  1.0,  1.0], //front face: white
		[1.0,  0.0,  0.0,  1.0], //back face: red
		[0.0,  1.0,  0.0,  1.0], //top face: green
		[0.0,  0.0,  1.0,  1.0], //bottom face: blue
		[1.0,  1.0,  0.0,  1.0], //right face: yellow
		[1.0,  0.0,  1.0,  1.0], //left face: purple
	];

	//convert the array of colors into a table for all the vertices.
	let colors = [];
	for (let i = 0; i < faceColors.length; i ++){
		const c = faceColors[i];

		//repeat each color four times for the four vertices of the face
		colors = colors.concat(c, c, c, c);
	}

	//color buffer
	const colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

	//build the element array buffer; this specifies the indices
	//into the vertex arrays for each face's vertices.
	const indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

	//this array defines each face as two triangles, using the
	//indices into the vertex array to specify each triangle's
	//position.
	const indices = [
		0,  1,  2,     0,  2,  3,  // front
		4,  5,  6,     4,  6,  7,  // back
		8,  9,  10,    8,  10, 11, // top
		12, 13, 14,    12, 14, 15, // bottom
		16, 17, 18,    16, 18, 19, // right
		20, 21, 22,    20, 22, 23, // left
	];

	//send the element array to GL
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	
	return {
		position: positionBuffer,
		color: colorBuffer,
		indices: indexBuffer,
	};
}