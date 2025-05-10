import calculateNightBonus from "./calculateNightBonus.js";
import calculateSalaryMonth from "./calculateSalaryMonth.js";
import calculateTimeMonth from "./calculateTimeMonth.js";
import renderMonthlyHours from "./renderMonthlyHours.js";
import renderSalaryMonth from "./renderSalaryMonth.js";

const showMonthInfo = (activeMonth, vacationRate, hospitalRate) => {
  const { rate, tax, premiumPay, minSalary = "4666" } = activeMonth;

  const rateHourNight = document.querySelector(".rateHour");
  const scheduleHoursMonth = document.querySelector(".scheduleHoursMonth");

  renderMonthlyHours(activeMonth);
  const time = calculateTimeMonth(activeMonth);

  const [nightBonusHour, scheduleTime] = calculateNightBonus(time, minSalary);

  rateHourNight.textContent = nightBonusHour;
  scheduleHoursMonth.textContent = scheduleTime;

  const sumSalaryMonth = calculateSalaryMonth(
    activeMonth,
    nightBonusHour,
    vacationRate,
    hospitalRate
  );
  renderSalaryMonth(sumSalaryMonth);

  const salaryMonthBrutto =
    Number(
      (
        sumSalaryMonth.sumWorkPrice +
        sumSalaryMonth.sumDayTime100Price +
        sumSalaryMonth.sumTime50Price +
        sumSalaryMonth.sumTime120Price +
        sumSalaryMonth.sumHigherPowerPrice +
        sumSalaryMonth.sumBirthdayPrice +
        sumSalaryMonth.sumWorkHolidayPrice +
        sumSalaryMonth.sumLeaveOnRequestPrice +
        sumSalaryMonth.sumHospitalPrice +
        premiumPay
      ).toFixed(2)
    ) || 0;

  const salaryMonthNetto = (
    salaryMonthBrutto -
    salaryMonthBrutto * (tax / 100)
  ).toFixed(2);

  const fields = [
    { selector: ".grossSalary", value: salaryMonthBrutto },
    { selector: ".salaryMonthNetto", value: salaryMonthNetto },
    { selector: ".rateSpan", value: rate },
    { selector: ".taxSpan", value: tax },
    // { selector: ".hospitalSpan", value: hospitalRate },
    // { selector: ".holidaySpan", value: vacationPay },
    // { selector: ".avg-salary-rate3", value: vacationPay },
    { selector: ".editPremiumSpan", value: premiumPay },
    { selector: ".minSalarySpan", value: minSalary },
  ];

  fields.forEach(({ selector, value }) => {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = value;
    }
  });
};

export default showMonthInfo;
