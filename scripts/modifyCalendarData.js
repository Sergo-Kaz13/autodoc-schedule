function modifyCalendarData(data, el, schedule) {
  let elData = "";

  switch (el) {
    case "rateInput":
      elData = "rate";
      break;
    case "taxInput":
      elData = "tax";
      break;
    case "hospitalInput":
      elData = "hospitalRate";
      break;
    case "holidayInput":
      elData = "vacationPay";
      break;
    case "minSalaryInput":
      elData = "minSalary";
      break;
    case "editActualSalaryInput":
      elData = "actualSalary";
      break;
    default:
      elData = "";
      return;
  }

  const year = document.querySelector(".activeYear").textContent;
  const month = document.querySelector(".monthItem").id;

  for (const key in schedule) {
    if (Number(key) >= Number(year)) {
      if (Number(key) > Number(year)) {
        schedule[key].months.map((day) => {
          day[elData] = Number(data);
          return day;
        });
      } else if (Number(key) === Number(year)) {
        schedule[year].months.map((day, i) => {
          if (i >= Number(month)) {
            day[elData] = Number(data);
            return day;
          }
          return day;
        });
      }
    }
  }
}

export default modifyCalendarData;
