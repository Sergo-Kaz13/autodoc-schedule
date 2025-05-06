function calculateNightBonus(time, minSalary) {
  const scheduleTime =
    time.workDayTime +
    time.workHolidayTime * 8 +
    time.leaveOnRequestTime * 8 +
    time.hospitalTime * 8 +
    time.higherPowerTime +
    time.birthdayTime * 8;

  const nightBonusHour = Number(((minSalary / scheduleTime) * 0.2).toFixed(2));

  return [nightBonusHour, scheduleTime];
}

export default calculateNightBonus;
