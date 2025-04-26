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

  const salaryMonthBrutto = calculateSalaryMonth(activeMonth) || 0;
  const salaryMonthNetto = (
    salaryMonthBrutto -
    salaryMonthBrutto * (tax / 100)
  ).toFixed(2);

  document.querySelector(".grossSalary").textContent = salaryMonthBrutto;
  document.querySelector(".salaryMonthNetto").textContent = salaryMonthNetto;
  document.querySelector(".rateSpan").textContent = rate;
  document.querySelector(".taxSpan").textContent = tax;
  document.querySelector(".hospitalSpan").textContent = hospitalRate;
  document.querySelector(".holidaySpan").textContent = vacationPay;
  document.querySelector(".editPremiumSpan").textContent = premiumPay;
  document.querySelector(".minSalarySpan").textContent = minSalary;
};

export default showMonthInfo;
