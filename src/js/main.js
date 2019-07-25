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
const value = document.querySelector(".container__number--js");
const key = new Date().toISOString().slice(0, 10);
console.log(key);

if (localStorage.getItem(key)) {
  localStorage.setItem(key, 0)
  value.innerHTML = "0";
} else {
  value.innerHTML = localStorage.getItem(key);
}

buttonAdd.addEventListener('click', (e) => {
  localStorage.setItem(key, parseInt(localStorage.getItem(key)) + 1);
  value.innerHTML = localStorage.getItem(key);
})