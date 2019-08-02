"use strict";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('serviceworker.js').then(function (registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function (err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

const buttonAdd = document.querySelector(".button-add--js");
const buttonRemove = document.querySelector(".button-remove--js");
const value = document.querySelector(".glass__number--js");
const glass = document.querySelector(".glass__value--js");
const soundsWaterAdd = new Audio("assets/sounds/water.wav");
const soundsWaterRemove = new Audio("assets/sounds/drain.wav");
const header = document.querySelector(".header");
const date = new Date().toISOString().slice(0, 10);
console.log(date);

if (!localStorage.getItem(date)) {
  localStorage.setItem(date, 0)
  value.innerHTML = "0";
  glass.classList.add("glass__value--0");
} else {
  value.innerHTML = localStorage.getItem(date);
  glass.classList.add(`glass__value--${parseInt(value.innerHTML)}`);
}

buttonAdd.addEventListener('click', (e) => {
  const currentValueAdd = parseInt(value.innerHTML);
  if (currentValueAdd < 9) {
    soundsWaterAdd.play();
    localStorage.setItem(date, parseInt(localStorage.getItem(date)) + 1);
    value.innerHTML = localStorage.getItem(date);
    glass.classList.remove(
      `glass__value--${currentValueAdd - 1}`
    );
    glass.classList.add(`glass__value--${currentValueAdd + 1}`);
  }
  if (currentValueAdd >= 8) {
    console.log("Pelne nawodnienie");
    header.textContent = "Max hydration";
  }
})

buttonRemove.addEventListener('click', (e) => {
  const currentValueRemove = parseInt(value.innerHTML);
  if (currentValueRemove > 0) {
    soundsWaterRemove.play();
    localStorage.setItem(date, localStorage.getItem(date) - 1);
    value.innerHTML = localStorage.getItem(date);
    glass.classList.remove(
      `glass__value--${parseInt(value.innerHTML) + 1}`
    );
    glass.classList.add(`glass__value--${currentValueRemove - 1}`);
  }
  if (currentValueRemove <= 9) {
    header.textContent = "water";

  }
})