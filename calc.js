//currently displayed value
const dspValue = document.getElementById("curr-value");
//all calculator buttons
const btnList = document.getElementsByClassName("btn");

let lValue = null;
let rValue = null;
let charsOnScreen = 0;
let solved = 0;
let decimal = 0;

let operator = '';


//(FIX BSP: )
//bsp function must act on lValue if there is one and rValue is empty
function assignInputs(input) {
    if (rValue == null) {
        decimal = 0;
    }
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
            
            break;
        case '=':
            if (lValue != null && rValue != null) {
                operate();
            }
            break;
        case 'bsp':
                console.log("BSP RDY!");
            if (charsOnScreen > 0) {
                console.log("BSP ON!");
                dspValue.textContent = dspValue.textContent.slice(0, -1);
                rValue = parseFloat(dspValue.textContent);
                console.log(rValue);
                if (isNaN(rValue)) {
                    rValue = null;
                }
                charsOnScreen--;
                }
            break;
        case 'clr':
            console.log("CLR");
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
            if (input == '.' && decimal == 1) {
                console.log("decimal alread used");
                break;    
            }
            if (input == '.' && decimal == 0) {
                console.log("decimal new");
                decimal = 1;
            }
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
    console.log("CHARS: ", charsOnScreen);
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
    dspValue.textContent = rValue.toString().substring(0, 12);
    console.log(rValue);
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

function manageInputs(e) {
    assignInputs(e.target.dataset.key);

    console.table({lValue, operator, rValue});
    console.log("--------------");

}

[...btnList].forEach(e => {
    e.addEventListener('click', manageInputs);
});