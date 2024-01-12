let history = [];

function inputValue(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    try {
        var result = eval(document.getElementById('display').value);
        if (Number.isFinite(result)) {
            document.getElementById('display').value = result;
            updateHistory(document.getElementById('display').value);
        } else {
            throw 'Invalid calculation';
        }
    } catch (e) {
        document.getElementById('display').value = 'Error';
        setTimeout(clearDisplay, 2000);
    }
}

function squareRoot() {
    const currentValue = parseFloat(document.getElementById('display').value);
    const result = Math.sqrt(currentValue);
    document.getElementById('display').value = result;
    updateHistory(`√${currentValue} = ${result}`);
}

function updateHistory(entry) {
    history.push(entry);
    const historyList = document.getElementById('history-list');
    historyList.innerHTML += `<li>${entry}</li>`;
}

function clearHistory() {
    history = []; // Clear the history array
    document.getElementById('history-list').innerHTML = ''; // Clear the history display
}
