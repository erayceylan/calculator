function captureEvent(e) {

    const numbers = ["1","2","3","4","5","6","7","9","0"]
    const operators = ["+","-","*","/","=","Enter"]
    const utilities = ["c","C","%",",",".","Backspace"]

    if(numbers.includes(e.key)) numberPressed(e.key)
    if(operators.includes(e.key)) operatorPressed(e.key)
    if(utilities.includes(e.key)) utilityPressed(e.key)
}

function numberPressed(number) {

    if (mainDisplay.innerHTML == "0") mainDisplay.innerHTML = ''

    mainDisplay.innerHTML += number
    calculation.screen = +mainDisplay.innerHTML
}

























function operatorPressed(operator) {

    operatorHandler(operator)

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

    mainDisplay.innerHTML = "0"
    console.log(calculation)

}

function utilityPressed(utility) {

    const deletion = ["c","C","Backspace"]

    if (deletion.includes(utility)) mainDisplay.innerHTML = mainDisplay.innerHTML.slice(0,-1)
    if (mainDisplay.innerHTML == '') mainDisplay.innerHTML = "0"
}

function adjustDisplay() {
    if (mainDisplay.innerHTML.length < 15) mainDisplay.style.fontSize = "30px"
    else mainDisplay.style.fontSize = `${360/mainDisplay.innerHTML.length + 1}px`;
}


window.addEventListener('keydown', (e) => captureEvent(e));
const mainDisplay = document.querySelector(".screen-main span")

const calculation = { 
    number:[undefined,undefined],
    add:false,
    substract:false,
    multiply:false,
    divide:false,
    ans:undefined,
    screen:undefined,
    history:["","","","",""],
    calculate: function() {
        if (this.add) this.ans = add(this.number[0],this.number[1])
        if (this.substract) this.ans = substract(this.number[0],this.number[1])
        if (this.multiply) this.ans = multiply(this.number[0],this.number[1])
        if (this.divide) this.ans = divide(this.number[0],this.number[1])
    },
    archive: function() {
        if (this.ans != undefined && this.number[0] != undefined && this.number[0] != undefined) {
            if (this.add) this.history.unshift(`${this.number[0]} + ${this.number[1]} = ${calculation.ans}`)
            if (this.substract) this.history.unshift(`${this.number[0]} - ${this.number[1]} = ${calculation.ans}`)
            if (this.multiply) this.history.unshift(`${this.number[0]} * ${this.number[1]} = ${calculation.ans}`)
            if (this.divide) this.history.unshift(`${this.number[0]} / ${this.number[1]} = ${calculation.ans}`)
        }
    },
}










function add(n1,n2) {
    return n1 == undefined || n2 == undefined ? undefined : n1+n2
}

function substract(n1,n2) {
    return n1 == undefined || n2 == undefined ? undefined : n1-n2
}

function multiply(n1,n2) {
    return n1 == undefined || n2 == undefined ? undefined : n1*n2
}

function divide(n1,n2) {
    return n1 == undefined || n2 == undefined ? undefined : n1/n2
}

function operatorHandler(operator) {
    calculation.add = operator == "+" ? true:false
    calculation.substract = operator == "-" ? true:false
    calculation.multiply = operator == "*" ? true:false
    calculation.divide = operator == "/" ? true:false
}