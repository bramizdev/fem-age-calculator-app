'use strict';

const $ = (selector) => document.querySelector(selector);

const $form = $('.form');
const $day = $('#day');
const $month = $('#month');
const $year = $('#year');
const $resultDays = $('.results__days');
const $resultMonths = $('.results__months');
const $resultYears = $('.results__years');

const isValidNumber = (number) => {
  return isFinite(number) && number > 0;
};

const validateDay = (day, month) => {
  const months31Days = [1, 3, 5, 7, 8, 10, 12];
  let isValid = true;
  if (day > 28 && month === 2) isValid = false;
  if (day > 31) isValid = false;
  if (day > 30 && !months31Days.includes(month)) {
    isValid = false;
  }
  return isValid;
};

const validateMonth = (month) => {
  return month <= 12;
};

const validateYear = (year) => {
  const curYear = new Date().getFullYear();
  return year <= curYear;
};

const displayError = (el, msg) => {
  const formControl = el.parentElement;
  const label = formControl.querySelector('.form__control-label');
  const text = formControl.querySelector('.form__control-error-msg');
  label.classList.add('form__control-label-error');
  el.classList.add('form__control-input-error');
  text.textContent = msg;
};

const resetError = (el) => {
  const formControl = el.parentElement;
  const label = formControl.querySelector('.form__control-label');
  const text = formControl.querySelector('.form__control-error-msg');
  label.classList.remove('form__control-label-error');
  el.classList.remove('form__control-input-error');
  text.textContent = '';
};

const validateInputs = (day, month, year) => {
  let isValid = false;
  if (day === '' || day === 0 || day === undefined || day === null) {
    displayError($day, 'This field is required');
  } else if (!isValidNumber(day)) {
    displayError($day, 'Must be a valid day');
  } else if (
    month === '' ||
    month === 0 ||
    month === undefined ||
    month === null
  ) {
    displayError($month, 'This field is required');
  } else if (!isValidNumber(month)) {
    displayError($month, 'Must be a valid month');
  } else if (year === '' || year === 0 || year === undefined || year === null) {
    displayError($year, 'This field is required');
  } else if (!isValidNumber(year)) {
    displayError($year, 'Must be a valid year');
  } else if (!validateDay(day, month)) {
    displayError($day, 'Must be a valid day');
  } else if (!validateMonth(month)) {
    displayError($month, 'Must be a valid month');
  } else if (!validateYear(year)) {
    displayError($year, 'Must be a in the past');
  } else {
    isValid = true;
  }
  return isValid;
};

$form.addEventListener('submit', (e) => {
  e.preventDefault();
  const day = Number($day.value.trim());
  const month = Number($month.value.trim());
  const year = Number($year.value.trim());

  [$day, $month, $year].forEach((el) => resetError(el));

  if (!validateInputs(day, month, year)) return;
  console.log('Valid inputs');
});
