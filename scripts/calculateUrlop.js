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

  document.querySelector(".holidayDaysSpan").textContent = workHolidayDays;
  document.querySelector(".leaveOnRequestDays").textContent =
    leaveOnRequestDays;
  document.querySelector(".higherPowerHours").textContent = higherPowerTime;
  document.querySelector(".birthday").textContent = birthday;

  let birthdayUsed = 0;
  let higherPowerUsed = 0;
  let leaveOnRequestUsed = 0;
  let workHolidayUsed = 0;

  months.forEach(({ days }) => {
    days.forEach(({ dayInfo }) => {
      const { birthday, higherPower, workHoliday, leaveOnRequest } = dayInfo;

      birthday.status ? (birthdayUsed += birthday.day) : "";
      higherPower.status ? (higherPowerUsed += higherPower.time) : "";
      workHoliday.status ? (workHolidayUsed += workHoliday.day) : "";
      leaveOnRequest.status ? (leaveOnRequestUsed += leaveOnRequest.day) : "";
    });
  });

  document.querySelector(".workHolidayDaysUsed").textContent = workHolidayUsed;
  document.querySelector(".leaveOnRequestDaysUsed").textContent =
    leaveOnRequestUsed;
  document.querySelector(".higherPowerTimeUsed").textContent = higherPowerUsed;
  document.querySelector(".birthdayUsed").textContent = birthdayUsed;

  document.querySelector(".workHolidayDaysStay").textContent =
    workHolidayDays - workHolidayUsed;
  document.querySelector(".leaveOnRequestDaysStay").textContent =
    leaveOnRequestDays - leaveOnRequestUsed;
  document.querySelector(".higherPowerTimeStay").textContent =
    higherPowerTime - higherPowerUsed;
  document.querySelector(".birthdayStay").textContent = birthday - birthdayUsed;

  return { workHolidayUsed, leaveOnRequestUsed, higherPowerUsed, birthdayUsed };
}

export default calculateUrlop;
