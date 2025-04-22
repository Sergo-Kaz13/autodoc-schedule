import calculateAverageSalary from "./calculateAverageSalary.js";
import calculateSalaryMonth from "./calculateSalaryMonth.js";

const showMonthInfo = (activeMonth, schedule) => {
  const { rate, vacationPay, hospitalRate, tax, premiumPay, days } =
    activeMonth;

  let salaryMonthBrutto = 0;

  const allTime = {
    workDayTime: 0,
    dayTime100: 0,
    dayTime50: 0,
    dayTime120: 0,
    higherPowerTime: 0,
    birthdayTime: 0,
    workHolidayTime: 0,
    leaveOnRequestTime: 0,
    hospitalTime: 0,
  };

  days.forEach((day) => {
    const { dayInfo } = day;

    for (const key in dayInfo) {
      switch (key) {
        case "workDay":
          dayInfo[key].status ? (allTime.workDayTime += dayInfo[key].time) : "";
          break;
        case "addHours100":
          dayInfo[key].status ? (allTime.dayTime100 += dayInfo[key].time) : "";
          break;
        case "addHours50":
          dayInfo[key].status ? (allTime.dayTime50 += dayInfo[key].time) : "";
          break;
        case "addHours120":
          dayInfo[key].status ? (allTime.dayTime120 += dayInfo[key].time) : "";
          break;
        case "higherPower":
          dayInfo[key].status
            ? (allTime.higherPowerTime += dayInfo[key].time)
            : "";
          break;
        case "birthday":
          dayInfo[key].status ? (allTime.birthdayTime += 1) : "";
          break;
        case "workHoliday":
          dayInfo[key].status ? (allTime.workHolidayTime += 1) : "";
          break;
        case "leaveOnRequest":
          dayInfo[key].status ? (allTime.leaveOnRequestTime += 1) : "";
          break;
        case "hospital":
          dayInfo[key].status ? (allTime.hospitalTime += 1) : "";
          break;
      }
    }
  });

  salaryMonthBrutto += calculateSalaryMonth(
    ".workDayTime",
    ".workPrice",
    allTime.workDayTime,
    rate
  );
  salaryMonthBrutto += calculateSalaryMonth(
    ".dayTime100",
    ".time100Price",
    allTime.dayTime100,
    rate,
    2
  );
  salaryMonthBrutto += calculateSalaryMonth(
    ".dayTime50",
    ".time50Price",
    allTime.dayTime50,
    rate,
    1.5
  );
  salaryMonthBrutto += calculateSalaryMonth(
    ".dayTime120",
    ".time120Price",
    allTime.dayTime120,
    rate,
    2.2
  );
  salaryMonthBrutto += calculateSalaryMonth(
    ".higherPowerTime",
    ".higherPowerPrice",
    allTime.higherPowerTime,
    rate,
    0.5
  );
  salaryMonthBrutto += calculateSalaryMonth(
    ".birthdayTime",
    ".birthdayPrice",
    allTime.birthdayTime,
    rate,
    vacationPay / 100
  );
  salaryMonthBrutto += calculateSalaryMonth(
    ".workHolidayTime",
    ".workHolidayPrice",
    allTime.workHolidayTime,
    rate,
    vacationPay / 100
  );
  salaryMonthBrutto += calculateSalaryMonth(
    ".leaveOnRequestTime",
    ".leaveOnRequestPrice",
    allTime.leaveOnRequestTime,
    rate,
    vacationPay / 100
  );
  salaryMonthBrutto += calculateSalaryMonth(
    ".hospitalTime",
    ".hospitalPrice",
    allTime.hospitalTime,
    rate,
    hospitalRate / 100
  );
  salaryMonthBrutto += premiumPay;

  const sumWorkTime =
    allTime.workDayTime +
    allTime.dayTime100 +
    allTime.dayTime50 +
    allTime.dayTime120;

  document.querySelector(".hoursWorked").textContent = sumWorkTime;
  document.querySelector(".grossSalary").textContent =
    salaryMonthBrutto.toFixed(2);
  document.querySelector(".salaryMonthNetto").textContent = (
    salaryMonthBrutto -
    (salaryMonthBrutto / 100) * tax
  ).toFixed(2);
  document.querySelector(".rateSpan").textContent = rate;
  document.querySelector(".taxSpan").textContent = tax;
  document.querySelector(".hospitalSpan").textContent = hospitalRate;
  // document.querySelector(".holidaySpan").textContent = vacationPay;
  document.querySelector(".holidaySpan").textContent =
    calculateAverageSalary(schedule);
  document.querySelector(".editPremiumSpan").textContent = premiumPay;
};

export default showMonthInfo;
