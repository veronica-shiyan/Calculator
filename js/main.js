let number_1 = 0;
let number_2 = 0;
let mathOperator;
let operatorSymbols = {
	square: 'sqr',
	root: '\u221A',
	negativeExponent: '1/'
}

const answerField = document.getElementById('answer');
const calculationField = document.getElementById('calculation');
const numberElements = document.querySelectorAll('.button--number');
const resultButton = document.querySelector('.button--result');
const clearButton = document.getElementById('operator-clear');
const deleteButton = document.getElementById('operator-delete');
const unaryMinusButton = document.getElementById('unary-minus');
const decimalSeparatorButton = document.getElementById('decimal-separator');
const standardOperatorButtons = document.querySelectorAll('.button--standard-operator');
const complexOperatorButtons = document.querySelectorAll('.button--complex-operator');
const OPERATORS = {
	PLUS: '+',
	MINUS: '-',
	MULTIPLICATION: '*',
	DIVISION: '/',
	SQUARE: '** 2',
	ROOT: '** 1/2',
	NEGATIVE_EXPONENT: '1/x'
};

// Функция для расчета суммы двух чисел
function getSum(a, b) {
	return a + b;
}

// Функция для расчета разности двух чисел
function getDifference(a, b) {
	return a - b;
}

// Функция для расчета произведения двух чисел
function getProduct(a, b) {
	return a * b;
}

// Функция для расчета результата деления двух чисел (частное и остаток)
function getDivisionResult(a, b) {
	return a / b;
}

// Функция возведения числа в квадрат
function getSquare(a) {
	return a ** 2;
}

// Функция для извлечения квадратного корня из числа
function getSquareRoot(a) {
	return a ** (1/2);
}

// Функция для расчета числа в -1 степени
function getNegativeExponent(a) {
	return 1 / a;
}

// Функция для расчета результата математических операций
function calculateAnswer(a, b, operator) {
	switch (operator) {
		case OPERATORS.PLUS:
			return getSum(a, b);
			break;

		case OPERATORS.MINUS:
			return getDifference(a, b);
			break;

		case OPERATORS.MULTIPLICATION:
			return getProduct(a, b);
			break;

		case OPERATORS.DIVISION:
			return getDivisionResult(a, b);
			break;

		case OPERATORS.SQUARE:
			return getSquare(a);
			break;

		case OPERATORS.ROOT:
			return getSquareRoot(a);
			break;

		case OPERATORS.NEGATIVE_EXPONENT:
			return getNegativeExponent(a);
			break;
	}
}

// Функция для записи в поле ответа
function displayAnswerField(number) {
	answerField.innerText = number.toLocaleString('ru-RU', {maximumFractionDigits: 16});
}

// Функция для записи в поле расчета для простых математических операторов
function displayCalculationField(a, b, operator) {
	calculationField.innerText = `${a} ${operator} ${b} =`;
}

// Функция для записи в поле расчета для унарных математических операторов
function displayCalculationFieldComplex(a, operator) {
	let symbol;

	switch (operator) {
		case OPERATORS.SQUARE:
			symbol = operatorSymbols.square;
			break;

		case OPERATORS.ROOT:
			symbol = operatorSymbols.root;
			break;

		case OPERATORS.NEGATIVE_EXPONENT:
			symbol = operatorSymbols.negativeExponent;
			break;
	}

	calculationField.innerText = `${symbol}( ${a} )`;
}

// Функция очистки, после окончания расчетов
function clearData() {
	number_1 = 0;
	number_2 = 0;
	mathOperator = null;
	calculationField.innerText = '';
	answerField.innerText = 0;
}

// Функция для последовательной обрезки числа справа налево
function cutNumber(number) {
	number = String(number).split('');
	number.pop();
	return number = Number(number.join(''));
}

// Функция удаления числа
function deleteData() {
	if (!calculationField.innerText.includes('=')) {
		if (!mathOperator) {
			if (number_1) {
				number_1 = cutNumber(number_1);
				displayAnswerField(number_1);
			}

		} else {
			if (number_2) {
				number_2 = cutNumber(number_2);
				displayAnswerField(number_2);
			}
		}
	} else {
		number_1 = null;
		number_2 = null;
		mathOperator = null;
		calculationField.innerText = '';
	}
}

// Функция для смены знака числа на противоположный
function changeSign() {
	if (!mathOperator) {
		if (number_1) {
			number_1 = - number_1;
			displayAnswerField(number_1);
		}
	} else {
		if (number_2) {
			number_2 = - number_2;
			displayAnswerField(number_2);
		}
	}
}

// Получение двух чисел для вычисления
numberElements.forEach(function(numEl) {
	numEl.addEventListener('click', function(e) {
		if (!isNaN(Number(e.target.innerText))) {
			if (!mathOperator) {
				if (!number_1) {
					number_1 = Number(e.target.innerText);
					displayAnswerField(number_1);
				} else {
					number_1 = Number(number_1 + e.target.innerText);
					displayAnswerField(number_1);
				}
				
			} else {
				if (!number_2) {
					number_2 = Number(e.target.innerText);
					displayAnswerField(number_2)
				} else {
					number_2 = Number(number_2 + e.target.innerText);
					displayAnswerField(number_2);
				}
			}
		} 
	});
});

// Получение чисел в форме десятичных дробей
function getDecimal() {
	if (!mathOperator) {
		if (!number_1) {
			number_1 = '0.';
			displayAnswerField(number_1);
		} else if (!String(number_1).includes('.')) {
			number_1 = `${number_1}.`;
			displayAnswerField(number_1);
		}
	} else {
		if (!number_2) {
			number_2 = '0.';
			displayAnswerField(number_2);
		} else if (!String(number_2).includes('.')) {
			number_2 = `${number_2}.`;
			displayAnswerField(number_2);
		}
	}
}

// Получение значения простого математического оператора
standardOperatorButtons.forEach(function(operBut) {
	operBut.addEventListener('click', function(e) {
		mathOperator = e.target;
		calculationField.innerText = `${number_1} ${mathOperator.innerText}`;
	});
});

// Получение значения унарного математического оператора
complexOperatorButtons.forEach(function(operBut) {
	operBut.addEventListener('click', function(e) {
		mathOperator = e.target;
		const answer = calculateAnswer(number_1, null, mathOperator.dataset.operator);
		displayCalculationFieldComplex(number_1, mathOperator.dataset.operator);
		displayAnswerField(answer);
	});
});

resultButton.addEventListener('click', function () {
	const answer = calculateAnswer(number_1, number_2, mathOperator.dataset.operator);
	displayCalculationField(number_1, number_2, mathOperator.innerText);
	displayAnswerField(answer);
	number_1 = answer;
	number_2 = 0;
	mathOperator = null;
});
clearButton.addEventListener('click', clearData);
deleteButton.addEventListener('click', deleteData);
unaryMinusButton.addEventListener('click', changeSign);
decimalSeparatorButton.addEventListener('click', getDecimal);