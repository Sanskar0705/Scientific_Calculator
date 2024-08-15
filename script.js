document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.btn');
    const display = document.getElementById('display');
    const historyList = document.getElementById('history-list');
    let currentInput = '';
    let history = [];
    let currentFunction = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.innerText;

            if (buttonText === 'C') {
                currentInput = '';
                display.value = '';
                currentFunction = '';
            } else if (buttonText === '=') {
                try {
                    // Handle statistical functions
                    if (currentFunction === 'Mean' || currentFunction === 'Median' || currentFunction === 'Mode') {
                        handleStatisticalFunction(currentFunction);
                    } else if (currentFunction) {
                        // Handle trigonometric and logarithmic functions
                        let argument = currentInput.slice(currentFunction.length + 1, -1);
                        let result;
                        switch (currentFunction) {
                            case 'sin':
                                result = Math.sin(parseFloat(argument));
                                break;
                            case 'cos':
                                result = Math.cos(parseFloat(argument));
                                break;
                            case 'tan':
                                result = Math.tan(parseFloat(argument));
                                break;
                            case 'log':
                                result = Math.log10(parseFloat(argument));
                                break;
                            case 'sqrt':
                                result = Math.sqrt(parseFloat(argument));
                                break;
                        }
                        addToHistory(`${currentFunction}(${argument}) = ${result}`);
                        display.value = result;
                        currentInput = result.toString();
                        currentFunction = '';
                    } else {
                        // Regular evaluation
                        let result = eval(currentInput);
                        addToHistory(`${currentInput} = ${result}`);
                        display.value = result;
                        currentInput = result.toString();
                    }
                } catch (error) {
                    display.value = 'Error';
                }
            } else if (['sin', 'cos', 'tan', 'log', 'sqrt'].includes(buttonText)) {
                currentFunction = buttonText;
                currentInput = `${currentFunction}(`;
                display.value = currentInput;
            } else if (buttonText === ',') {
                currentInput += ',';
                display.value += ',';
            } else if (buttonText === '(' || buttonText === ')') {
                currentInput += buttonText;
                display.value += buttonText;
            } else if (buttonText === 'Mean' || buttonText === 'Median' || buttonText === 'Mode') {
                currentFunction = buttonText;
                currentInput = `${currentFunction}(`;
                display.value = currentInput;
            } else {
                currentInput += buttonText;
                display.value += buttonText;
            }
        });
    });

    function handleStatisticalFunction(statFunction) {
        let numbers = currentInput.slice(statFunction.length + 1, -1).split(',').map(Number);
        let result;
        switch (statFunction) {
            case 'Mean':
                result = calculateMean(numbers);
                break;
            case 'Median':
                result = calculateMedian(numbers);
                break;
            case 'Mode':
                result = calculateMode(numbers);
                break;
        }
        addToHistory(`${statFunction}(${numbers.join(', ')}) = ${result}`);
        display.value = `${statFunction}: ${result}`;
        currentInput = '';
        currentFunction = '';
    }

    function addToHistory(entry) {
        let historyItem = document.createElement('li');
        let calculation = document.createElement('span');
        let deleteButton = document.createElement('button');
        
        calculation.innerHTML = entry;
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.addEventListener('click', function() {
            historyItem.remove();
        });

        historyItem.appendChild(calculation);
        historyItem.appendChild(deleteButton);
        historyList.appendChild(historyItem);
        history.push(entry);

        if (history.length > 50) {
            history.shift();
            historyList.removeChild(historyList.firstChild);
        }
    }

    function calculateMean(numbers) {
        const sum = numbers.reduce((a, b) => a + b, 0);
        return (sum / numbers.length).toFixed(2);
    }

    function calculateMedian(numbers) {
        numbers.sort((a, b) => a - b);
        const mid = Math.floor(numbers.length / 2);
        if (numbers.length % 2 === 0) {
            return ((numbers[mid - 1] + numbers[mid]) / 2).toFixed(2);
        } else {
            return numbers[mid].toFixed(2);
        }
    }

    function calculateMode(numbers) {
        const frequency = {};
        let maxFreq = 0;
        let mode = [];
        numbers.forEach(num => {
            frequency[num] = (frequency[num] || 0) + 1;
            if (frequency[num] > maxFreq) {
                maxFreq = frequency[num];
                mode = [num];
            } else if (frequency[num] === maxFreq) {
                mode.push(num);
            }
        });
        if (mode.length === numbers.length) return 'No mode';
        return mode.join(', ');
    }
});
