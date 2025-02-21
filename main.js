// "use strict";

import { showSchedule } from "./scripts/showSchedule.js";
import { months, scheduleBlock } from "./scripts/data.js";
import { createSchedule } from "./scripts/createSchedule.js";
import sumSalaryDay from "./scripts/sumSalaryDay.js";
import createDayInfo from "./scripts/createDayInfo.js";
import toggleInputActive from "./scripts/toggleInputActive.js";

const { form } = document.forms;

let schedule = null;

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

let dayIndex = null;

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
    console.log(["schedule"], schedule);
  }
  toggleInputActive(".editBoard", "rateSpan", "rateInput");
  toggleInputActive(".taxBoard", "taxSpan", "taxInput");
  toggleInputActive(".hospitalBoard", "hospitalSpan", "hospitalInput");
  toggleInputActive(".holidayBoard", "holidaySpan", "holidayInput");
  toggleInputActive(".editHolidayDays", "holidayDaysSpan", "holidayDaysInput");
  toggleInputActive(".editPremium", "editPremiumSpan", "editPremiumInput");
  toggleInputActive(".editHospital", "editHospitalSpan", "editHospitalInput");
  toggleInputActive(
    ".editWorkHoliday",
    "editWorkHolidaySpan",
    "editWorkHolidayInput"
  );
  toggleInputActive(
    ".editLeaveOnRequest",
    "editLeaveOnRequestSpan",
    "editLeaveOnRequestInput"
  );
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
  if (currentMonth < months.length - 1) {
    currentMonth++;
    monthItem.textContent = months[currentMonth];
    monthItem.id = currentMonth;

    scheduleBlock.innerHTML = "";
    showSchedule(schedule, undefined, currentMonth);
  }
});

// toggleInputActive(".editBoard", "rateSpan", "rateInput");

scheduleBlock.addEventListener("click", (e) => {
  const scheduleItem = e.target.closest("div");

  if (scheduleItem.id === "scheduleItem") {
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
      schedule[Number(document.querySelector(".activeYear").textContent)]
        .months[Number(monthItem.id)].days[dayIndex - 1].dayInfo;

    console.log(["schedule"], schedule);

    const salaryDay = sumSalaryDay(
      addHours100,
      addHours120,
      addHours50,
      birthday,
      higherPower,
      hospital,
      leaveOnRequest,
      workDay,
      workHoliday,
      31.5
    ).toFixed(2);
    const dayInfo = dayIndex < 10 ? "0" + dayIndex : dayIndex;
    const monthInfo = Number(monthItem.id) + 1;
    const monthInfoStr = monthInfo < 10 ? "0" + monthInfo : monthInfo;

    const infoDay = createDayInfo(
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
      dayInfo,
      monthInfoStr,
      salaryDay
    );

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

  schedule[yearActive].months[Number(monthItem.id)].days[
    dayIndex - 1
  ].statusDay = statusDay;

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
    schedule[yearActive].months[Number(monthItem.id)].days[dayIndex - 1]
      .dayInfo;

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

  if (statusDay === "workHoliday") {
    workHoliday.status = true;
    workHoliday.day = 1;
  } else {
    workHoliday.status = false;
    workHoliday.day = 0;
  }

  if (statusDay === "leaveOnRequest") {
    leaveOnRequest.status = true;
    leaveOnRequest.day = 1;
  } else {
    leaveOnRequest.status = false;
    leaveOnRequest.day = 0;
  }

  if (statusDay === "birthday") {
    birthday.status = true;
    birthday.day = 1;
  } else {
    birthday.status = false;
    birthday.day = 0;
  }

  if (statusDay === "hospital") {
    hospital.status = true;
    hospital.day = 1;
  } else {
    hospital.status = false;
    hospital.day = 0;
  }

  // Доробити цю секцію

  statusDay === "weekend" ? (weekend.status = true) : (weekend.status = false);
  statusDay === "holiday" ? (holiday.status = true) : (holiday.status = false);
  // statusDay === "workHoliday"
  //   ? (workHoliday.status = true)
  //   : (workHoliday.status = false);
  // statusDay === "leaveOnRequest"
  //   ? (leaveOnRequest.status = true)
  //   : (leaveOnRequest.status = false);
  // statusDay === "birthday"
  //   ? (birthday.status = true)
  //   : (birthday.status = false);
  // statusDay === "hospital"
  //   ? (hospital.status = true)
  //   : (hospital.status = false);

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
