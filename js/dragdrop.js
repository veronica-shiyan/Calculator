let calculator = document.querySelector('.form__wrapper');

calculator.onmousedown = function(event) {
	let shiftX = event.clientX - calculator.getBoundingClientRect().left;
	let shiftY = event.clientY - calculator.getBoundingClientRect().top;

	calculator.style.position = 'absolute';
	calculator.style.zIndex = 1000;
	/*document.body.append(calculator);*/

	moveAt(event.pageX, event.pageY);

	function moveAt(pageX, pageY) {
		calculator.style.left = pageX - shiftX + 'px';
		calculator.style.top = pageY - shiftY + 'px';
	}

	function onMouseMove(event) {
		moveAt(event.pageX, event.pageY);
	}

	document.addEventListener('mousemove', onMouseMove);

	calculator.onmouseup = function() {
		document.removeEventListener('mousemove', onMouseMove);
		calculator.onmouseup = null;
	};
};

calculator.ondragstart = function() {
	return false;
};