const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const clickSound = document.getElementById('clickSound');

let currentInput = '';
let previousOperator = null;
let previousOperand = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        clickSound.play(); // Play click sound on button press
        const value = button.dataset.number || button.dataset.operator || button.dataset.clear || button.dataset.equal;

        if (value === '=') {
            calculate();
        } else if (value === 'C') {
            clearDisplay();
        } else {
            handleInput(value);
        }
    });
});

function handleInput(value) {
    if (value === '.' && currentInput.includes('.')) return;

    currentInput += value;
    display.textContent = currentInput;
}

function calculate() {
    const currentOperand = parseFloat(currentInput);
    let result;

    if (previousOperator === '+') {
        result = previousOperand + currentOperand;
    } else if (previousOperator === '-') {
        result = previousOperand - currentOperand;
    } else if (previousOperator === '*') {
        result = previousOperand * currentOperand;
    } else if (previousOperator === '/') {
        if (currentOperand === 0) {
            display.textContent = 'Error';
            return;
        }
        result = previousOperand / currentOperand;
    } else {
        result = currentOperand;
    }

    display.textContent = result;
    currentInput = result.toString();
    previousOperand = result;
    previousOperator = null;
}

function clearDisplay() {
    currentInput = '';
    previousOperator = null;
    previousOperand = null;
    display.textContent = '0';
}