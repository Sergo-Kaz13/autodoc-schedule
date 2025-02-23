"use strict";

function calculateUrlop(schedule) {
  const activeYear = document.querySelector(".activeYear").textContent;
  const {
    birthday,
    higherPowerTime,
    leaveOnRequestDays,
    months,
    workHolidayDays,
  } = schedule[activeYear];

  document.querySelector(".holidayDaysSpan").textContent = workHolidayDays.days;
  document.querySelector(".leaveOnRequestDays").textContent =
    leaveOnRequestDays.days;
  document.querySelector(".higherPowerHours").textContent =
    higherPowerTime.hours;
  document.querySelector(".birthday").textContent = birthday.day;

  document.querySelector(".workHolidayDaysUsed").textContent =
    workHolidayDays.daysUsed;
  document.querySelector(".leaveOnRequestDaysUsed").textContent =
    leaveOnRequestDays.daysUsed;
  document.querySelector(".higherPowerTimeUsed").textContent =
    higherPowerTime.hoursUsed;
  document.querySelector(".birthdayUsed").textContent = birthday.dayUsed;

  document.querySelector(".workHolidayDaysStay").textContent =
    workHolidayDays.days - workHolidayDays.daysUsed;
  document.querySelector(".leaveOnRequestDaysStay").textContent =
    leaveOnRequestDays.days - leaveOnRequestDays.daysUsed;
  document.querySelector(".higherPowerTimeStay").textContent =
    higherPowerTime.hours - higherPowerTime.hoursUsed;
  document.querySelector(".birthdayStay").textContent =
    birthday.day - birthday.dayUsed;
}

export default calculateUrlop;
