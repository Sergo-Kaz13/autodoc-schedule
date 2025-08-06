import calculateHourlyRate from "./calculateHourlyRate.js";
import calculateNightBonus from "./calculateNightBonus.js";
import calculateSalaryMonth from "./calculateSalaryMonth.js";
import calculateSalaryNetto from "./calculateSalaryNetto.js";
import calculateTimeMonth from "./calculateTimeMonth.js";
import getMonths from "./getMonths.js";
import renderMonthlyHours from "./renderMonthlyHours.js";
import renderSalaryMonth from "./renderSalaryMonth.js";

const showMonthInfo = (schedule) => {
  const actualSalaryChecken = document.querySelector("#actualSalary");
  const periodMonths = document.querySelector("#periodMonths");
  const activeYearItem = Number(
    document.querySelector(".activeYear").textContent
  );
  const monthIndex = Number(document.querySelector(".monthItem").id);
  const activeMonth = schedule[activeYearItem].months[monthIndex];

  const {
    rate,
    tax,
    premiumPay,
    minSalary = "4666",
    actualSalary = 0,
  } = activeMonth;

  const showActualSalary = schedule?.showActualSalary;
  actualSalaryChecken.checked = showActualSalary;

  if (showActualSalary) {
    document.querySelector(".actualSalary").classList.add("activeActualSalary");
  } else {
    document
      .querySelector(".actualSalary")
      .classList.remove("activeActualSalary");
  }

  const salaryMonths = schedule.periodSalary ?? 3;
  periodMonths.value = salaryMonths;

  const workedMonths = getMonths(schedule, salaryMonths);
  const [vacationRate] = calculateHourlyRate(workedMonths);

  const sickPayMonths = getMonths(schedule, 12);
  const [, hospitalRate] = calculateHourlyRate(sickPayMonths, vacationRate);

  renderMonthlyHours(activeMonth);
  const time = calculateTimeMonth(activeMonth);

  const [nightBonusHour] = calculateNightBonus(time, minSalary);
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

  // const salaryMonthNetto = (
  //   salaryMonthBrutto -
  //   salaryMonthBrutto * (tax / 100)
  // ).toFixed(2);

  const salaryMonthNetto = calculateSalaryNetto(salaryMonthBrutto);

  const salaryDifference = Number((actualSalary - salaryMonthNetto).toFixed(2));

  const fields = [
    { selector: ".grossSalary", value: salaryMonthBrutto },
    { selector: ".salaryMonthNetto", value: salaryMonthNetto },
    { selector: ".rateSpan", value: rate },
    { selector: ".taxSpan", value: tax },
    { selector: ".editPremiumSpan", value: premiumPay },
    { selector: ".minSalarySpan", value: minSalary },
    { selector: ".editActualSalarySpan", value: actualSalary },
    { selector: ".salaryDifference", value: salaryDifference },
  ];

  fields.forEach(({ selector, value }) => {
    const element = document.querySelector(selector);
    if (element) {
      if (selector === ".salaryMonthNetto") {
        element.textContent = "≈ " + value;
      } else {
        element.textContent = value;
      }
    }
  });
};

export default showMonthInfo;
