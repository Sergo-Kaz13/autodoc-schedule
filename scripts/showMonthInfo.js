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

  let salaryMonthBrutto = 0;

  salaryMonthBrutto += calculateSalaryMonth(activeMonth);

  // salaryMonthBrutto += calculateSalaryMonth(
  //   ".workDayTime",
  //   ".workPrice",
  //   allTime.workDayTime,
  //   rate
  // );
  // salaryMonthBrutto += calculateSalaryMonth(
  //   ".dayTime100",
  //   ".time100Price",
  //   allTime.dayTime100,
  //   rate,
  //   2
  // );
  // salaryMonthBrutto += calculateSalaryMonth(
  //   ".dayTime50",
  //   ".time50Price",
  //   allTime.dayTime50,
  //   rate,
  //   1.5
  // );
  // salaryMonthBrutto += calculateSalaryMonth(
  //   ".dayTime120",
  //   ".time120Price",
  //   allTime.dayTime120,
  //   rate,
  //   2.2
  // );
  // salaryMonthBrutto += calculateSalaryMonth(
  //   ".higherPowerTime",
  //   ".higherPowerPrice",
  //   allTime.higherPowerTime,
  //   rate,
  //   0.5
  // );
  // salaryMonthBrutto += calculateSalaryMonth(
  //   ".birthdayTime",
  //   ".birthdayPrice",
  //   allTime.birthdayTime,
  //   rate,
  //   vacationPay / 100
  // );
  // salaryMonthBrutto += calculateSalaryMonth(
  //   ".workHolidayTime",
  //   ".workHolidayPrice",
  //   allTime.workHolidayTime,
  //   rate,
  //   vacationPay / 100
  // );
  // salaryMonthBrutto += calculateSalaryMonth(
  //   ".leaveOnRequestTime",
  //   ".leaveOnRequestPrice",
  //   allTime.leaveOnRequestTime,
  //   rate,
  //   vacationPay / 100
  // );
  // salaryMonthBrutto += calculateSalaryMonth(
  //   ".hospitalTime",
  //   ".hospitalPrice",
  //   allTime.hospitalTime,
  //   rate,
  //   hospitalRate / 100
  // );
  // salaryMonthBrutto += premiumPay;

  document.querySelector(".grossSalary").textContent =
    salaryMonthBrutto.toFixed(2);
  document.querySelector(".salaryMonthNetto").textContent = (
    salaryMonthBrutto -
    (salaryMonthBrutto / 100) * tax
  ).toFixed(2);
  document.querySelector(".rateSpan").textContent = rate;
  document.querySelector(".taxSpan").textContent = tax;
  document.querySelector(".hospitalSpan").textContent = hospitalRate;
  document.querySelector(".holidaySpan").textContent = vacationPay;
  // document.querySelector(".holidaySpan").textContent =
  //   calculateAverageSalary(schedule);
  document.querySelector(".editPremiumSpan").textContent = premiumPay;
  document.querySelector(".minSalarySpan").textContent = minSalary;
};

export default showMonthInfo;
