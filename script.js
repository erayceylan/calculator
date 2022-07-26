function addNumbers(n1,n2) {
    // These functions are main operator functions.
    // If one of the values is "undefined", it returns "undefined" value.
    // They also truncate the answer to 8 digits.
    return n1 == undefined || n2 == undefined ? undefined : +((n1+n2).toFixed(8))
}
function substractNumbers(n1,n2) {
    // These functions are main operator functions.
    // If one of the values is "undefined", it returns "undefined" value.
    // They also truncate the answer to 8 digits.
    return n1 == undefined || n2 == undefined ? undefined : +((n1-n2).toFixed(8))
}
function multiplyNumbers(n1,n2) {
    // These functions are main operator functions.
    // If one of the values is "undefined", it returns "undefined" value.
    // They also truncate the answer to 8 digits.
    return n1 == undefined || n2 == undefined ? undefined : +((n1*n2).toFixed(8))
}
function divideNumbers(n1,n2) {
    // These functions are main operator functions.
    // If one of the values is "undefined", it returns "undefined" value.
    // They also truncate the answer to 8 digits.
    return n1 == undefined || n2 == undefined ? undefined : +((n1/n2).toFixed(8))
}

function resetCalculation() {

    // When this function called it checks if an answer displayed on the screen
    // If it is, then it removes this value and initializes "number" and "ans" attributes.

    if (calculation.ansOnScreen) {

        mainDisplay.innerHTML = "0"

        calculation.number[0] = undefined;
        calculation.number[1] = undefined;
        calculation.ans = undefined;

        calculation.ansOnScreen = false;
    }
}

function adjustDisplay() {

    // This function checks length of display value and sets its font size accordingly.

    if (mainDisplay.innerHTML.length < 15) mainDisplay.style.fontSize = "30px"
    else mainDisplay.style.fontSize = `${360/mainDisplay.innerHTML.length + 1}px`;
}

function Calculation() {
    
    // This is a object creator function for Calculation object.
    // This object stores almost all of the information about ongoing calculation.
    // It helps to use variables about calculation globally.

    // Numbers used in calculations are stored below.
    // "number" attribute is for storing two numbers that go into operator(+,-,*,/) functions.
    // only the numbers stored in "number" goes as an argument into operator functions.
    this.number = [undefined,undefined];

    // "ans" attribute is for storing answer/return value from operator functions.
    this.ans = undefined;

    // "screen" attribute is for dynamically storing user input as a number.
    this.screen = undefined;

    // these boolean attributes are for storing active operation choice.
    this.add = false;
    this. substract = false;
    this.multiply = false;
    this.divide = false;

    // "ansOnScreen" attribute is a boolean for indicating if the answer is displayed on the screen.
    // users' number and utility input behaviours are controlled with this value.
    this.ansOnScreen = false;

    // "history" attribute is an array stroing last operations as string values to display on history panel.
    this.history = ["","","","",""];

    // "calculate" method checks which operation flag is up and then calls according operation funtion to calculate the answer.
    this.calculate = function() {
        if (this.add) this.ans = addNumbers(this.number[0],this.number[1])
        if (this.substract) this.ans = substractNumbers(this.number[0],this.number[1])
        if (this.multiply) this.ans = multiplyNumbers(this.number[0],this.number[1])
        if (this.divide) this.ans = divideNumbers(this.number[0],this.number[1])
    };

    // "archive" method stores calculation operation. It only stores calculations where answer and numbers are valid numbers.
    this.archive = function() {
        if (this.ans != undefined && this.number[0] != undefined && this.number[0] != undefined) {
            if (this.add) this.history.unshift(`${this.number[0]} + ${this.number[1]} = ${calculation.ans}`)
            if (this.substract) this.history.unshift(`${this.number[0]} - ${this.number[1]} = ${calculation.ans}`)
            if (this.multiply) this.history.unshift(`${this.number[0]} * ${this.number[1]} = ${calculation.ans}`)
            if (this.divide) this.history.unshift(`${this.number[0]} / ${this.number[1]} = ${calculation.ans}`)
        }
    };
}

function initialize() {

    // This function simply assings new "Calculation" object to calculation constant and resets the display.

    calculation = new Calculation();
    mainDisplay.innerHTML = "0"
}

function oppositeSign() {

    // This function changes screen number to its positive/negative value and updates displayed value.
    
    calculation.screen *= (-1)
    mainDisplay.innerHTML = `${calculation.screen}`
}

function operatorHandler(operator) {

    // This function sets operation function flags according to operator value.

    calculation.add = operator == "+" ? true:false
    calculation.substract = operator == "-" ? true:false
    calculation.multiply = operator == "*" ? true:false
    calculation.divide = operator == "/" ? true:false
}

function captureEvent(e) {

    // This function is called with "keydown" input on the window.
    // Below arrays are active key lists.
    if (e == "Enter") e = "=";
    const numbers = ["1","2","3","4","5","6","7","8","9","0"]
    const operators = ["+","-","*","/"]
    const equals = ["="]
    const utilities = ["Escape",".","Backspace","pandn"]
    const keybinds = ["1","2","3","4","5","6","7","8","9","0","+","-","*","/","=","Escape",".","pandn"]

    // According to key values main functions of calculator are called.

    if(numbers.includes(e)) numberPressed(e)
    if(operators.includes(e)) operatorPressed(e)
    if(equals.includes(e)) equalPressed()
    if(utilities.includes(e)) utilityPressed(e)

    if(keybinds.includes(e)) {
        const key = document.querySelector(`#${CSS.escape(e)}`);
        key.classList.add("pressed")
        setTimeout(()=> {key.classList.remove('pressed')},150)
    }
}

function numberPressed(number) {

    // When a number key is pressed this function is called.
    // It takes number string as an input argument.

    // Below function is called to check if an answer is displayed on the screen.
    // With this function display value is changed according to desired program behaviour.
    resetCalculation()

    // As a design decison the screen displays "0" value whenever there is noting to display on the screen.
    // When user starts to input numbers, "0" value is removed.
    if (mainDisplay.innerHTML == "0") mainDisplay.innerHTML = ''

    // Input numbers are added as string values.
    // These string values then stored as number in the "screen" attribute of calculation object.
    mainDisplay.innerHTML += number
    calculation.screen = +mainDisplay.innerHTML

    // Below function sets display font size accordingly with display value length.
    adjustDisplay()
}

function utilityPressed(utility) {

    // When an utility key is pressed this function is called.

    // Below function is called to check if an answer is displayed on the screen.
    // With this function display value is changed according to desired program behaviour.
    resetCalculation()

    // These constans are utility key arrays, theys helps to easy implement new keybinds.
    const deletion = ["Backspace"]
    const decimal = ["."]
    const clear = ["Escape"]

    // Below line deletes last element of displayed string.
    if (deletion.includes(utility)) mainDisplay.innerHTML = mainDisplay.innerHTML.slice(0,-1)

    // Below line adds "." string to display value if none "." exists in it.
    if (decimal.includes(utility) && !mainDisplay.innerHTML.includes(".")) mainDisplay.innerHTML += "."

    // Below line calls initialize function to intialize calculation.
    if (clear.includes(utility)) initialize()

    // Below line changes displayed number to its positive/negative value.
    if (utility == "pandn") oppositeSign()

    // As a design decison the screen displays "0" value whenever there is noting to display on the screen.
    // When user starts to input numbers, "0" value is removed.
    if (mainDisplay.innerHTML == '') mainDisplay.innerHTML = "0"

    // Below function sets display font size accordingly with display value length.
    adjustDisplay()
}

function operatorPressed(operator) {

    // This is the main operator function.
    // Storing numbers and consecutive operations behaviours are controlled with below lines.

    // When an operator key pressed display screen is set to "0".
    // In consecutive operations the result value is not displayed with operator keys.
    // Below lines maintains this behaviour and and changes "ansOnScreen" boolean accordingly.
    mainDisplay.innerHTML = "0"
    calculation.ansOnScreen = false

    // Below lines helps to store first number argument for operator functions.
    if (calculation.number[0] == undefined) {
        calculation.number[0] = calculation.screen
        calculation.screen = undefined
    }

    // Below lines helps to store second number argument for operator functions.
    if (calculation.number[1] == undefined) {
        calculation.number[1] = calculation.screen
        calculation.screen = undefined
    }

    // After calculating first valid answer value, below lines starts to control number storing behaviour.
    if (calculation.ans != undefined) {
        calculation.number[0] = calculation.ans
        calculation.number[1] = calculation.screen
        calculation.screen = undefined
        calculation.ans = undefined
    }
    
    // After numbers stored accordingly, below functions are called to make actual operation.
    calculation.calculate()
    calculation.archive()

    // This line is deep below because of correcty calculating consecutive operations.
    // Below function sets which operator function will be used in new calculation.
    operatorHandler(operator)

    // This line is for debugging purposes.
    console.log(calculation)

}

function equalPressed() {

    // This function controls the program behaviour when "Enter" or similar key is pressed.

    // Below two lines of "if" statements helps the program to avoid erros when "Enter" key is pressed by the user randomly.
    // These lines are same as the first two "if" statements of operatorPressed function.
    if (calculation.number[0] == undefined) {
        calculation.number[0] = calculation.screen
        calculation.screen = undefined
    }

    if (calculation.number[1] == undefined) {
        calculation.number[1] = calculation.screen
        calculation.screen = undefined
    }

    // Below lines are different from the operatorPressed function's third "if" statement.
    // This difference helps to continute consecutive calculations when "Enter" pressed.
    // If the user continues to press "Enter" after the first key press, the last calculation is executed repetitively. 
    if (calculation.ans != undefined) {
        calculation.number[0] = calculation.ans
        calculation.screen = undefined
        calculation.ans = undefined
    }
    
    // After numbers stored accordingly, below functions are called to make actual operation.
    calculation.calculate()
    calculation.archive()

    // When user presses "Enter" key randomly and if there is no valid answer to show,
    // Below lines helps to show "0" zero value on the screen.
    if (calculation.ans != undefined) mainDisplay.innerHTML = `${calculation.ans}`
    else mainDisplay.innerHTML = "0"

    // This boolean attribute is only switched to true in below lines.
    calculation.ansOnScreen = true
    
    // This line is for debugging purposes.
    console.log(calculation)

    // Below function sets display font size accordingly with display value length.
    adjustDisplay()
}



const keys = document.querySelectorAll(".key");
keys.forEach(key => key.addEventListener("mousedown",(e) => captureEvent(e.target.id)))
console.log(keys)



// Event listener added to window for "keydown" action.
window.addEventListener('keydown', (e) => captureEvent(e.key));

// Main display screen is selected as an object to manipulate its value globally
const mainDisplay = document.querySelector(".screen-main");

// This line starts first calculation.
let calculation = new Calculation();
