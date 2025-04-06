"use strict";

import changeDataSchedule from "./changeDataSchedule.js";

function editDataField(board = "", value = "", schedule) {
  const activeYear = document.querySelector(".activeYear").textContent;
  const activeMonthId = document.querySelector(".monthItem").id;

  const activeMonth = schedule[activeYear].months[activeMonthId];

  switch (board) {
    case ".editBoard":
      activeMonth.rate = Number(value);
      break;
    case ".taxBoard":
      activeMonth.tax = Number(value);
      break;
    case ".hospitalBoard":
      activeMonth.hospitalRate = Number(value);
      break;
    case ".holidayBoard":
      activeMonth.vacationPay = Number(value);
      break;
    case ".editPremium":
      activeMonth.premiumPay = Number(value);
      break;
    case ".editHolidayDays":
      schedule[activeYear].workHolidayDays = Number(value);
      break;
  }

  const request = indexedDB.open("AutodocSchedule", 1);

  request.onsuccess = function (event) {
    const db = event.target.result;
    changeDataSchedule(db, schedule);
  };
}

export default editDataField;
