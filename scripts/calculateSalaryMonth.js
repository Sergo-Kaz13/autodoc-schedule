"use strict";

import calculateTimeMonth from "./calculateTimeMonth.js";

function calculateSalaryMonth(
  activeMonth,
  nightBonusHour,
  vacationRate = false,
  hospitalRate = false
) {
  // const { vacationPay, hospitalRate } = activeMonth;
  const { rate } = activeMonth;

  const salary = {
    sumWorkPrice: 0,
    sumDayTime100Price: 0,
    sumTime50Price: 0,
    sumTime120Price: 0,
    sumHigherPowerPrice: 0,
    sumBirthdayPrice: 0,
    sumWorkHolidayPrice: 0,
    sumLeaveOnRequestPrice: 0,
    sumHospitalPrice: 0,
  };
  const time = calculateTimeMonth(activeMonth);

  salary.sumWorkPrice = sumSalaryHoursType(time.workDayTime, rate);
  salary.sumDayTime100Price = sumSalaryHoursType(time.dayTime100, rate, 1, 2);
  salary.sumTime50Price = sumSalaryHoursType(time.dayTime50, rate, 1, 1.5);
  salary.sumTime120Price = sumSalaryHoursType(
    time.dayTime120,
    rate,
    1,
    2,
    true,
    nightBonusHour
  );
  salary.sumHigherPowerPrice = sumSalaryHoursType(
    time.higherPowerTime,
    rate,
    1,
    0.5
  );

  if (hospitalRate) {
    salary.sumHospitalPrice = sumSalaryHoursType(
      time.hospitalTime,
      1,
      1,
      hospitalRate
    );
  }

  if (vacationRate) {
    salary.sumBirthdayPrice = sumSalaryHoursType(
      time.birthdayTime,
      vacationRate,
      8
    );
    salary.sumWorkHolidayPrice = sumSalaryHoursType(
      time.workHolidayTime,
      vacationRate,
      8
    );
    salary.sumLeaveOnRequestPrice = sumSalaryHoursType(
      time.leaveOnRequestTime,
      vacationRate,
      8
    );
  }

  function sumSalaryHoursType(
    time,
    rate,
    workdayToHours = 1,
    overtimeBonusRate = 1,
    hasNightBonus = false,
    nightBonusHour = 1
  ) {
    const baseSalary = time * rate * workdayToHours * overtimeBonusRate;
    const nightBonus = hasNightBonus ? time * nightBonusHour : 0;
    return Number((baseSalary + nightBonus).toFixed(2));
  }

  return salary;
}

export default calculateSalaryMonth;
