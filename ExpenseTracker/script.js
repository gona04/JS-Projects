import { listOfMonths, listOfCategories } from "./data.js";
import {
  monthUI,
  categoryUI,
  yearUI,
  expenseForm,
  amountInput,
  expenseChart,
} from "./selectors.js";
import {
  expenseObj,
  initializeCategoriesForMonth,
  addOptions,
  setDefaultMonthYear,
  getExpensesFromLocalStorage,
  saveExpensesToLocalStorage,
  loadingData,
} from "./loadData.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the application
  loadingData();

  // Initialize the chart
  const ctx = expenseChart.getContext('2d');
  const chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(expenseObj[monthUI.value]),
      datasets: [{
        label: 'Spent in each area',
        data: [],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(195, 99, 255)',
          'rgb(255, 154, 99)',
          'rgb(160, 4, 4)',
          'rgb(11, 132, 50)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Event handler for form submission
  expenseForm.addEventListener('submit', handleSubmit);

  // Event handler for month/year change
  monthUI.addEventListener('change', updateChart);
  yearUI.addEventListener('change', updateChart);

  // Event handler for form submission
  function handleSubmit(event) {
    event.preventDefault();
    const currentExpense = {
      selectedMonth: monthUI.value,
      selectedYear: yearUI.value,
      category: categoryUI.value,
      amount: parseFloat(amountInput.value)
    };

    if (!currentExpense.selectedMonth || !currentExpense.selectedYear) {
      alert('Month or year are not selected');
      return;
    }

    const expenseData = getExpensesFromLocalStorage(currentExpense.selectedMonth, currentExpense.selectedYear);
    Object.assign(expenseObj[currentExpense.selectedMonth], expenseData);

    if (!expenseObj[currentExpense.selectedMonth]) {
      initializeCategoriesForMonth(currentExpense.selectedMonth);
    }

    const currentAmount = expenseObj[currentExpense.selectedMonth][currentExpense.category] || 0;
    const newAmount = currentAmount + currentExpense.amount;

    // Ensure the amount does not go below zero
    if (newAmount < 0) {
      alert('The total amount cannot be reduced below zero.');
    } else {
      expenseObj[currentExpense.selectedMonth][currentExpense.category] = newAmount;
    }

    saveExpensesToLocalStorage(currentExpense.selectedMonth, currentExpense.selectedYear);
    console.log(expenseObj);

    // Update the chart after form submission
    updateChart();
  }

  // Function to update the chart data
  function updateChart() {
    const selectedMonth = monthUI.value;
    const selectedYear = yearUI.value;
    const expenseData = getExpensesFromLocalStorage(selectedMonth, selectedYear);

    const chartData = listOfCategories.map(category => expenseData[category] || 0);
    chart.data.datasets[0].data = chartData;
    chart.update();
  }

  // Initial chart update
  updateChart();
});