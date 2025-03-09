import { listOfMonths, listOfCategories } from './data.js';
import { monthUI, categoryUI, yearUI } from './selectors.js';

// Initialize expenseObj for each month
export const expenseObj = {};
listOfMonths.forEach((month) => {
  initializeCategoriesForMonth(month);
});

// Function to initialize categories for a given month
export function initializeCategoriesForMonth(month) {
  expenseObj[month] = {};
  listOfCategories.forEach((category) => {
    expenseObj[month][category] = 0;
  });
}

// To create a dynamic options list
export function addOptions(list, toBeAddedTo) {
  list.forEach(item => {
    const option = document.createElement("option");
    option.value = item;
    option.innerHTML = item;
    toBeAddedTo.appendChild(option);
  });
}

// Set default month and year
export function setDefaultMonthYear() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-11
  const currentYear = currentDate.getFullYear(); // 4-digit year

  monthUI.selectedIndex = currentMonth;
  for (let i = 0; i < yearUI.options.length; i++) {
    if (parseInt(yearUI.options[i].value) === currentYear) {
      yearUI.selectedIndex = i;
      break;
    }
  }
}

// Load expenses from local storage
export function getExpensesFromLocalStorage(month, year) {
  const key = `${month}-${year}`;
  return JSON.parse(localStorage.getItem(key)) || {};
}

// Save expenses to local storage
export function saveExpensesToLocalStorage(month, year) {
  const key = `${month}-${year}`;
  localStorage.setItem(key, JSON.stringify(expenseObj[month]));
}

// Load all the dynamic data in the form when the page is loaded
export function loadingData() {
  // Adding options to the select elements
  addOptions(listOfMonths, monthUI);
  addOptions(listOfCategories, categoryUI);

  // Create an array of sequential years from 2020 to 2040
  const listOfYears = Array.from(
    { length: 2040 - 2020 + 1 },
    (v, k) => k + 2020
  );
  addOptions(listOfYears, yearUI);

  // Set the default month and year
  setDefaultMonthYear();
}