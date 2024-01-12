let history = [];
let currentInput = '';

function inputValue(value) {
    let display = document.getElementById('output-value');
    currentInput += value;
    display.innerText = currentInput;
}

function clearDisplay() {
    currentInput = '';
    document.getElementById('output-value').innerText = '0';
    document.getElementById('history-value').innerText = '';
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        clearDisplay();
    } else {
        document.getElementById('output-value').innerText = currentInput;
    }
}


function calculate() {
    try {
        let outputValue = currentInput;

        // Here i have Replaced standalone percentages e.g. "50%" with "0.50" for direct percentage input
        outputValue = outputValue.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)');

	    outputValue = outputValue.replace(/^(\d+(\.\d+)?)%$/g, '($1/100)');

        // To Handle subtracting percentages, e.g. "12-50%" becomes "12-(12*0.50)"
        outputValue = outputValue.replace(/(\d+)-(\d+(\.\d+)?)%/g, '$1-($1*$2/100)');

        // For Handling adding percentages, e.g. "12+50%" becomes "12+(12*0.50)"
        outputValue = outputValue.replace(/(\d+)\+(\d+(\.\d+)?)%/g, '$1+($1*$2/100)');

        let result = new Function('return ' + outputValue)();
        if (!Number.isFinite(result)) {
            throw new Error('Invalid calculation');
        }

        result = formatResult(result);
        document.getElementById('output-value').innerText = result;
        document.getElementById('history-value').innerText = '';
        updateHistory(currentInput + ' = ' + result);
        currentInput = result.toString();
    } catch (e) {
        displayError();
    }
}

function applySquareRoot() {
    let displayValue = document.getElementById('output-value').innerText;

  
    let lastNumberRegex = /(\d+(\.\d+)?)$/;
    let match = displayValue.match(lastNumberRegex);

    if (match) {
        let number = match[0];
        let squareRoot = Math.sqrt(number).toString();

        let updatedValue = displayValue.substring(0, match.index) + squareRoot;
        document.getElementById('output-value').innerText = updatedValue;
        currentInput = updatedValue;
    }
}


function formatResult(result) {
    // If the result is too large, format it
    if (result.toString().length > 10) {
        result = result.toPrecision(10);
    }
    return Number(result).toLocaleString("fullwide", {useGrouping: false, maximumFractionDigits: 10});
}

function displayError() {
    document.getElementById('output-value').innerText = 'Error';
    currentInput = ''; // Clear the current input
    setTimeout(() => clearDisplay(), 2000);
}


function updateHistory(entry) {
    history.push(entry);
    let historyList = document.getElementById('history-list');
    historyList.innerHTML = '<li>' + entry + '</li>' + historyList.innerHTML;
}

function clearHistory() {
    history = [];
    document.getElementById('history-list').innerHTML = '';
}


// For Info
document.querySelector('.toggle').addEventListener('click', function() {
    let panel = document.getElementById('side-panel');
    if (panel.style.width === '0px' || panel.style.width === '') {
        panel.style.width = '250px'; 
    } else {
        panel.style.width = '0px'; // Close the panel by resetting the width
    }
});


// Toggle the history panel
document.querySelector('.history-toggle').addEventListener('click', function() {
    let historyPanel = document.querySelector('.history-panel');
    historyPanel.style.display = historyPanel.style.display === 'none' ? 'block' : 'none';
});


