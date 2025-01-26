"use strict";

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

let schedule = null;

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

let dayIndex = null;
let monthActive = null;
let yearActive = null;

const scheduleBlock = document.querySelector(".schedule");
const activeYear = document.querySelector(".activeYear");
const monthItem = document.querySelector(".monthItem");
const btnMinMonth = document.querySelector(".btnLeft");
const btnPlusMont = document.querySelector(".btnRight");
const listItems = document.querySelector(".listItemsBlock");

activeYear.textContent = currentYear;
monthItem.textContent = months[currentMonth];

window.addEventListener("DOMContentLoaded", () => {
  schedule = JSON.parse(localStorage.getItem("schedule")) || {};

  const year = new Date().getFullYear();

  if (Object.keys(schedule).length === 0) {
    schedule[year] = createSchedule(year);
    localStorage.setItem("schedule", JSON.stringify(schedule));
    showSchedule(schedule);
  } else {
    showSchedule(schedule);
    console.log(["schedule"], schedule);
  }
});

btnMinMonth.addEventListener("click", () => {
  if (currentMonth > 0) {
    currentMonth--;
    monthItem.textContent = months[currentMonth];

    scheduleBlock.innerHTML = "";
    showSchedule(schedule, undefined, currentMonth);
  }
});

btnPlusMont.addEventListener("click", () => {
  if (currentMonth < months.length) {
    currentMonth++;
    monthItem.textContent = months[currentMonth];

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
    console.log(["dayIndex"], dayIndex);
    yearActive = Number(document.querySelector(".activeYear").textContent);
    console.log(["activeYear"], yearActive);
  }
});

listItems.addEventListener("click", (e) => {
  if (!e.target.closest("ul")) {
    listItems.classList.remove("listItemsShow");
  } else if (e.target.tagName === "LI") {
    console.log(["li"], e.target.tagName);
    const dayStatus = e.target.id;
    console.log(["dayStatus"], dayStatus);

    console.log(["scheduleDay"], schedule[yearActive][1]);
  }
});

function showSchedule(schedule, year, month) {
  year = year !== undefined ? (year = year) : new Date().getFullYear();
  month = month !== undefined ? (month = month) : new Date().getMonth();

  const currentYear = schedule[year];
  const activeMonth = currentYear[month];

  const currentMonth = new Date().getMonth();
  const currentDate = new Date().getDate();

  activeMonth.map((day, i) => {
    if (i === 0) {
      for (let j = 0; j < day.numberDay; j++) {
        const fakeDay = document.createElement("div");
        scheduleBlock.append(fakeDay);
      }

      const div = document.createElement("div");
      const span = document.createElement("span");
      span.textContent = i + 1;
      div.append(span);
      div.id = "scheduleItem";
      if (day.numberDay === 5 || day.numberDay === 6) {
        div.classList.add("scheduleItem", "scheduleItemDayOff");
        if (i + 1 === currentDate && currentMonth === month) {
          div.classList.add("currentDate");
        }
      } else {
        div.classList.add("scheduleItem", "scheduleItemWork");
        if (i + 1 === currentDate && currentMonth === month) {
          div.classList.add("currentDate");
        }
      }
      scheduleBlock.append(div);
    } else {
      const div = document.createElement("div");
      const span = document.createElement("span");
      span.textContent = i + 1;
      div.append(span);
      div.id = "scheduleItem";
      if (day.numberDay === 5 || day.numberDay === 6) {
        div.classList.add("scheduleItem", "scheduleItemDayOff");
        if (i + 1 === currentDate && currentMonth === month) {
          div.classList.add("currentDate");
        }
      } else {
        div.classList.add("scheduleItem", "scheduleItemWork");
        if (i + 1 === currentDate && currentMonth === month) {
          div.classList.add("currentDate");
        }
      }
      scheduleBlock.append(div);
    }
  });
}

function createSchedule(year) {
  const fullYear = [];

  for (let i = 1; i < 13; i++) {
    const days = daysInMonth(i, year);

    const month = [];

    for (let j = 1; j <= days; j++) {
      let numDayWeek = new Date(`${year}-${i}-${j}`).getDay() - 1;
      numDayWeek =
        numDayWeek < 0 ? (numDayWeek = 6) : (numDayWeek = numDayWeek);

      let statusDay = "working";
      if (numDayWeek === 5 || numDayWeek === 6) statusDay = "weekend";

      month.push({
        numberDay: numDayWeek,
        statusDay: statusDay,
      });
    }
    fullYear.push(month);
  }
  return fullYear;
}

// function createSchedule(month, year) {
//   const date = new Date();
//   year = year !== undefined ? (year = year) : date.getFullYear();
//   month = month !== undefined ? (month = month) : date.getMonth() + 1;
//   let numDayWeek = new Date(`${year}-${month}-01`).getDay() - 1;
//   const numDaysMonth = daysInMonth(month, year);

//   numDayWeek = numDayWeek < 0 ? (numDayWeek = 6) : (numDayWeek = numDayWeek);

//   let daysSchedule = numDaysMonth + numDayWeek;

//   while (!(daysSchedule % 7 === 0)) {
//     daysSchedule++;
//   }

//   const monthItem = document.querySelector(".monthItem");
//   const schedule = document.querySelector(".schedule");

//   schedule.classList.add("schedule");
//   monthItem.textContent = months[month - 1];

//   let startDayDate = 1;

//   for (let index = 0; index < daysSchedule; index++) {
//     const scheduleItem = document.createElement("div");
//     const span = document.createElement("span");
//     if (index >= numDayWeek && index <= numDaysMonth + numDayWeek - 1) {
//       span.textContent = startDayDate;
//       startDayDate++;
//       scheduleItem.classList.add("scheduleItemWork");
//     }
//     scheduleItem.classList.add("scheduleItem");

//     if (
//       index >= numDayWeek &&
//       index <= numDaysMonth + numDayWeek - 1 &&
//       (index === 5 ||
//         index === 6 ||
//         index === 12 ||
//         index === 13 ||
//         index === 19 ||
//         index === 20 ||
//         index === 26 ||
//         index === 27 ||
//         index === 33 ||
//         index === 34)
//     ) {
//       scheduleItem.classList.add("scheduleItemDayOff");
//     }
//     scheduleItem.append(span);
//     schedule.append(scheduleItem);
//   }
// }

function daysInMonth(month, year) {
  month = month + 1;
  if (month > 12) month = month - 12;
  year = year != undefined ? year : new Date().getFullYear();
  let d = new Date(year + "-" + month + "-01");
  d.setDate(0);
  d = d.getDate();

  return d;
}
