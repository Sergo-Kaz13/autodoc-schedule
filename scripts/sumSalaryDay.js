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
  tax
) {
  let daySalary = 0;
  if (addHours100.status) daySalary += addHours100.time * 2 * tax;
  if (addHours120.status) daySalary += addHours120.time * 2.2 * tax;
  if (addHours50.status) daySalary += addHours50.time * 1.5 * tax;
  if (birthday.status) daySalary += 8 * tax;
  if (higherPower.status) daySalary += higherPower.time * 0.5 * tax;
  if (hospital.status) daySalary += 8 * tax * 0.64;
  if (leaveOnRequest.status) daySalary += 8 * tax;
  if (workDay.status) daySalary += workDay.time * tax;
  if (workHoliday.status) daySalary += 8 * tax;

  return daySalary;
}

export default sumSalaryDay;
