//currently displayed value
const dspValue = document.getElementById("curr-value");
//all calculator buttons
const btnList = document.getElementsByClassName("btn");

let lValue = null;
let rValue = null;
let charsOnScreen = 0;
let solved = 0;

let operator = '';

function assignInputs(input) {
    switch (input) {
        case '+':
        case '-':
        case '/':
        case '*':
            dspValue.textContent = '';
            if (lValue != null && rValue != null) {
                operate();
            }
            lValue = rValue;
            rValue = null;
            operator = input;
            charsOnScreen = 0;
            
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
            if (rValue > 0) {
                dspValue.textContent = '-' + dspValue.textContent;

            } else {
                dspValue.textContent = dspValue.textContent.substring(1);
            }
            rValue *= -1;
            break;
        default:
            console.log("solved: ", solved);
            if (solved == 1) {
                dspValue.textContent = '';
                solved = 0;
            }
            if (charsOnScreen <= 12) {
                dspValue.textContent += input;
                rValue = parseFloat(dspValue.textContent);
                charsOnScreen++;
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
    dspValue.textContent = rValue.toString();
    console.log(rValue);
    operator = '';
    solved = 1;
}

function clear() {
    lValue = null;
    rValue = null;
    operator = '';
    charsOnScreen = 0;
    dspValue.textContent = '';
}

function manageInputs(e) {
    assignInputs(e.target.dataset.key);

    console.table({lValue, operator, rValue});
    console.log("--------------");

}

[...btnList].forEach(e => {
    e.addEventListener('click', manageInputs);
});