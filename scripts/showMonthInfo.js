import calculateSalaryMonth from "./calculateSalaryMonth.js";
import renderMonthlyHours from "./renderMonthlyHours.js";
import renderSalaryMonth from "./renderSalaryMonth.js";

const showMonthInfo = (activeMonth, averageRate) => {
  const {
    rate,
    vacationPay,
    hospitalRate,
    tax,
    premiumPay,
    minSalary = "4666",
  } = activeMonth;

  renderMonthlyHours(activeMonth);
  const sumSalaryMonth = calculateSalaryMonth(activeMonth, averageRate);
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
    { selector: ".hospitalSpan", value: hospitalRate },
    { selector: ".holidaySpan", value: vacationPay },
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
