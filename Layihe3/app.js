const url = 'https://api.exchangerate.host/latest';

let base = 'RUB';
let target = 'USD';

const input = document.querySelector('.left-value');
const inputResult = document.querySelector('.right-value');

const infoLeft = document.querySelector('.currency-left');
const infoRight = document.querySelector('.currency-right');

const buttonLeft = document.querySelectorAll(".button-left");
const buttonRight = document.querySelectorAll(".button-right");

// checking for letters

input.addEventListener('keyup', () => {
    let letters = /[^0-9]+$/;

    if (input.value.match(letters)) {
        inputResult.textContent = '';
    } else {
        if (input.value.match(',')) {
            let newValue = input.value.replace(',', '.');
            input.value = newValue;
        }
    }
    console.log(input.value)
    getValue(base, target)
})

// get value
function getValue(base, target) {

    let requestURL = `${url}?base=${base}&symbols=${target}`;
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        let response = request.response;
        let currencyBase = Object.values(response.rates)[0];
        console.log(currencyBase);

        let currencyResult = parseFloat(currencyBase * input.value).toFixed(4);

        currencyResult === 'NaN' ? inputResult.textContent = "" : inputResult.textContent = currencyResult;

        infoLeft.textContent = `1 ${base} = ${parseFloat(currencyBase).toFixed(6)} ${target}`;
        infoRight.textContent = `1 ${target} = ${parseFloat(1 / currencyBase).toFixed(6)} ${base}`;
    }
}

// change button color
function changeButtonColor() {

    buttonLeft.forEach(button => {
        button.addEventListener('click', () => {

            base = button.innerText;

            buttonLeft.forEach(oldButton => {
                oldButton.classList.add('deactive');
                oldButton.classList.remove('active');
            });

            button.classList.remove('deactive');
            button.classList.add('active');

            getValue(base, target);
        })
    });

    buttonRight.forEach(button => {
        button.addEventListener('click', () => {

            target = button.innerText;

            buttonRight.forEach(oldButton => {
                oldButton.classList.add('deactive');
                oldButton.classList.remove('active');
            });

            button.classList.remove('deactive');
            button.classList.add('active');

            getValue(base, target);
        })
    });
}

changeButtonColor();