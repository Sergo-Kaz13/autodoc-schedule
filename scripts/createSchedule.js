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
        dayInfo: {
          dayWork: {
            status: true,
            time: 8,
          },
          weekend: {
            status: false,
          },
          holiday: {
            status: false,
          },
          100: {
            status: false,
            time: 0,
          },
          50: {
            status: false,
            time: 0,
          },
          120: {
            status: false,
            time: 0,
          },
          l4: {
            status: false,
          },
          eveningWorkShift: {
            status: false,
          },
          workHoliday: {
            status: false,
          },
        },
      });
    }
    fullYear.push(month);
  }
  return fullYear;
}
