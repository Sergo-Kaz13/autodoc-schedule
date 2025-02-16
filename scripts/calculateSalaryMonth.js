"use strict";

function calculateSalaryMonth(
  domItemTime,
  domItemPrice,
  time,
  rate,
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
