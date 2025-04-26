function calculateNightBonus(time, minSalary) {
  const scheduleTime =
    time.workDayTime +
    time.workHolidayTime * 8 +
    time.leaveOnRequestTime * 8 +
    time.hospitalTime * 8 +
    time.higherPowerTime +
    time.birthdayTime * 8;

  console.log(["scheduleTime"], scheduleTime);
  const nightBonusHour = Number(((minSalary / scheduleTime) * 0.2).toFixed(2));
  console.log(["nightBonusHour"], nightBonusHour);

  document.querySelector(".rateHour").textContent = nightBonusHour;
  document.querySelector(".scheduleHoursMonth").textContent = scheduleTime;

  return nightBonusHour;
}

export default calculateNightBonus;
