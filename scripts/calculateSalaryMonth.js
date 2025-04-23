"use strict";

import calculateTimeMonth from "./calculateTimeMonth.js";

function calculateSalaryMonth(activeMonth) {
  // domItemTime = "",
  // domItemPrice = "",
  // time = 0,
  // rate = 0,
  // surcharge = 1
  const {} = activeMonth;

  const workDayTime = document.querySelector(".workDayTime");
  const workPrice = document.querySelector(".workPrice");
  const dayTime100 = document.querySelector(".dayTime100");
  const dayTime100Price = document.querySelector(".time100Price");
  const dayTime50 = document.querySelector(".dayTime50");
  const tiem50Price = document.querySelector(".time50Price");
  const dayTime120 = document.querySelector(".dayTime120");
  const time120Price = document.querySelector(".time120Price");
  const higherPowerTime = document.querySelector(".higherPowerTime");
  const higherPowerPrice = document.querySelector(".higherPowerPrice");
  const birthdayTime = document.querySelector(".birthdayTime");
  const birthdayPrice = document.querySelector(".birthdayPrice");
  const workHolidayTime = document.querySelector(".workHolidayTime");
  const workHolidayPrice = document.querySelector(".workHolidayPrice");
  const leaveOnRequestTime = document.querySelector(".leaveOnRequestTime");
  const leaveOnRequestPrice = document.querySelector(".leaveOnRequestPrice");
  const hospitalTime = document.querySelector(".hospitalTime");
  const hospitalPrice = document.querySelector(".hospitalPrice");

  const time = calculateTimeMonth(activeMonth);

  let salaryMonthBrutto = 0;

  // все що нище потрібно переписати
  if (
    domItemTime === ".birthdayTime" ||
    domItemTime === ".workHolidayTime" ||
    domItemTime === ".leaveOnRequestTime" ||
    domItemTime === ".hospitalTime"
  ) {
    document.querySelector(domItemTime).textContent = time;

    const salaryDay = (time * 8 * rate * surcharge).toFixed(2);

    document.querySelector(domItemPrice).textContent = salaryDay;

    return Number(salaryDay);
  } else {
    document.querySelector(domItemTime).textContent = time;

    const salaryDay = (time * rate * surcharge).toFixed(2);

    document.querySelector(domItemPrice).textContent = salaryDay;

    return Number(salaryDay);
  }
}

export default calculateSalaryMonth;
