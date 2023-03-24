const currValue = document.getElementById("curr-value");
const btnList = document.getElementsByClassName("btn");

[...btnList].forEach(e => {
    e.addEventListener('click', e => {
        currValue.textContent += e.target.dataset.key;
    })
})