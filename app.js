const amountInputEl = document.getElementById("amount");
const interestInputEl = document.getElementById("interest");
const yearsInputEl = document.getElementById("years");
const monthlyPaymentInputEl = document.getElementById("monthlyPayment");
const totalInputEl = document.getElementById("total");
const totalInterestInputEl = document.getElementById("totalInterest");
const loanFormEl = document.getElementById("loan-form");
const loaderEl = document.getElementById("loader-block");
const resultsEl = document.getElementById("results-block");

function onInit() {
  shouldShowLoader(false);
  shouldShowResults(false);
  loanFormEl.addEventListener("submit", handleCalculateLoan);
}

function handleCalculateLoan(e) {
  shouldShowLoader(true);
  shouldShowResults(false);
  const amount = parseFloat(amountInputEl.value);
  const interest = parseFloat(interestInputEl.value);
  const years = parseFloat(yearsInputEl.value);
  const { totalInterest, totalPayment, monthlyPayment } = calculateLoan(amount, interest, years);
  setTimeout(() => handleResults(totalInterest, totalPayment, monthlyPayment), 2000);
  e.preventDefault();
}

function calculateLoan(amount, interest, years) {
  const totalInterest = Math.pow(1 + interest / 100, years);
  const totalPayment = totalInterest * amount;
  const months = years * 12;
  const monthlyPayment = totalPayment / months;
  return { totalInterest, totalPayment, monthlyPayment };
}

function handleResults(totalInterest, totalPayment, monthlyPayment) {
  if (isFinite(monthlyPayment)) {
    monthlyPaymentInputEl.value = monthlyPayment.toFixed(2);
    totalInputEl.value = totalPayment.toFixed(2);
    totalInterestInputEl.value = ((totalInterest - 1) * 100).toFixed(2);
    shouldShowLoader(false);
    shouldShowResults(true);
  } else {
    showError();
    shouldShowLoader(false);
    shouldShowResults(false);
  }
}

function shouldShowLoader(shouldShow) {
  loaderEl.style.display = shouldShow ? "block" : "none";
}

function shouldShowResults(shouldShow) {
  resultsEl.style.display = shouldShow ? "block" : "none";
}

function showError() {
  const errorEl = document.createElement("div");
  errorEl.className = "alert alert-danger";
  const errorMessage = document.createTextNode("Fill the form with correct values");
  errorEl.appendChild(errorMessage);
  document.querySelector(".card-body").insertBefore(errorEl, document.querySelector(".card-title"));
}

onInit();
