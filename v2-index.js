const calculator = {
    displayValue: '',
    history: [],
};

function inputDigit(digit) {
    //remove the current input incase of error
    if (calculator.displayValue === 'Error' || calculator.displayValue == "NaN") {
        resetCalculator();
    }
    calculator.displayValue += digit;
}

function handleOperator(nextOperator) {
    //remove the current input incase of error
    if (calculator.displayValue === 'Error' || calculator.displayValue == "NaN") {
        resetCalculator();
    }

    if (nextOperator === 'C') {
        resetCalculator();
        updateDisplay();
        return;
    }

    if (nextOperator === 'backspace') {
        calculator.displayValue = calculator.displayValue.slice(0, -1);
        updateDisplay();
        return;
    }

    if (nextOperator === '=') {
        try {
            const result = eval(calculator.displayValue).toString();
            console.log(result)
            if (typeof(result) === 'undefined' || result.includes("Error")) { //fix function error
                calculator.displayValue = 'Error'
            } else {
                const timestamp = new Date().toLocaleTimeString();
                calculator.history.push(`${calculator.displayValue} = ${result} <span class="time">${timestamp}</span> <button onclick="copyToCalculator('${calculator.displayValue}')">Kopieren</button>`);
                calculator.displayValue = result;
                updateHistory();
                animateResult();
            }
        } catch (e) {
            calculator.displayValue = 'Error' //display: Error!
        }
        updateDisplay();
        return;
    }

    if (nextOperator === 'sqrt') {
        calculator.displayValue = Math.sqrt(eval(calculator.displayValue)).toString();
        updateDisplay();
        return;
    }

    if (nextOperator === '^2') {
        calculator.displayValue = Math.pow(eval(calculator.displayValue), 2).toString();
        updateDisplay();
        return;
    }

    calculator.displayValue += nextOperator;
    updateDisplay();
}

function resetCalculator() {
    calculator.displayValue = '';
}

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    calculator.history.forEach(entry => {
        const li = document.createElement('li');
        li.innerHTML = entry;
        historyList.appendChild(li);
    });
}

function animateResult() {
    const display = document.querySelector('.calculator-screen');
    display.classList.add('animate');
    setTimeout(() => {
        display.classList.remove('animate');
    }, 1000);
}

function copyToCalculator(entry) {
    calculator.displayValue = entry;
    updateDisplay();
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        return;
    }

    inputDigit(target.value);
    updateDisplay();
});

document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    const icon = this.querySelector('i');
    if (document.body.classList.contains('light-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});
