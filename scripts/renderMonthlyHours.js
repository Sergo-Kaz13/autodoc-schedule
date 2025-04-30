import calculateTimeMonth from "./calculateTimeMonth.js";

function renderMonthlyHours(month) {
  const workDayTime = document.querySelector(".workDayTime");
  const dayTime100 = document.querySelector(".dayTime100");
  const dayTime50 = document.querySelector(".dayTime50");
  const dayTime120 = document.querySelector(".dayTime120");
  const higherPowerTime = document.querySelector(".higherPowerTime");
  const birthdayTime = document.querySelector(".birthdayTime");
  const workHolidayTime = document.querySelector(".workHolidayTime");
  const leaveOnRequestTime = document.querySelector(".leaveOnRequestTime");
  const hospitalTime = document.querySelector(".hospitalTime");
  const allWorkTime = document.querySelector(".hoursWorked");

  const allTime = calculateTimeMonth(month);

  const sumWorkTime =
    allTime.workDayTime +
    allTime.dayTime100 +
    allTime.dayTime50 +
    allTime.dayTime120;

  workDayTime.textContent = allTime.workDayTime;
  dayTime100.textContent = allTime.dayTime100;
  dayTime50.textContent = allTime.dayTime50;
  dayTime120.textContent = allTime.dayTime120;
  higherPowerTime.textContent = allTime.higherPowerTime;
  birthdayTime.textContent = allTime.birthdayTime;
  workHolidayTime.textContent = allTime.workHolidayTime;
  leaveOnRequestTime.textContent = allTime.leaveOnRequestTime;
  hospitalTime.textContent = allTime.hospitalTime;
  allWorkTime.textContent = sumWorkTime;
}

export default renderMonthlyHours;
