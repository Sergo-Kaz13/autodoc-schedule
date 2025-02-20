"use strict";

function calculateSalaryMonth(
  domItemTime = "",
  domItemPrice = "",
  time = 0,
  rate = 0,
  surcharge = 1
) {
  document.querySelector(domItemTime).textContent = time;
  document.querySelector(domItemPrice).textContent = (
    time *
    rate *
    surcharge
  ).toFixed(2);
}

export default calculateSalaryMonth;
