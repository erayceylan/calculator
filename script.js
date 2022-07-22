function add(...number) {
    return number.reduce((sum,number) => sum + number)
}

function substract(...number) {
    return number.reduce((sum,number) => sum - number)
}

function multiply(...number) {
    return number.reduce((sum,number) => sum * number)
}

function divide(...number) {
    return number.reduce((sum,number) => sum / number)
}

window.addEventListener('keydown', (e) => captureEvent(e));

function captureEvent(e) {

    const numbers = ["1","2","3","4","5","6","7","9","0"]
    const operators = ["+","-","*","/","=","Enter"]
    const utilities = ["c","C","%",",",".","Backspace"]

    if(numbers.includes(e.key)) numberPressed(e.key)
    if(operators.includes(e.key)) operatorPressed(e.key)
    if(utilities.includes(e.key)) utilityPressed(e.key)
}

function updateDisplay(char) {
    document.querySelector(".screen-main").innerHTML += char;
}

function numberPressed(number) {
    updateDisplay(number)
}

function operatorPressed(operator) {

}

function utilityPressed(utility) {

    const deletion = ["c","C","Backspace"]

    if ()
}