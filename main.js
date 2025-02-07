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
    higherPower,
    addHours100,
    addHours50,
    addHours120,
    time100,
    time50,
    time120,
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
    higherPowe,
    holiday,
    hospital,
    leaveOnRequest,
    weekend,
    workDay,
    workHoliday,
  } = schedule[yearActive][Number(monthItem.id)][dayIndex - 1].dayInfo;

  if (statusDay === "workDay") {
    schedule[yearActive][Number(monthItem.id)][
      dayIndex - 1
    ].dayInfo.workDay.status = true;
    // schedule[yearActive][Number(monthItem.id)][
    //   dayIndex - 1
    // ].dayInfo.workDay.time = Number(workDayTime);
    workDay.time = Number(workDayTime);
  } else if (statusDay === "addHours100") {
    console.log(["time100"], time100);
  }

  // console.log(["backshift"], backshift);

  // backshiftStatus !== undefined
  //   ? (backshift.status = true)
  //   : (backshift.status = false);

  // console.log(["backshift"], backshift);

  console.log(values);
  console.log(["schedule"], schedule);

  listItems.classList.remove("listItemsShow");

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
