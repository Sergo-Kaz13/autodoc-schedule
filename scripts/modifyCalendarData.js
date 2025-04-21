function modifyCalendarData(data, el, schedule) {
  if (el !== "rateInput") return;

  const year = document.querySelector(".activeYear").textContent;
  const month = document.querySelector(".monthItem").id;

  for (const key in schedule) {
    if (Number(key) >= Number(year)) {
      if (Number(key) > Number(year)) {
        schedule[key].months.map((day) => {
          day.rate = Number(data);
          return day;
        });
      } else if (Number(key) === Number(year)) {
        schedule[year].months.map((day, i) => {
          if (i >= Number(month)) {
            day.rate = Number(data);
            return day;
          }
          return day;
        });
      }
    }
  }
}

export default modifyCalendarData;
