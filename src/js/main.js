"use strict";

import {
  parse
} from "url";

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
const soundsWaterAdd = new Audio("assets/sounds/water.wav");
const soundsWaterRemove = new Audio("assets/sounds/drain.wav");
const date = new Date().toISOString().slice(0, 10);
console.log(date);

if (!localStorage.getItem(date)) {
  localStorage.setItem(date, 0)
  value.innerHTML = "0";
} else {
  value.innerHTML = localStorage.getItem(date);
}

buttonAdd.addEventListener('click', (e) => {
  if (parseInt(value.innerHTML) < 9) {
    soundsWaterAdd.play();
    localStorage.setItem(date, parseInt(localStorage.getItem(date)) + 1);
    value.innerHTML = localStorage.getItem(date);
  }
})

buttonRemove.addEventListener('click', (e) => {
  const currentValue = parseInt(value.innerHTML);
  if (currentValue > 0) {
    value.innerHTML = parseInt(value.innerHTML) - 1;
    soundsWaterRemove.play();
  }
})