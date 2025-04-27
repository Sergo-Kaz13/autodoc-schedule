"use strict";

import calculateNightBonus from "./calculateNightBonus.js";
import calculateTimeMonth from "./calculateTimeMonth.js";

function calculateSalaryMonth(activeMonth) {
  const { rate, vacationPay, hospitalRate, minSalary } = activeMonth;

  const workPrice = document.querySelector(".workPrice");
  const dayTime100Price = document.querySelector(".time100Price");
  const time50Price = document.querySelector(".time50Price");
  const time120Price = document.querySelector(".time120Price");
  const higherPowerPrice = document.querySelector(".higherPowerPrice");
  const birthdayPrice = document.querySelector(".birthdayPrice");
  const workHolidayPrice = document.querySelector(".workHolidayPrice");
  const leaveOnRequestPrice = document.querySelector(".leaveOnRequestPrice");
  const hospitalPrice = document.querySelector(".hospitalPrice");

  const time = calculateTimeMonth(activeMonth);
  const nightBonusHour = calculateNightBonus(time, minSalary);
  let salaryMonthBrutto = 0;

  const sumWorkPrice = sumSalaryHoursType(time.workDayTime, rate);
  workPrice.textContent = sumWorkPrice;
  salaryMonthBrutto += sumWorkPrice;

  const sumDayTime100Price = sumSalaryHoursType(time.dayTime100, rate, 1, 2);
  dayTime100Price.textContent = sumDayTime100Price;
  salaryMonthBrutto += sumDayTime100Price;

  const sumTime50Price = sumSalaryHoursType(time.dayTime50, rate, 1, 1.5);
  time50Price.textContent = sumTime50Price;
  salaryMonthBrutto += sumTime50Price;

  const sumTime120Price = sumSalaryHoursType(
    time.dayTime120,
    rate,
    1,
    2,
    true,
    nightBonusHour
  );
  time120Price.textContent = sumTime120Price;
  salaryMonthBrutto += sumTime120Price;

  const sumHigherPowerPrice = sumSalaryHoursType(
    time.higherPowerTime,
    rate,
    1,
    0.5
  );
  higherPowerPrice.textContent = sumHigherPowerPrice;
  salaryMonthBrutto += sumHigherPowerPrice;

  const sumBirthdayPrice = sumSalaryHoursType(
    time.birthdayTime,
    rate,
    8,
    vacationPay / 100
  );
  birthdayPrice.textContent = sumBirthdayPrice;
  salaryMonthBrutto += sumBirthdayPrice;

  const sumWorkHolidayPrice = sumSalaryHoursType(
    time.workHolidayTime,
    rate,
    8,
    vacationPay / 100
  );
  workHolidayPrice.textContent = sumWorkHolidayPrice;
  salaryMonthBrutto += sumWorkHolidayPrice;

  const sumLeaveOnRequestPrice = sumSalaryHoursType(
    time.leaveOnRequestTime,
    rate,
    8,
    vacationPay / 100
  );
  leaveOnRequestPrice.textContent = sumLeaveOnRequestPrice;
  salaryMonthBrutto += sumLeaveOnRequestPrice;

  const sumHospitalPrice = sumSalaryHoursType(
    time.hospitalTime,
    rate,
    8,
    hospitalRate / 100
  );
  hospitalPrice.textContent = sumHospitalPrice;
  salaryMonthBrutto += sumHospitalPrice;

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

  return Number(salaryMonthBrutto.toFixed(2));
}

export default calculateSalaryMonth;
