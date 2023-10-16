const currDisplayedValue = document.getElementById("curr-value");
const btnList = document.getElementsByClassName("btn");

let lValue = null;
let rValue = null;
let numbersDisplayed = 0;
let solved = 0;

let operator = '';

function assignInputs(input) {
    switch (input) {
        case '+':
        case '-':
        case '/':
        case '*':
            currDisplayedValue.textContent = '';
            if (lValue != null && rValue != null) {
                operate();
            }
            lValue = rValue;
            rValue = null;
            operator = input;
            numbersDisplayed = 0;
            
            break;
        case '=':
            operate();
            break;
        case '.':
            break;
        case 'clr':
            clear();
            break;
        case 'chs':
            break;
        default:
            console.log("solved: ", solved);
            if (solved == 1) {
                currDisplayedValue.textContent = '';
                solved = 0;
            }
            if (numbersDisplayed <= 12) {
                currDisplayedValue.textContent += input;
                rValue = parseFloat(currDisplayedValue.textContent);
                numbersDisplayed++;
            }
    } 
}

function operate() {
    switch (operator) {
        case '+':
            rValue = lValue + rValue;
            break;
        case '-':
            rValue = lValue - rValue;
            break;
        case '/':
            rValue = lValue / rValue;
            break;
        case '*':
            rValue = lValue * rValue;
            break;
        default:
            break;
    }
    lValue = null;
    console.log(rValue);
    currDisplayedValue.textContent = rValue.toString();
    console.log(rValue);
    operator = '';
    solved = 1;
}

function clear() {
    lValue = null;
    rValue = null;
    operator = '';
    numbersDisplayed = 0;
    currDisplayedValue.textContent = '';
}

function manageInputs(e) {
    assignInputs(e.target.dataset.key);

    console.table({lValue, operator, rValue});
    console.log("--------------");

}

[...btnList].forEach(e => {
    e.addEventListener('click', manageInputs);
});