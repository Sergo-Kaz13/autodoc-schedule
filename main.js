"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const schedule = localStorage.getItem("schedule");

  if (!schedule) {
    createSchedule(2);
  }

  console.log(schedule);
});

const days = [
  "понеділок",
  "вівторок",
  "середа",
  "четверг",
  "пятниця",
  "субота",
  "неділя",
];

function createSchedule(month, year) {
  const date = new Date();
  year = year !== undefined ? (year = year) : date.getFullYear();
  month = month !== undefined ? (month = month) : date.getMonth() + 1;
  let numDayWeek = new Date(`${year}-${month}-01`).getDay() - 1;
  console.log(["numDayWeek"], numDayWeek);

  const numDaysMonth = daysInMonth(month, year);

  numDayWeek = numDayWeek < 0 ? (numDayWeek = 6) : (numDayWeek = numDayWeek);

  let daysSchedule = numDaysMonth + numDayWeek;

  while (!(daysSchedule % 7 === 0)) {
    daysSchedule++;
  }

  const schedule = document.querySelector(".schedule");
  schedule.classList.add("schedule");

  let startDayDate = 1;

  for (let index = 0; index < daysSchedule; index++) {
    const scheduleItem = document.createElement("div");
    const span = document.createElement("span");
    if (index >= numDayWeek && index <= numDaysMonth + numDayWeek - 1) {
      span.textContent = startDayDate;
      startDayDate++;
      scheduleItem.classList.add("scheduleItemWork");
    }
    scheduleItem.classList.add("scheduleItem");
    if (
      (index >= numDayWeek && index === 5) ||
      index === 6 ||
      index === 12 ||
      index === 13 ||
      index === 19 ||
      index === 20 ||
      index === 26 ||
      index === 27 ||
      index === 33 ||
      index === 34
    ) {
      scheduleItem.classList.add("scheduleItemDayOff");
    }
    scheduleItem.append(span);
    schedule.append(scheduleItem);
  }

  console.log(["schedule"], schedule);
}

function daysInMonth(month, year) {
  month = month + 1;
  if (month > 12) month = month - 12;
  year = year != undefined ? year : new Date().getFullYear();
  let d = new Date(year + "-" + month + "-01");
  d.setDate(0);
  d = d.getDate();

  return d;
}
