"use strict";

import calculateTimeMonth from "./calculateTimeMonth.js";

function calculateSalaryMonth(activeMonth) {
  console.log(["activeMonth"], activeMonth);

  const { rate, vacationPay, hospitalRate } = activeMonth;

  const workPrice = document.querySelector(".workPrice");
  const dayTime100Price = document.querySelector(".time100Price");
  const time50Price = document.querySelector(".time50Price");
  const time120Price = document.querySelector(".time120Price");
  const higherPowerPrice = document.querySelector(".higherPowerPrice");
  const birthdayPrice = document.querySelector(".birthdayPrice");
  const workHolidayPrice = document.querySelector(".workHolidayPrice");
  const leaveOnRequestPrice = document.querySelector(".leaveOnRequestPrice");
  const hospitalPrice = document.querySelector(".hospitalPrice");

  const time = calculateTimeMonth(activeMonth);

  console.log(["time"], time);

  let salaryMonthBrutto = 0;

  workPrice.textContent = time.workDayTime * rate;
  dayTime100Price.textContent = time.dayTime100 * rate * 2;
  time50Price.textContent = time.dayTime50 * rate * 1.5;
  time120Price.textContent = time.dayTime120 * rate * 2.2;
  higherPowerPrice.textContent = time.higherPowerTime * rate * 0.5;
  birthdayPrice.textContent =
    time.birthdayTime * 8 * rate * (vacationPay / 100);
  workHolidayPrice.textContent =
    time.workHolidayTime * 8 * rate * (vacationPay / 100);
  leaveOnRequestPrice.textContent =
    time.leaveOnRequestTime * 8 * rate * (vacationPay / 100);
  hospitalPrice.textContent =
    time.hospitalTime * 8 * rate * (hospitalRate / 100);

  // все що нище потрібно переписати
  // if (
  //   domItemTime === ".birthdayTime" ||
  //   domItemTime === ".workHolidayTime" ||
  //   domItemTime === ".leaveOnRequestTime" ||
  //   domItemTime === ".hospitalTime"
  // ) {
  //   document.querySelector(domItemTime).textContent = time;

  //   const salaryDay = (time * 8 * rate * surcharge).toFixed(2);

  //   document.querySelector(domItemPrice).textContent = salaryDay;

  //   return Number(salaryDay);
  // } else {
  //   document.querySelector(domItemTime).textContent = time;

  //   const salaryDay = (time * rate * surcharge).toFixed(2);

  //   document.querySelector(domItemPrice).textContent = salaryDay;

  //   return Number(salaryDay);
  // }
}

export default calculateSalaryMonth;
