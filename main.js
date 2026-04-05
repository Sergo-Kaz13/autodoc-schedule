"use strict";

import { showSchedule } from "./scripts/showSchedule.js";
import { months, scheduleBlock } from "./scripts/data.js";
import { createSchedule } from "./scripts/createSchedule.js";
import sumSalaryDay from "./scripts/sumSalaryDay.js";
import createDayInfo from "./scripts/createDayInfo.js";
import toggleInputActive from "./scripts/toggleInputActive.js";
import calculateUrlop from "./scripts/calculations/calculateUrlop.js";
import modalUrlopInfo from "./scripts/modalUrlopInfo.js";
import checkDataWithGetAll from "./scripts/checkDataWithGetAll.js";
import changeDataSchedule from "./scripts/changeDataSchedule.js";
import getDecemberData from "./scripts/getDecemberData.js";
import showMonthInfo from "./scripts/showMonthInfo.js";
import setTodayDate from "./scripts/setTodayDate.js";
import switchGreenToOrange from "./scripts/switchGreenToOrange.js";
import sendNewUserId from "./scripts/sendNewUserId.js";
import { saveSchedule } from "./scripts/saveSchedule.js";

const { form } = document.forms;

console.log(["Hello!!!!"], "Hello!!!!");

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
const modalWindow = document.querySelector(".listItemsBlock");
const scrollModal = document.querySelector(".listItemsEvents");
const periodMonths = document.querySelector("#periodMonths");
const switchShift = document.querySelector("#shiftOptions");
const actualSalaryChecken = document.querySelector("#actualSalary");

const getActiveYear = () => Number(activeYear.textContent);
const getActiveMonth = () => Number(monthItem.id);

function closeModal() {
  listItems.classList.remove("listItemsShow");
  document.body.style.overflow = "auto";
  document.body.style.position = "";
}

activeYear.textContent = currentYear;
monthItem.textContent = months[currentMonth];
monthItem.id = currentMonth;

window.addEventListener("DOMContentLoaded", () => {
  const request = indexedDB.open("AutodocSchedule", 1);
  request.onupgradeneeded = function (event) {
    const db = event.target.result;

    console.log(db);
    if (!db.objectStoreNames.contains("schedule")) {
      db.createObjectStore("schedule", { keyPath: "id" });
      console.log("Hello my frend!!!");
    }
  };

  request.onsuccess = function (event) {
    const db = event.target.result;
    console.log("База даних відкрита:", db);
    checkDataWithGetAll(db)
      .then((result) => {
        if (Object.keys(result).length !== 0) {
          schedule = result;
          switchGreenToOrange(schedule);
          showSchedule(schedule);
          // sendNewUserId(schedule);
        } else {
          schedule = JSON.parse(localStorage.getItem("schedule")) || {};
          if (Object.keys(schedule).length !== 0) {
            changeDataSchedule(db, schedule);
            switchGreenToOrange(schedule);
            showSchedule(schedule);
            // sendNewUserId(schedule);
          } else {
            const year = new Date().getFullYear();
            schedule[year] = createSchedule(year);
            changeDataSchedule(db, schedule);
            switchGreenToOrange(schedule);
            showSchedule(schedule);
            // sendNewUserId(schedule);
          }
        }

        // ++++++++++++
        toggleInputActive(".editBoard", "rateSpan", "rateInput", schedule);
        toggleInputActive(".taxBoard", "taxSpan", "taxInput", schedule);
        toggleInputActive(
          ".editHolidayDays",
          "holidayDaysSpan",
          "holidayDaysInput",
          schedule,
        );
        toggleInputActive(
          ".editPremium",
          "editPremiumSpan",
          "editPremiumInput",
          schedule,
        );
        toggleInputActive(
          ".minSalaryBlock",
          "minSalarySpan",
          "minSalaryInput",
          schedule,
        );
        toggleInputActive(
          ".editActualSalary",
          "editActusalSalarySpan",
          "editActualSalaryInput",
          schedule,
        );
        // +++++++++++++
      })
      .catch((err) => {
        console.error(err);
      });
  };

  request.onerror = function (event) {
    console.log("Помилка відкриття бази:", event.target.error);
  };
});

btnMinMonth.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    const newActiveYear = getActiveYear() - 1;
    activeYear.textContent = newActiveYear;
    monthItem.textContent = months[currentMonth];
    monthItem.id = currentMonth;

    if (!(newActiveYear in schedule)) {
      const newYear = createSchedule(newActiveYear);
      schedule[newActiveYear] = newYear;
      switchGreenToOrange(
        schedule,
        newActiveYear,
        undefined,
        true,
        "decrement",
      );
    }
  }
  monthItem.textContent = months[currentMonth];
  monthItem.id = currentMonth;
  const activeYearItem = getActiveYear();

  scheduleBlock.innerHTML = "";
  showSchedule(schedule, activeYearItem, currentMonth);
  saveSchedule(schedule);
});

btnPlusMont.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    const newActiveYear = getActiveYear() + 1;
    activeYear.textContent = newActiveYear;
    monthItem.textContent = months[currentMonth];
    monthItem.id = currentMonth;

    if (!(newActiveYear in schedule)) {
      const decemberDate = getDecemberData(schedule[newActiveYear - 1]);

      const newYear = createSchedule(newActiveYear, decemberDate);
      schedule[newActiveYear] = newYear;
      switchGreenToOrange(
        schedule,
        newActiveYear,
        undefined,
        true,
        "increment",
      );
    }
  }
  monthItem.textContent = months[currentMonth];
  monthItem.id = currentMonth;
  const activeYearItem = getActiveYear();

  scheduleBlock.innerHTML = "";
  showSchedule(schedule, activeYearItem, currentMonth);
  saveSchedule(schedule);
});

scheduleBlock.addEventListener("click", (e) => {
  const scheduleItem = e.target.closest("div");

  if (scheduleItem.classList.contains("scheduleItem")) {
    dayIndex = Number(scheduleItem.id);

    const today =
      schedule[getActiveYear()].months[getActiveMonth()].days[dayIndex - 1]
        .dayInfo;
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
    } = today;

    const { rate, vacationPay, hospitalRate } =
      schedule[getActiveYear()].months[getActiveMonth()];

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
      rate,
      vacationPay,
      hospitalRate,
    ).toFixed(2);
    const dayInfo = dayIndex < 10 ? "0" + dayIndex : dayIndex;
    const monthInfo = getActiveMonth() + 1;
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
      salaryDay,
    );

    dayInfoTable.innerHTML = infoDay;
    listItems.classList.add("listItemsShow");

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    scrollModal.scrollTop = 0;

    setTodayDate(today);
  }
});

modalWindow.addEventListener("click", (e) => {
  const el = e.target;
  if (
    el.classList.contains("btnClose") ||
    el.classList.contains("listItemsBlock")
  ) {
    closeModal();
    form.reset();
  }
});

form.addEventListener("submit", formSend);

async function formSend(e) {
  e.preventDefault();

  const formDate = new FormData(form);
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

  const yearActive = getActiveYear();
  const monthActive = getActiveMonth();

  const currentDay =
    schedule[yearActive].months[monthActive].days[dayIndex - 1];
  const currentDayInfo = currentDay.dayInfo;

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
  } = currentDayInfo;

  const { statusDay: statusDayActive } = currentDay;

  const {
    birthday: birthdayYear,
    higherPowerTime: higherPowerTimeYear,
    leaveOnRequestDays,
    workHolidayDays,
  } = schedule[yearActive];

  const urlopData = calculateUrlop(schedule);

  if (statusDay === "birthday") {
    if (urlopData.birthdayUsed === birthdayYear) {
      modalUrlopInfo("Вихідний до ДН використаний.");
      return;
    }
  } else if (statusDay === "workHoliday") {
    if (statusDay === statusDayActive) {
      closeModal();
      return;
    } else if (urlopData.workHolidayUsed >= workHolidayDays) {
      if (statusDayActive !== "leaveOnRequest") {
        modalUrlopInfo("Основна відпустка використана.");
        return;
      }
    }
  } else if (statusDay === "leaveOnRequest") {
    if (statusDay === statusDayActive) {
      closeModal();
      return;
    } else if (urlopData.leaveOnRequestUsed === leaveOnRequestDays) {
      modalUrlopInfo("Відпустка на вимогу використана.");
      return;
    } else if (
      urlopData.vacationBalance <= 0 &&
      statusDayActive !== "workHoliday"
    ) {
      modalUrlopInfo(
        "Відпустка на вимогу не може бути використана, так як не залишилося основної відпустки.",
      );
      return;
    }
  } else if (higherPowerForm) {
    if (
      urlopData.higherPowerUsed + Number(higherPowerTime) >
      higherPowerTimeYear
    ) {
      modalUrlopInfo(
        `Вища сила, залишилося ${
          higherPowerTimeYear - urlopData.higherPowerUsed
        } год.`,
      );
      return;
    }
  }

  //============= START ===============

  const statusConfig = {
    workDay: {
      obj: workDay,
      field: "time",
      value: Number(workDayTime),
    },
    addHours100: {
      obj: addHours100,
      field: "time",
      value: Number(time100),
    },
    workHoliday: {
      obj: workHoliday,
      field: "day",
      value: 1,
    },
    leaveOnRequest: {
      obj: leaveOnRequest,
      field: "day",
      value: 1,
    },
    birthday: {
      obj: birthday,
      field: "day",
      value: 1,
    },
    hospital: {
      obj: hospital,
      field: "day",
      value: 1,
    },
    weekend: {
      obj: weekend,
      field: null,
      value: null,
    },
    holiday: {
      obj: holiday,
      field: null,
      value: null,
    },
  };

  for (const [key, config] of Object.entries(statusConfig)) {
    const isActive = statusDay === key;

    config.obj.status = isActive;

    if (config.field) {
      config.obj[config.field] = isActive ? config.value : 0;
    }

    if (isActive) {
      currentDay.statusDay = key;
    }
  }

  backshift.status = Boolean(backshiftStatus);

  if (
    addHours50Form &&
    (statusDay === "workDay" || statusDay === "addHours100")
  ) {
    addHours50.status = true;
    addHours50.time = Number(time50);
  } else {
    addHours50.status = false;
    addHours50.time = 0;
  }

  if (
    addHours120Form &&
    (statusDay === "workDay" || statusDay === "addHours100")
  ) {
    addHours120.status = true;
    addHours120.time = Number(time120);
  } else {
    addHours120.status = false;
    addHours120.time = 0;
  }

  if (higherPowerForm && statusDay === "workDay") {
    higherPower.status = true;
    higherPower.time = Number(higherPowerTime);
    workDay.time = 8 - Number(higherPowerTime);
    if (workDay.time === 0) workDay.status = false;
  } else {
    higherPower.status = false;
    higherPower.time = 0;
  }

  // ============= END ================

  closeModal();
  saveSchedule(schedule);
  scheduleBlock.innerHTML = "";
  showSchedule(schedule, yearActive, monthActive);
  form.reset();
}

periodMonths.addEventListener("change", (e) => {
  const value = e.target.value;
  schedule.periodSalary = Number(value);
  saveSchedule(schedule);
  showMonthInfo(schedule);
});

switchShift.addEventListener("change", (e) => {
  const value = e.target.value;
  const activeYear = getActiveYear();

  schedule[activeYear].shift = value;
  schedule[activeYear].months[getActiveMonth()].shift = value;
  switchGreenToOrange(schedule, activeYear, getActiveMonth(), true);
  saveSchedule(schedule);
  scheduleBlock.innerHTML = "";
  showSchedule(schedule, activeYear, getActiveMonth());
});

actualSalaryChecken.addEventListener("change", (e) => {
  schedule.showActualSalary = e.target.checked;
  saveSchedule(schedule);
  showMonthInfo(schedule);
});

// modal install
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  console.log("📦 beforeinstallprompt fired!");
  e.preventDefault(); // зупиняємо авто-появу банера
  deferredPrompt = e;

  // Показуємо модальне вікно
  const modal = document.getElementById("install-modal");
  const closeBtn = document.getElementById("close-btn");
  modal.style.display = "block";

  const installBtn = document.getElementById("install-btn");
  installBtn.addEventListener("click", () => {
    modal.style.display = "none";

    // Показати системне вікно встановлення
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("Користувач погодився на встановлення");
      } else {
        console.log("Користувач відмовився");
      }
      deferredPrompt = null;
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
