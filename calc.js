const currDisplayedValue = document.getElementById("curr-value");
const btnList = document.getElementsByClassName("btn");

let lValue = null;
let rValue = null;
let numbersDisplayed = 0;

let operator = '';

function assignInputs(input) {
    switch (input) {
        case '+':
        case '-':
        case '/':
        case '*':
            if (lValue != null && rValue != null) {
                console.log("operate from operator");
                operate();
            }
            lValue = rValue;
            rValue = null;
            operator = input;
            currDisplayedValue.textContent = '';
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
    currDisplayedValue.textContent = rValue.toString();
    operator = '';
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

