import calculateAverageSalary from "./calculateAverageSalary.js";
import calculateSalaryMonth from "./calculateSalaryMonth.js";

const showMonthInfo = (activeMonth, schedule) => {
  const {
    rate,
    vacationPay,
    hospitalRate,
    tax,
    premiumPay,
    minSalary = "4666",
  } = activeMonth;

  const salaryMonthBrutto = calculateSalaryMonth(activeMonth) + premiumPay || 0;
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

  calculateAverageSalary(schedule);
};

export default showMonthInfo;
