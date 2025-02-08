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
const dayInfoTable = document.querySelector(".dayInfoTable");
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
    // scheduleItem.classList.add("scheduleItemDayEvent");
    dayIndex = Number(e.target.textContent);

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
    } =
      schedule[Number(document.querySelector(".activeYear").textContent)][
        Number(monthItem.id)
      ][dayIndex - 1].dayInfo;

    console.log(["schedule"], schedule);

    console.log(["workDay.status"], workDay.status);
    console.log(["weekend"], weekend);

    const infoDay = `
      <tbody>
        ${
          backshift.status
            ? `
            <tr>
              <td>друга зміна</td>
              <td>14:00 - 22:00</td>
            </tr>
          `
            : `
              <tr>
                <td>перша зміна</td>
                <td>06:00 - 14:00</td>
              </tr>
            `
        }
        ${
          workDay.status
            ? `<tr>
          <td>Робочий день</td>
          <td>${workDay.time} год.</td>
        </tr>`
            : ``
        }
        ${
          weekend.status
            ? `
            <tr>
              <td>вихідний</td>
            </tr>
          `
            : ``
        }
        ${
          addHours100.status
            ? `
          <tr>
            <td>100%</td>
            <td>${addHours100.time} год.</td>
          </tr>
        `
            : ``
        }
        ${
          holiday.status
            ? `
          <tr>
            <td>святковий вихідний</td>
          </tr>
        `
            : ``
        }
        ${
          workHoliday.status
            ? `
            <tr>
              <td>відпустка</td>
            </tr>
          `
            : ``
        }
        ${
          leaveOnRequest.status
            ? `
            <tr>
              <td>відпустка на вимогу</td>
            </tr>
          `
            : ``
        }
        ${
          birthday.status
            ? `
            <tr>
              <td>вихідний до ДН 🎂🎈</td>
            </tr>
          `
            : ``
        }
        ${
          hospital.status
            ? `
            <tr>
              <td>лікарняний</td>
            </tr>
          `
            : ``
        }
        ${
          addHours50.status
            ? `
            <tr>
              <td>50%</td>
              <td>${addHours50.time} год.</td>
            </tr>
          `
            : ``
        }
        ${
          addHours120.status
            ? `
            <tr>
              <td>120%</td>
              <td>${addHours120.time} год.</td>
            </tr>
          `
            : ``
        }
        ${
          higherPower.status
            ? `
            <tr>
              <td>вища сила</td>
              <td>${higherPower.time} год.</td>
            </tr>
          `
            : ``
        }
      </tbody>
    `;

    console.log(["dayInfoTable"], dayInfoTable);

    dayInfoTable.innerHTML = infoDay;
    listItems.classList.add("listItemsShow");
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

  statusDay === "weekend" ? (weekend.status = true) : (weekend.status = false);
  statusDay === "holiday" ? (holiday.status = true) : (holiday.status = false);
  statusDay === "workHoliday"
    ? (workHoliday.status = true)
    : (workHoliday.status = false);
  statusDay === "leaveOnRequest"
    ? (leaveOnRequest.status = true)
    : (leaveOnRequest.status = false);
  statusDay === "birthday"
    ? (birthday.status = true)
    : (birthday.status = false);
  statusDay === "hospital"
    ? (hospital.status = true)
    : (hospital.status = false);

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

    if (statusDay === "workDay")
      workDay.time = workDay.time - Number(higherPowerTime);
    if (workDay.time === 0) workDay.status = false;
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

const removeLocalhost = document.querySelector(".removeLocalhoste");

removeLocalhost.addEventListener("click", () => {
  localStorage.removeItem("schedule");
});
