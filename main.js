// "use strict";

import { showSchedule } from "./scripts/showSchedule.js";
import { months, scheduleBlock } from "./scripts/data.js";
import { createSchedule } from "./scripts/createSchedule.js";

const { form } = document.forms;

let schedule = null;

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

let dayIndex = null;
// let monthActive = null;
// let yearActive = null;

const activeYear = document.querySelector(".activeYear");
const monthItem = document.querySelector(".monthItem");
const btnMinMonth = document.querySelector(".btnLeft");
const btnPlusMont = document.querySelector(".btnRight");
const listItems = document.querySelector(".listItemsBlock");
const btnClose = document.querySelector(".btnClose");

activeYear.textContent = currentYear;
monthItem.textContent = months[currentMonth];
monthItem.id = currentMonth;

window.addEventListener("DOMContentLoaded", () => {
  schedule = JSON.parse(localStorage.getItem("schedule")) || {};

  const year = new Date().getFullYear();

  if (Object.keys(schedule).length === 0) {
    schedule[year] = createSchedule(year);
    localStorage.setItem("schedule", JSON.stringify(schedule));
    showSchedule(schedule);
  } else {
    showSchedule(schedule);
  }
});

btnMinMonth.addEventListener("click", () => {
  if (currentMonth > 0) {
    currentMonth--;
    monthItem.textContent = months[currentMonth];
    monthItem.id = currentMonth;

    scheduleBlock.innerHTML = "";
    showSchedule(schedule, undefined, currentMonth);
  }
});

btnPlusMont.addEventListener("click", () => {
  if (currentMonth < months.length) {
    currentMonth++;
    monthItem.textContent = months[currentMonth];
    monthItem.id = currentMonth;

    scheduleBlock.innerHTML = "";
    showSchedule(schedule, undefined, currentMonth);
  }
});

scheduleBlock.addEventListener("click", (e) => {
  const scheduleItem = e.target.closest("div");

  if (scheduleItem.id === "scheduleItem") {
    scheduleItem.classList.add("scheduleItemDayEvent");

    listItems.classList.add("listItemsShow");

    dayIndex = Number(e.target.textContent);
    // yearActive = Number(document.querySelector(".activeYear").textContent);

    const formDate = new FormData(form);
    const values = Object.fromEntries(formDate.entries());
    const { statusDay } = values;
    // console.log(["statusDay"], statusDay);
    // weekend, holiday, workHoliday, leaveOnRequest, hospital, birthday/
  }
});

btnClose.addEventListener("click", () => {
  listItems.classList.remove("listItemsShow");
});

form.addEventListener("submit", formSend);

async function formSend(e) {
  e.preventDefault();

  const formDate = new FormData(form);
  console.log(formDate);
  const values = Object.fromEntries(formDate.entries());
  const {
    statusDay,
    backshift: backshiftStatus,
    higherPower: higherPowerForm,
    addHours100: addHours100Form,
    addHours50: addHours50Form,
    addHours120: addHours120Form,
    time100,
    time50,
    time120,
    higherPowerTime,
    workDayTime,
  } = values;

  console.log(["backshiftStatus"], backshiftStatus);

  const yearActive = Number(document.querySelector(".activeYear").textContent);

  schedule[yearActive][Number(monthItem.id)][dayIndex - 1].statusDay =
    statusDay;

  const {
    addHours100,
    addHours120,
    addHours50,
    backshift,
    birthday,
    higherPower,
    holiday,
    hospital,
    leaveOnRequest,
    weekend,
    workDay,
    workHoliday,
  } = schedule[yearActive][Number(monthItem.id)][dayIndex - 1].dayInfo;

  if (statusDay === "workDay") {
    workDay.status = true;
    workDay.time = Number(workDayTime);
  } else {
    workDay.status = false;
    workDay.time = 0;
  }

  if (statusDay === "addHours100") {
    addHours100.status = true;
    addHours100.time = Number(time100);
  } else {
    addHours100.status = false;
    addHours100.time = 0;
  }

  backshiftStatus ? (backshift.status = true) : (backshift.status = false);

  if (addHours50Form) {
    addHours50.status = true;
    addHours50.time = Number(time50);
  } else {
    addHours50.status = false;
    addHours50.time = 0;
  }

  if (addHours120Form) {
    addHours120.status = true;
    addHours120.time = Number(time120);
  } else {
    addHours120.status = false;
    addHours120.time = 0;
  }

  if (higherPowerForm) {
    higherPower.status = true;
    higherPower.time = Number(higherPowerTime);
  } else {
    higherPower.status = false;
    higherPower.time = 0;
  }

  console.log(values);
  console.log(["schedule"], schedule);

  listItems.classList.remove("listItemsShow");

  localStorage.setItem("schedule", JSON.stringify(schedule));

  scheduleBlock.innerHTML = "";
  showSchedule(schedule, yearActive, Number(monthItem.id));
}

// listItems.addEventListener("click", (e) => {
//   if (!e.target.closest("ul")) {
//     listItems.classList.remove("listItemsShow");
//   } else if (e.target.tagName === "LI") {
//     console.log(["li"], e.target.tagName);
//     const dayStatus = e.target.id;
//     schedule[yearActive][Number(monthItem.id)][dayIndex - 1].statusDay =
//       dayStatus;
//     console.log(["scheduleDay"], schedule[yearActive][0]);

//     listItems.classList.remove("listItemsShow");

//     scheduleBlock.innerHTML = "";
//     showSchedule(schedule, yearActive, Number(monthItem.id));
//   }
// });

const removeLocalhost = document.querySelector(".removeLocalhoste");

removeLocalhost.addEventListener("click", () => {
  localStorage.removeItem("schedule");
});
