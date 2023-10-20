const dspValue = document.getElementById("curr-value");
const btnList = document.getElementsByClassName("btn");

let lValue = null;
let rValue = null;
let charsOnScreen = 0;
let solved = 0;
let decimal = 0;

let operator = '';


function assignInputs(input) {
    if (rValue == null) decimal = 0;
    switch (input) {
        case '+':
        case '-':
        case '/':
        case '*':
            dspValue.textContent = '';
            if (lValue != null && rValue != null) {
                operate();
            } else {
                lValue = rValue;
                rValue = null;
                operator = input;
            }
            
            break;
        case '=':
            if (lValue != null && rValue != null) operate();
            break;
        case 'bsp':
            if (charsOnScreen > 0) {
                dspValue.textContent = dspValue.textContent.slice(0, -1);
                rValue = parseFloat(dspValue.textContent);
                if (isNaN(rValue)) rValue = null;
                charsOnScreen--;
                }
            break;
        case 'clr':
            clear();
            break;
        case 'chs':
            if (rValue > 0) {
                dspValue.textContent = '-' + dspValue.textContent;
            }
            else {
                dspValue.textContent = dspValue.textContent.substring(1);
            }
            rValue *= -1;
            break;
        default:
            if (input == '.' && decimal == 1) break;    
            if (input == '.' && decimal == 0) decimal = 1;
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
    charsOnScreen = dspValue.textContent.length;
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
    dspValue.textContent = rValue.toString().substring(0, 12);
    operator = '';
    decimal = 0;
    solved = 1;
}

function clear() {
    lValue = null;
    rValue = null;
    operator = '';
    charsOnScreen = 0;
    dspValue.textContent = '';
}


[...btnList].forEach(e => {
  e.addEventListener('click', (e) => assignInputs(e.target.dataset.key));
});