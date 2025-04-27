function calculateAverageSalary(schedule, totalMonths = 12) {
  const activeMonth = Number(document.querySelector(".monthItem").id);
  const activeYear = Number(document.querySelector(".activeYear").textContent);

  let averageSalaryMonths;
  // debugger;
  if (activeMonth - totalMonths < 0) {
    console.log(["hello"], "hello");

    const prevAverageSalaryMonths = schedule[activeYear].months.slice(
      0,
      activeMonth
    );

    averageSalaryMonths = schedule[activeYear - 1].months.slice(
      -(totalMonths - prevAverageSalaryMonths.length)
    );
    averageSalaryMonths = [...averageSalaryMonths, ...prevAverageSalaryMonths];
  } else {
    averageSalaryMonths = schedule[activeYear].months.slice(
      activeMonth - totalMonths,
      activeMonth
    );
  }

  console.log(["activeYear"], activeYear);
  console.log(["activeMonth"], activeMonth);
  console.log(["averageSalaryMonths"], averageSalaryMonths);

  return 10;
}

export default calculateAverageSalary;
