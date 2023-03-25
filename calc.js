const currDisplayedValue = document.getElementById("curr-value");
const btnList = document.getElementsByClassName("btn");

let currValue = 0;
let numbersDisplayed = 0;

let numberA = null;
let numberB = null;
let operator = '';

function assignInputs(input) {
    switch (input) {
        case '+':
        case '-':
        case '/':
        case '*':
            if (numberA != null && numberB != null) {
                operate();
            } else {
                currDisplayedValue.textContent = '';
                numbersDisplayed = 0;
            } 
            operator = input;
            break;
        case '=':
            if (numberA != null && numberB != null) {
                operate();
            }
            break;
        case '.':
            break;
        case 'clr':
            break;
        case 'chs':
            break;
        default:
            if (numbersDisplayed <= 12) {
                currDisplayedValue.textContent += input;
                if (operator == '') {
                    numberA = parseFloat(currDisplayedValue.textContent);
                } else {
                    numberB = parseFloat(currDisplayedValue.textContent);
                }
                numbersDisplayed++;
            }
    } 
}

function operate() {
    let result = 0;

    switch (operator) {
        case '+':
            result = numberA + numberB;
            break;
        case '-':
            result = numberA - numberB;
            break;
        case '/':
            result = numberA / numberB;
            break;
        case '*':
            result = numberA * numberB;
            break;
        default:
            result = 0;
            break;
    }
    numberB = result;
    numberA = numberB;
    numberB = null;
    operator = '';
    currDisplayedValue.textContent = result.toString();
}

function manageInputs(e) {
    assignInputs(e.target.dataset.key);

    console.log("nA: ", numberA);
    console.log("op: ", operator);
    console.log("nB: ", numberB);
    console.log("--------------");

}

[...btnList].forEach(e => {
    e.addEventListener('click', manageInputs);
});

