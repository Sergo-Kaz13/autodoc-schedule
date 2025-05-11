function getMonths(schedule, totalMonths) {
  const activeMonth = Number(document.querySelector(".monthItem").id);
  const activeYear = Number(document.querySelector(".activeYear").textContent);

  let months;

  if (activeMonth - totalMonths < 0) {
    months = schedule[activeYear]?.months.slice(0, activeMonth);

    if (activeYear - 1 in schedule) {
      const prevMonths = schedule[activeYear - 1]?.months.slice(
        -(totalMonths - months.length)
      );
      months = [...prevMonths, ...months];
    } else {
      console.log("Дані для обчислення відсутні!");
    }
  } else {
    months = schedule[activeYear]?.months.slice(
      activeMonth - totalMonths,
      activeMonth
    );
  }

  return months;
}

export default getMonths;
