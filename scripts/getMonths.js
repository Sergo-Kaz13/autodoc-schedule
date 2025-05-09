function getMonths(schedule, totalMonths = 12) {
  const activeMonth = Number(document.querySelector(".monthItem").id);
  const activeYear = Number(document.querySelector(".activeYear").textContent);

  let months;

  if (activeMonth - totalMonths < 0) {
    months = schedule[activeYear].months.slice(0, activeMonth);

    if (activeYear - 1 in schedule) {
      const prevMonths = schedule[activeYear - 1].months.slice(
        -(totalMonths - prevMonths.length)
      );
      months = [...prevMonths, ...months];
    } else {
      console.log("Дані для обчислення відсутні!");
    }

    console.log(["averageSalaryMonths"], months);
  } else {
    months = schedule[activeYear].months.slice(
      activeMonth - totalMonths,
      activeMonth
    );
    console.log(["averageSalaryMonths"], months);
  }

  return months;
}

export default getMonths;
