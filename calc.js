const currValue = document.getElementById("curr-value");
const btnList = document.getElementsByClassName("btn");

let numbersDisplayed = 0;

function manageInputs(e) {
    if (numbersDisplayed <= 12) {
        currValue.textContent += e.target.dataset.key;
        numbersDisplayed++;
    }
}

[...btnList].forEach(e => {
    e.addEventListener('click', manageInputs);
});
