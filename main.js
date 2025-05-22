"use strict";

import { showSchedule } from "./scripts/showSchedule.js";
import { months, scheduleBlock } from "./scripts/data.js";
import { createSchedule } from "./scripts/createSchedule.js";
import sumSalaryDay from "./scripts/sumSalaryDay.js";
import createDayInfo from "./scripts/createDayInfo.js";
import toggleInputActive from "./scripts/toggleInputActive.js";
import calculateUrlop from "./scripts/calculateUrlop.js";
import modalUrlopInfo from "./scripts/modalUrlopInfo.js";
import checkDataWithGetAll from "./scripts/checkDataWithGetAll.js";
import changeDataSchedule from "./scripts/changeDataSchedule.js";
import getDecemberData from "./scripts/getDecemberData.js";
import showMonthInfo from "./scripts/showMonthInfo.js";
import setTodayDate from "./scripts/setTodayDate.js";

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
const modalWindow = document.querySelector(".listItemsBlock");
const scrollModal = document.querySelector(".listItemsEvents");
const periodMonths = document.querySelector("#periodMonths");

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
          showSchedule(schedule);
        } else {
          schedule = JSON.parse(localStorage.getItem("schedule")) || {};
          if (Object.keys(schedule).length !== 0) {
            changeDataSchedule(db, schedule);
            showSchedule(schedule);
          } else {
            const year = new Date().getFullYear();
            schedule[year] = createSchedule(year);
            changeDataSchedule(db, schedule);
            showSchedule(schedule);
          }
        }

        // ++++++++++++
        toggleInputActive(".editBoard", "rateSpan", "rateInput", schedule);
        toggleInputActive(".taxBoard", "taxSpan", "taxInput", schedule);
        toggleInputActive(
          ".editHolidayDays",
          "holidayDaysSpan",
          "holidayDaysInput",
          schedule
        );
        toggleInputActive(
          ".editPremium",
          "editPremiumSpan",
          "editPremiumInput",
          schedule
        );
        toggleInputActive(
          ".minSalaryBlock",
          "minSalarySpan",
          "minSalaryInput",
          schedule
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
    const newActiveYear =
      Number(document.querySelector(".activeYear").textContent) - 1;
    activeYear.textContent = newActiveYear;
    monthItem.textContent = months[currentMonth];
    monthItem.id = currentMonth;

    if (!(newActiveYear in schedule)) {
      const newYear = createSchedule(newActiveYear);
      schedule[newActiveYear] = newYear;
    }
  }
  monthItem.textContent = months[currentMonth];
  monthItem.id = currentMonth;
  const activeYearItem = Number(
    document.querySelector(".activeYear").textContent
  );

  scheduleBlock.innerHTML = "";
  showSchedule(schedule, activeYearItem, currentMonth);

  const request = indexedDB.open("AutodocSchedule", 1);

  request.onsuccess = function (event) {
    const db = event.target.result;
    changeDataSchedule(db, schedule);
  };
});

btnPlusMont.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    const newActiveYear =
      Number(document.querySelector(".activeYear").textContent) + 1;
    activeYear.textContent = newActiveYear;
    monthItem.textContent = months[currentMonth];
    monthItem.id = currentMonth;

    if (!(newActiveYear in schedule)) {
      const decemberDate = getDecemberData(schedule[newActiveYear - 1]);

      const newYear = createSchedule(newActiveYear, decemberDate);
      schedule[newActiveYear] = newYear;
    }
  }
  monthItem.textContent = months[currentMonth];
  monthItem.id = currentMonth;
  const activeYearItem = Number(
    document.querySelector(".activeYear").textContent
  );

  scheduleBlock.innerHTML = "";
  showSchedule(schedule, activeYearItem, currentMonth);

  const request = indexedDB.open("AutodocSchedule", 1);

  request.onsuccess = function (event) {
    const db = event.target.result;
    changeDataSchedule(db, schedule);
  };
});

scheduleBlock.addEventListener("click", (e) => {
  const scheduleItem = e.target.closest("div");

  if (scheduleItem.classList.contains("scheduleItem")) {
    dayIndex = Number(scheduleItem.id);

    const today =
      schedule[Number(document.querySelector(".activeYear").textContent)]
        .months[Number(monthItem.id)].days[dayIndex - 1].dayInfo;
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
      schedule[Number(document.querySelector(".activeYear").textContent)]
        .months[Number(monthItem.id)];

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
      hospitalRate
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
    listItems.classList.remove("listItemsShow");

    document.body.style.overflow = "auto";
    document.body.style.position = "";

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

  const yearActive = Number(document.querySelector(".activeYear").textContent);

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

  const { statusDay: statusDayActive } =
    schedule[yearActive].months[Number(monthItem.id)].days[dayIndex - 1];

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
      listItems.classList.remove("listItemsShow");
      document.body.style.overflow = "auto";
      document.body.style.position = "";
      return;
    } else if (urlopData.workHolidayUsed >= workHolidayDays) {
      if (statusDayActive !== "leaveOnRequest") {
        modalUrlopInfo("Основна відпустка використана.");
        return;
      }
    }
  } else if (statusDay === "leaveOnRequest") {
    if (statusDay === statusDayActive) {
      listItems.classList.remove("listItemsShow");
      document.body.style.overflow = "auto";
      document.body.style.position = "";
      return;
    } else if (urlopData.leaveOnRequestUsed === leaveOnRequestDays) {
      modalUrlopInfo("Відпустка на вимогу використана.");
      return;
    } else if (
      urlopData.vacationBalance <= 0 &&
      statusDayActive !== "workHoliday"
    ) {
      modalUrlopInfo(
        "Відпустка на вимогу не може бути використана, так як не залишилося основної відпустки."
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
        } год.`
      );
      return;
    }
  }

  //============= START ===============

  if (statusDay === "workDay") {
    workDay.status = true;
    workDay.time = Number(workDayTime);
    schedule[yearActive].months[Number(monthItem.id)].days[
      dayIndex - 1
    ].statusDay = statusDay;
  } else {
    workDay.status = false;
    workDay.time = 0;
  }

  if (statusDay === "addHours100") {
    addHours100.status = true;
    addHours100.time = Number(time100);
    schedule[yearActive].months[Number(monthItem.id)].days[
      dayIndex - 1
    ].statusDay = statusDay;
  } else {
    addHours100.status = false;
    addHours100.time = 0;
  }

  if (statusDay === "workHoliday") {
    workHoliday.status = true;
    workHoliday.day = 1;
    schedule[yearActive].months[Number(monthItem.id)].days[
      dayIndex - 1
    ].statusDay = statusDay;
  } else {
    workHoliday.status = false;
    workHoliday.day = 0;
  }

  if (statusDay === "leaveOnRequest") {
    leaveOnRequest.status = true;
    leaveOnRequest.day = 1;
    schedule[yearActive].months[Number(monthItem.id)].days[
      dayIndex - 1
    ].statusDay = statusDay;
  } else {
    leaveOnRequest.status = false;
    leaveOnRequest.day = 0;
  }

  if (statusDay === "birthday") {
    birthday.status = true;
    birthday.day = 1;
    schedule[yearActive].months[Number(monthItem.id)].days[
      dayIndex - 1
    ].statusDay = statusDay;
  } else {
    birthday.status = false;
    birthday.day = 0;
  }

  if (statusDay === "hospital") {
    hospital.status = true;
    hospital.day = 1;
    schedule[yearActive].months[Number(monthItem.id)].days[
      dayIndex - 1
    ].statusDay = statusDay;
  } else {
    hospital.status = false;
    hospital.day = 0;
  }

  if (statusDay === "weekend") {
    weekend.status = true;
    schedule[yearActive].months[Number(monthItem.id)].days[
      dayIndex - 1
    ].statusDay = statusDay;
  } else {
    weekend.status = false;
  }

  if (statusDay === "holiday") {
    holiday.status = true;
    schedule[yearActive].months[Number(monthItem.id)].days[
      dayIndex - 1
    ].statusDay = statusDay;
  } else {
    holiday.status = false;
  }

  backshiftStatus ? (backshift.status = true) : (backshift.status = false);

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
    // workDay.time = workDay.time - Number(higherPowerTime);
    workDay.time = 8 - Number(higherPowerTime);
    if (workDay.time === 0) workDay.status = false;
  } else {
    higherPower.status = false;
    higherPower.time = 0;
  }

  // ============= END ================

  listItems.classList.remove("listItemsShow");
  document.body.style.overflow = "auto";
  document.body.style.position = "";

  const request = indexedDB.open("AutodocSchedule", 1);

  request.onsuccess = function (event) {
    const db = event.target.result;
    changeDataSchedule(db, schedule);
  };

  scheduleBlock.innerHTML = "";
  showSchedule(schedule, yearActive, Number(monthItem.id));

  document.body.style.overflow = "auto";
  document.body.style.position = "";

  form.reset();
}

periodMonths.addEventListener("change", (e) => {
  const value = e.target.value;
  schedule.periodSalary = Number(value);

  const request = indexedDB.open("AutodocSchedule", 1);
  request.onsuccess = function (event) {
    const db = event.target.result;
    changeDataSchedule(db, schedule);
  };

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
