import calculateSalaryForPeriod from "./calculateSalaryForPeriod.js";

function calculateAverageSalary(schedule, totalMonths = 12) {
  const activeMonth = Number(document.querySelector(".monthItem").id);
  const activeYear = Number(document.querySelector(".activeYear").textContent);

  let averageSalaryMonths;

  if (activeMonth - totalMonths < 0) {
    averageSalaryMonths = schedule[activeYear].months.slice(0, activeMonth);

    if (activeYear - 1 in schedule) {
      const prevAverageSalaryMonths = schedule[activeYear - 1].months.slice(
        -(totalMonths - prevAverageSalaryMonths.length)
      );
      averageSalaryMonths = [
        ...prevAverageSalaryMonths,
        ...averageSalaryMonths,
      ];
    } else {
      console.log("Дані для обчислення відсутні!");
    }

    console.log(["averageSalaryMonths"], averageSalaryMonths);
  } else {
    averageSalaryMonths = schedule[activeYear].months.slice(
      activeMonth - totalMonths,
      activeMonth
    );
    console.log(["averageSalaryMonths"], averageSalaryMonths);
  }

  const averageRate = calculateSalaryForPeriod(averageSalaryMonths);

  schedule[activeYear].months[activeMonth].vacationPay = averageRate;

  console.log(schedule[activeYear].months[activeMonth]);
  return averageRate;
}

export default calculateAverageSalary;
