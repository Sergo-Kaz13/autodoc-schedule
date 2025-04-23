"use strict";

import calculateTimeMonth from "./calculateTimeMonth.js";

function calculateSalaryMonth(activeMonth) {
  // domItemTime = "",
  // domItemPrice = "",
  // time = 0,
  // rate = 0,
  // surcharge = 1
  const {} = activeMonth;

  const time = calculateTimeMonth(activeMonth);

  let salaryMonthBrutto = 0;

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
