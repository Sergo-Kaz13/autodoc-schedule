import { daysInMonth } from "./daysInMonth.js";

export function createSchedule(year) {
  const fullYear = [];

  for (let i = 1; i < 13; i++) {
    const days = daysInMonth(i, year);

    const month = [];

    for (let j = 1; j <= days; j++) {
      let numDayWeek = new Date(`${year}-${i}-${j}`).getDay() - 1;
      numDayWeek =
        numDayWeek < 0 ? (numDayWeek = 6) : (numDayWeek = numDayWeek);

      let statusDay = "working";
      if (numDayWeek === 5 || numDayWeek === 6) statusDay = "weekend";

      month.push({
        numberDay: numDayWeek,
        statusDay: statusDay,
      });
    }
    fullYear.push(month);
  }
  return fullYear;
}
