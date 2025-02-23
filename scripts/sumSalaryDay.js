"use strict";

function sumSalaryDay(
  addHours100,
  addHours120,
  addHours50,
  birthday,
  higherPower,
  hospital,
  leaveOnRequest,
  workDay,
  workHoliday,
  rate,
  vacationPay,
  hospitalRate
) {
  let daySalary = 0;
  if (addHours100.status) daySalary += addHours100.time * 2 * rate;
  if (addHours120.status) daySalary += addHours120.time * 2.2 * rate;
  if (addHours50.status) daySalary += addHours50.time * 1.5 * rate;
  if (birthday.status) daySalary += (8 * rate * vacationPay) / 100;
  if (higherPower.status) daySalary += higherPower.time * 0.5 * rate;
  if (hospital.status) daySalary += (8 * rate * hospitalRate) / 100;
  if (leaveOnRequest.status) daySalary += (8 * rate * vacationPay) / 100;
  if (workDay.status) daySalary += workDay.time * rate;
  if (workHoliday.status) daySalary += (8 * rate * vacationPay) / 100;

  return daySalary;
}

export default sumSalaryDay;
