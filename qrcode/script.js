document.addEventListener('DOMContentLoaded', function () {
	// DOM elements
	const dataInput = document.getElementById('data-input');
	dataInput.value = 'https://xthukuh.github.io'; // Demo
	const generateBtn = document.getElementById('generate-btn');
	const clearBtn = document.getElementById('clear-btn');
	const codePreview = document.getElementById('code-preview');
	const codeTypeRadios = document.querySelectorAll('input[name="code-type"]');
	const codePreviewDefaultHTML = codePreview.innerHTML;

	// QR code settings
	const qrSize = document.getElementById('qr-size');
	const qrSizeValue = document.getElementById('qr-size-value');
	const qrMargin = document.getElementById('qr-margin');
	const qrMarginValue = document.getElementById('qr-margin-value');
	const qrColor = document.getElementById('qr-color');
	const qrColorPicker = document.getElementById('qr-color-picker');
	const qrBgColor = document.getElementById('qr-bg-color');
	const qrBgColorPicker = document.getElementById('qr-bg-color-picker');

	// Barcode settings
	const barFormat = document.getElementById('bar-format');
	const barHeight = document.getElementById('bar-height');
	const barHeightValue = document.getElementById('bar-height-value');
	const barWidth = document.getElementById('bar-width');
	const barWidthValue = document.getElementById('bar-width-value');

	// Export buttons
	const exportSvg = document.getElementById('export-svg');
	const exportPng = document.getElementById('export-png');
	const exportJpg = document.getElementById('export-jpg');

	// Update range values display
	qrSize.addEventListener('input', () => {
		qrSizeValue.textContent = qrSize.value;
		generateCode();
	});
	qrMargin.addEventListener('input', () => {
		qrMarginValue.textContent = qrMargin.value;
		generateCode();
	});
	barHeight.addEventListener('input', () => {
		barHeightValue.textContent = barHeight.value;
		generateCode();
	});
	barWidth.addEventListener('input', () => {
		barWidthValue.textContent = barWidth.value;
		generateCode();
	});

	// Color picker synchronization
	qrColorPicker.addEventListener('input', () => {
		qrColor.value = qrColorPicker.value;
	});

	qrColor.addEventListener('input', () => {
		qrColorPicker.value = qrColor.value;
	});

	qrBgColorPicker.addEventListener('input', () => {
		qrBgColor.value = qrBgColorPicker.value;
	});

	qrBgColor.addEventListener('input', () => {
		qrBgColorPicker.value = qrBgColor.value;
	});

	// Generate code function - Debounced
	let timer;
	function generateCode() {
		const delay = 500;
		const _cb = () => {
			timer = undefined;
			doGenerateCode();
		};
		if (timer) {
			clearTimeout(timer);
			timer = setTimeout(_cb, delay);
		} else {
			_cb();
			timer = setTimeout(()=>timer=undefined, delay);
		}
	}
	
	// Generate code function
	function doGenerateCode() {
		const size = Math.max(parseInt(qrSize.value), 100);
		const data = dataInput.value.trim();
		if (!data) {
			const sz = Math.max(size, 200);
			codePreview.innerHTML = codePreviewDefaultHTML;
			codePreview.style.width = sz + 'px';
			codePreview.style.height = sz + 'px';
			return;
		}

		codePreview.style.width = size + 'px';
		codePreview.style.height = size + 'px';

		const isQRCode = document.querySelector('input[name="code-type"]:checked').value === 'qr';
		codePreview.innerHTML = '';

		if (isQRCode) {

			// Generate QR code
			const qrOptions = {
				width: size,
				height: size,
				margin: parseInt(qrMargin.value),
				color: {
					dark: qrColor.value,
					light: qrBgColor.value
				}
			};

			// Create canvas for QR code
			const canvas = document.createElement('canvas');
			codePreview.appendChild(canvas);

			QRCode.toCanvas(canvas, data, qrOptions, function (error) {
				if (error) {
					console.error(error);
					codePreview.innerHTML = '<p class="error-message">Error generating QR code</p>';
				}
			});
		} else {
			// Generate barcode
			const canvas = document.createElement('canvas');
			codePreview.appendChild(canvas);

			try {
				JsBarcode(canvas, data, {
					format: barFormat.value,
					height: parseInt(barHeight.value),
					width: parseFloat(barWidth.value),
					displayValue: true
				});
			} catch (error) {
				console.error(error);
				codePreview.innerHTML = '<p class="error-message">Error generating barcode. Please check your data format.</p>';
			}
		}
	}

	// Clear function
	function clearInput() {
		dataInput.value = '';
		codePreview.innerHTML = '<div class="preview-placeholder"><i class="fas fa-qrcode" style="font-size: 60px; opacity: 0.7; margin-bottom: 15px;"></i><p>Your code will appear here</p></div>';
	}

	// Export functions
	function exportCode(format) {
		if (codePreview.children.length === 0 || codePreview.querySelector('canvas') === null) {
			alert('Please generate a code first');
			return;
		}

		let canvas = codePreview.querySelector('canvas');
		if (!canvas) {
			alert('No code generated to export');
			return;
		}

		let image;
		let filename = 'code';

		if (format === 'svg') {
			// For SVG export, we need to recreate the code as SVG
			alert('SVG export would require additional implementation. For now, please use PNG or JPG.');
			return;
		} else {
			// For PNG/JPG, we can use the canvas
			image = canvas.toDataURL(`image/${format}`);
			filename += `.${format}`;
		}

		// Create download link
		const link = document.createElement('a');
		link.href = image;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	// Event listeners
	generateBtn.addEventListener('click', generateCode);
	clearBtn.addEventListener('click', clearInput);

	exportSvg.addEventListener('click', () => exportCode('svg'));
	exportPng.addEventListener('click', () => exportCode('png'));
	exportJpg.addEventListener('click', () => exportCode('jpeg'));

	// Generate a code on page load with default values
	generateCode();
});