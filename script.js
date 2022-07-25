function Calculation() {
    
    this.number = [undefined,undefined];
    this.add = false;
    this. substract = false;
    this.multiply = false;
    this.divide = false;
    this.ans = undefined;
    this.ansOnScreen = false;
    this.screen = undefined;
    this.history = ["","","","",""];

    this.calculate = function() {
        if (this.add) this.ans = add(this.number[0],this.number[1])
        if (this.substract) this.ans = substract(this.number[0],this.number[1])
        if (this.multiply) this.ans = multiply(this.number[0],this.number[1])
        if (this.divide) this.ans = divide(this.number[0],this.number[1])
    };

    this.archive = function() {
        if (this.ans != undefined && this.number[0] != undefined && this.number[0] != undefined) {
            if (this.add) this.history.unshift(`${this.number[0]} + ${this.number[1]} = ${calculation.ans}`)
            if (this.substract) this.history.unshift(`${this.number[0]} - ${this.number[1]} = ${calculation.ans}`)
            if (this.multiply) this.history.unshift(`${this.number[0]} * ${this.number[1]} = ${calculation.ans}`)
            if (this.divide) this.history.unshift(`${this.number[0]} / ${this.number[1]} = ${calculation.ans}`)
        }
    };
}

function captureEvent(e) {

    const numbers = ["1","2","3","4","5","6","7","8","9","0"]
    const operators = ["+","-","*","/"]
    const equals = ["=","Enter"]
    const utilities = ["Escape",".","Backspace"]

    if(numbers.includes(e)) numberPressed(e)
    if(operators.includes(e)) operatorPressed(e)
    if(equals.includes(e)) equalPressed()
    if(utilities.includes(e)) utilityPressed(e)
}

function numberPressed(number) {

    // add this functionality: if ansOnScreen true, initialize calculation

    if (mainDisplay.innerHTML == "0") mainDisplay.innerHTML = ''

    mainDisplay.innerHTML += number
    calculation.screen = +mainDisplay.innerHTML

    adjustDisplay()
}

function operatorPressed(operator) {

    calculation.ansOnScreen = false

    if (calculation.number[0] == undefined) {
        calculation.number[0] = calculation.screen
        calculation.screen = undefined
    }

    if (calculation.number[1] == undefined) {
        calculation.number[1] = calculation.screen
        calculation.screen = undefined
    }

    if (calculation.ans != undefined) {
        calculation.number[0] = calculation.ans
        calculation.number[1] = calculation.screen
        calculation.screen = undefined
        calculation.ans = undefined
    }
    
    calculation.calculate()
    calculation.archive()

    operatorHandler(operator)

    mainDisplay.innerHTML = "0"
    console.log(calculation)

}

function equalPressed() {

    if (calculation.number[0] == undefined) {
        calculation.number[0] = calculation.screen
        calculation.screen = undefined
    }

    if (calculation.number[1] == undefined) {
        calculation.number[1] = calculation.screen
        calculation.screen = undefined
    }

    if (calculation.ans != undefined) {
        calculation.number[0] = calculation.ans
        calculation.screen = undefined
        calculation.ans = undefined
    }
    
    calculation.calculate()
    calculation.archive()

    if (calculation.ans != undefined) mainDisplay.innerHTML = `${calculation.ans}`
    else mainDisplay.innerHTML = "0"
    calculation.ansOnScreen = true
    
    console.log(calculation)

    adjustDisplay()
}

function utilityPressed(utility) {

    // add this functionality: if ansOnScreen true, initialize calculation

    const deletion = ["Backspace"]
    const decimal = ["."]
    const pandn = ["Escape"]

    if (deletion.includes(utility)) mainDisplay.innerHTML = mainDisplay.innerHTML.slice(0,-1)
    if (decimal.includes(utility) && !mainDisplay.innerHTML.includes(".")) mainDisplay.innerHTML += "."
    if (pandn.includes(utility)) mainDisplay.innerHTML = `${(+mainDisplay.innerHTML) * (-1)}`

    if (mainDisplay.innerHTML == '') mainDisplay.innerHTML = "0"

    adjustDisplay()
}

function adjustDisplay() {
    if (mainDisplay.innerHTML.length < 15) mainDisplay.style.fontSize = "30px"
    else mainDisplay.style.fontSize = `${360/mainDisplay.innerHTML.length + 1}px`;
}

function add(n1,n2) {
    return n1 == undefined || n2 == undefined ? undefined : +((n1+n2).toFixed(8))
}

function substract(n1,n2) {
    return n1 == undefined || n2 == undefined ? undefined : +((n1-n2).toFixed(8))
}

function multiply(n1,n2) {
    return n1 == undefined || n2 == undefined ? undefined : +((n1*n2).toFixed(8))
}

function divide(n1,n2) {
    return n1 == undefined || n2 == undefined ? undefined : +((n1/n2).toFixed(8))
}

function operatorHandler(operator) {
    calculation.add = operator == "+" ? true:false
    calculation.substract = operator == "-" ? true:false
    calculation.multiply = operator == "*" ? true:false
    calculation.divide = operator == "/" ? true:false
}

window.addEventListener('keydown', (e) => captureEvent(e.key));
const mainDisplay = document.querySelector(".screen-main")
let calculation = new Calculation()
