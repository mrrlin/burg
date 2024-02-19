'use strict';

const checkMenuBtn = document.querySelector('#main-action-button');
const productsBlock = document.querySelector('#products');

checkMenuBtn.addEventListener('click', () => {
    productsBlock.scrollIntoView({behavior: 'smooth'});
});

const links = document.querySelectorAll('.menu-item__text');
links.forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById(link.getAttribute('data-link')).scrollIntoView({behavior: 'smooth'});
    });
});


let orderButtons = document.querySelectorAll('.product-button');
orderButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('#order').scrollIntoView({behavior: 'smooth'});
    });
});

const orderForm = document.querySelector('.order-form');
const burger = document.querySelector('#burger');
const name = document.querySelector('#name');
const phone = document.querySelector('#phone');
const submitOrderBtn = document.querySelector('#orderAction');

const formElements = [burger, name, phone];

const validateInputs = (formInputs) => {
    let hasError = false;

    formInputs.forEach(input => {
        if (!input.value) {
            input.parentElement.style.background = 'red';
            hasError = true;
        } else {
            input.parentElement.style.background = '';
        }
    });

    if (!hasError) {
        return !hasError;
    } else {
        return false;
    }
};

formElements.forEach(item => {
   item.addEventListener('input', () => {
       validateInputs(formElements);
       console.log('loop', validateInputs(formElements));
   }) ;
});

submitOrderBtn.addEventListener('click', () => {
    validateInputs(formElements);
});

orderForm.addEventListener('submit', e => {
    let inputsNotEmpty = validateInputs(formElements);

    if (inputsNotEmpty) {
        formElements.forEach(input => {
            input.value = '';
        });
        alert('Спасибо за заказ! Мы скоро свяжемся с вами.');
    }
});

const changeCurrencyBtn = document.querySelector('#changeCurrency');
let prices = document.querySelectorAll('.products-item-price');
changeCurrencyBtn.addEventListener('click', e => {
    let currentCurrency = e.target.innerText;
    let newCurrency = '$'
    let coefficient = 1;

    if (currentCurrency === '$') {
        newCurrency = '₽';
        coefficient = 80;
    }

    if (currentCurrency === '₽') {
        newCurrency = 'BYN';
        coefficient = 3;
    }

    if (currentCurrency === 'BYN') {
        newCurrency = '€';
        coefficient = 0.9;
    }

    if (currentCurrency === '€') {
        newCurrency = '¥';
        coefficient = 7.2;
    }
    e.target.innerText = newCurrency;

    prices.forEach(price => {
        price.innerText = +(price.getAttribute('data-base-price') * coefficient).toFixed(1) + ' ' + newCurrency;
    });
});

const arrowTop = document.querySelector('#arrowTop');

arrowTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

window.addEventListener('scroll', () => {
   arrowTop.hidden = (scrollY < document.documentElement.clientHeight);
});