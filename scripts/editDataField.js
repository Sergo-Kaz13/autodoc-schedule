"use strict";

function editDataField(board = "", value = "", schedule) {
  const activeYear = document.querySelector(".activeYear").textContent;
  const activeMonthId = document.querySelector(".monthItem").id;

  const activeMonth = schedule[activeYear].months[activeMonthId];
  console.log(["activeMonth"], activeMonth);

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
  }
  localStorage.setItem("schedule", JSON.stringify(schedule));
}

export default editDataField;
