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
import switchGreenToOrange from "./scripts/switchGreenToOrange.js";
import sendNewUserId from "./scripts/sendNewUserId.js";

const { form } = document.forms;

let schedule = null;
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
let editingDayIndices = [];
const selectedDayIndices = new Set();
let multiSelectMode = false;

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
const toggleMultiSelect = document.querySelector("#toggleMultiSelect");
const multiSelectControls = document.querySelector("#multiSelectControls");
const selectedDaysCount = document.querySelector("#selectedDaysCount");
const editSelectedDays = document.querySelector("#editSelectedDays");
const clearSelectedDays = document.querySelector("#clearSelectedDays");

activeYear.textContent = currentYear;
monthItem.textContent = months[currentMonth];
monthItem.id = currentMonth;

function updateSelectedDaysControls() {
  toggleMultiSelect.textContent = multiSelectMode
    ? "Завершити вибір"
    : "Вибрати кілька днів";
  multiSelectControls.hidden = !multiSelectMode && selectedDayIndices.size === 0;
  selectedDaysCount.textContent = `Вибрано: ${selectedDayIndices.size}`;
  editSelectedDays.disabled = selectedDayIndices.size === 0;
}

function clearDaySelection() {
  selectedDayIndices.clear();
  document
    .querySelectorAll(".scheduleItem.multiSelected")
    .forEach((day) => day.classList.remove("multiSelected"));
  updateSelectedDaysControls();
}

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
          sendNewUserId(schedule);
        } else {
          schedule = JSON.parse(localStorage.getItem("schedule")) || {};
          if (Object.keys(schedule).length !== 0) {
            changeDataSchedule(db, schedule);
            switchGreenToOrange(schedule);
            showSchedule(schedule);
            sendNewUserId(schedule);
          } else {
            const year = new Date().getFullYear();
            schedule[year] = createSchedule(year);
            changeDataSchedule(db, schedule);
            switchGreenToOrange(schedule);
            showSchedule(schedule);
            sendNewUserId(schedule);
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
        toggleInputActive(
          ".editActualSalary",
          "editActualSalarySpan",
          "editActualSalaryInput",
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
  clearDaySelection();
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
      switchGreenToOrange(
        schedule,
        newActiveYear,
        undefined,
        true,
        "decrement"
      );
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
  clearDaySelection();
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
      switchGreenToOrange(
        schedule,
        newActiveYear,
        undefined,
        true,
        "increment"
      );
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

function openDayEditor(dayIndices) {
  editingDayIndices = dayIndices;
  const yearActive = Number(activeYear.textContent);
  const monthIndex = Number(monthItem.id);
  const month = schedule[yearActive].months[monthIndex];
  const firstDay = month.days[dayIndices[0] - 1];
  form.reset();

  if (dayIndices.length === 1) {
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
    } = firstDay.dayInfo;
    const { rate, vacationPay, hospitalRate } = month;
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
    const dayInfo = dayIndices[0] < 10 ? "0" + dayIndices[0] : dayIndices[0];
    const monthInfo = monthIndex + 1;
    const monthInfoStr = monthInfo < 10 ? "0" + monthInfo : monthInfo;

    dayInfoTable.innerHTML = createDayInfo(
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
  } else {
    const selectedDates = dayIndices
      .map((day) => `${day}.${String(monthIndex + 1).padStart(2, "0")}`)
      .join(", ");
    dayInfoTable.innerHTML = `
      <thead><tr><th>Зміни для ${dayIndices.length} днів</th></tr></thead>
      <tbody><tr><td>${selectedDates}</td></tr></tbody>
    `;
  }

  listItems.classList.add("listItemsShow");
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  scrollModal.scrollTop = 0;
  setTodayDate(firstDay.dayInfo);
}

toggleMultiSelect.addEventListener("click", () => {
  multiSelectMode = !multiSelectMode;
  if (multiSelectMode) {
    updateSelectedDaysControls();
  } else {
    clearDaySelection();
  }
});

editSelectedDays.addEventListener("click", () => {
  if (selectedDayIndices.size) {
    openDayEditor(Array.from(selectedDayIndices).sort((a, b) => a - b));
  }
});

clearSelectedDays.addEventListener("click", clearDaySelection);

scheduleBlock.addEventListener("click", (e) => {
  const scheduleItem = e.target.closest(".scheduleItem");
  if (!scheduleItem) return;

  const dayIndex = Number(scheduleItem.id);
  if (multiSelectMode) {
    if (selectedDayIndices.has(dayIndex)) {
      selectedDayIndices.delete(dayIndex);
      scheduleItem.classList.remove("multiSelected");
    } else {
      selectedDayIndices.add(dayIndex);
      scheduleItem.classList.add("multiSelected");
    }
    updateSelectedDaysControls();
    return;
  }

  openDayEditor([dayIndex]);
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

    editingDayIndices = [];
    form.reset();
  }
});

form.addEventListener("submit", formSend);

function applyFormToDay(day, values) {
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
  } = day.dayInfo;

  day.statusDay = statusDay;
  workDay.status = statusDay === "workDay";
  workDay.time = workDay.status ? Number(workDayTime) : 0;
  addHours100.status = statusDay === "addHours100";
  addHours100.time = addHours100.status ? Number(time100) : 0;
  workHoliday.status = statusDay === "workHoliday";
  workHoliday.day = workHoliday.status ? 1 : 0;
  leaveOnRequest.status = statusDay === "leaveOnRequest";
  leaveOnRequest.day = leaveOnRequest.status ? 1 : 0;
  birthday.status = statusDay === "birthday";
  birthday.day = birthday.status ? 1 : 0;
  hospital.status = statusDay === "hospital";
  hospital.day = hospital.status ? 1 : 0;
  weekend.status = statusDay === "weekend";
  holiday.status = statusDay === "holiday";
  backshift.status = Boolean(backshiftStatus);

  addHours50.status =
    Boolean(addHours50Form) &&
    (statusDay === "workDay" || statusDay === "addHours100");
  addHours50.time = addHours50.status ? Number(time50) : 0;
  addHours120.status =
    Boolean(addHours120Form) &&
    (statusDay === "workDay" || statusDay === "addHours100");
  addHours120.time = addHours120.status ? Number(time120) : 0;
  higherPower.status = Boolean(higherPowerForm) && statusDay === "workDay";
  higherPower.time = higherPower.status ? Number(higherPowerTime) : 0;

  if (higherPower.status) {
    workDay.time = 8 - Number(higherPowerTime);
    if (workDay.time === 0) workDay.status = false;
  }
}

function formSend(e) {
  e.preventDefault();
  const values = Object.fromEntries(new FormData(form).entries());
  const yearActive = Number(activeYear.textContent);
  const monthIndex = Number(monthItem.id);
  if (!editingDayIndices.length) return;

  const candidateSchedule = JSON.parse(JSON.stringify(schedule));
  editingDayIndices.forEach((dayIndex) => {
    applyFormToDay(
      candidateSchedule[yearActive].months[monthIndex].days[dayIndex - 1],
      values
    );
  });

  const currentUsage = calculateUrlop(schedule, false);
  const updatedUsage = calculateUrlop(candidateSchedule, false);
  const {
    birthday: birthdayLimit,
    higherPowerTime: higherPowerLimit,
    leaveOnRequestDays,
    workHolidayDays,
  } = schedule[yearActive];

  if (
    updatedUsage.leaveOnRequestUsed > currentUsage.leaveOnRequestUsed &&
    updatedUsage.leaveOnRequestUsed > leaveOnRequestDays
  ) {
    modalUrlopInfo("Відпустка на вимогу використана.");
    return;
  }
  if (
    updatedUsage.birthdayUsed > currentUsage.birthdayUsed &&
    updatedUsage.birthdayUsed > birthdayLimit
  ) {
    modalUrlopInfo("Вихідний до ДН використаний.");
    return;
  }
  if (
    updatedUsage.workHolidayUsed > currentUsage.workHolidayUsed &&
    updatedUsage.workHolidayUsed > workHolidayDays
  ) {
    modalUrlopInfo(
      values.statusDay === "leaveOnRequest"
        ? "Відпустка на вимогу не може бути використана, так як не залишилося основної відпустки."
        : "Основна відпустка використана."
    );
    return;
  }
  if (
    updatedUsage.higherPowerUsed > currentUsage.higherPowerUsed &&
    updatedUsage.higherPowerUsed > higherPowerLimit
  ) {
    modalUrlopInfo(
      `Вища сила, залишилося ${
        higherPowerLimit - currentUsage.higherPowerUsed
      } год.`
    );
    return;
  }

  editingDayIndices.forEach((dayIndex) => {
    const day = schedule[yearActive].months[monthIndex].days[dayIndex - 1];
    Object.assign(
      day,
      candidateSchedule[yearActive].months[monthIndex].days[dayIndex - 1]
    );
  });

  listItems.classList.remove("listItemsShow");
  document.body.style.overflow = "auto";
  document.body.style.position = "";
  editingDayIndices = [];
  selectedDayIndices.clear();
  multiSelectMode = false;
  updateSelectedDaysControls();
  form.reset();

  const request = indexedDB.open("AutodocSchedule", 1);
  request.onsuccess = function (event) {
    const db = event.target.result;
    changeDataSchedule(db, schedule);
  };

  scheduleBlock.innerHTML = "";
  showSchedule(schedule, yearActive, monthIndex, selectedDayIndices);
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

switchShift.addEventListener("change", (e) => {
  const value = e.target.value;
  const activeYear = Number(document.querySelector(".activeYear").textContent);

  schedule[activeYear].shift = value;
  schedule[activeYear].months[Number(monthItem.id)].shift = value;
  switchGreenToOrange(schedule, activeYear, Number(monthItem.id), true);

  const request = indexedDB.open("AutodocSchedule", 1);
  request.onsuccess = function (event) {
    const db = event.target.result;
    changeDataSchedule(db, schedule);
  };

  scheduleBlock.innerHTML = "";
  showSchedule(
    schedule,
    activeYear,
    Number(monthItem.id),
    selectedDayIndices
  );
});

actualSalaryChecken.addEventListener("change", (e) => {
  if (e.target.checked) {
    schedule.showActualSalary = true;
  } else {
    schedule.showActualSalary = false;
  }

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
