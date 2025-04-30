"use strict";

import calculateNightBonus from "./calculateNightBonus.js";
import calculateTimeMonth from "./calculateTimeMonth.js";

function calculateSalaryMonth(activeMonth) {
  console.log(["acativeMonth"], activeMonth);

  const { rate, vacationPay, hospitalRate, minSalary = "4666" } = activeMonth;

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
  const nightBonusHour = calculateNightBonus(time, minSalary);

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

  salary.sumBirthdayPrice = sumSalaryHoursType(
    time.birthdayTime,
    rate,
    8,
    vacationPay / 100
  );

  salary.sumWorkHolidayPrice = sumSalaryHoursType(
    time.workHolidayTime,
    rate,
    8,
    vacationPay / 100
  );

  salary.sumLeaveOnRequestPrice = sumSalaryHoursType(
    time.leaveOnRequestTime,
    rate,
    8,
    vacationPay / 100
  );

  salary.sumHospitalPrice = sumSalaryHoursType(
    time.hospitalTime,
    rate,
    8,
    hospitalRate / 100
  );

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
