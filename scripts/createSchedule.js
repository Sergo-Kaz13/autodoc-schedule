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

      let statusDay = "workDay";
      if (numDayWeek === 5 || numDayWeek === 6) statusDay = "weekend";

      month.push({
        numberDay: numDayWeek,
        statusDay: statusDay,
        dayInfo: {
          workDay: {
            status: true,
            time: 8,
          },
          weekend: {
            status: false,
          },
          holiday: {
            status: false,
          },
          workHoliday: {
            status: false,
          },
          leaveOnRequest: {
            status: false,
          },
          hospital: {
            status: false,
          },
          birthday: {
            status: false,
          },
          backshift: {
            status: false,
          },
          higherPower: {
            status: false,
            time: 0,
          },
          addHours50: {
            status: false,
            time: 0,
          },
          addHours100: {
            status: false,
            time: 0,
          },
          addHours120: {
            status: false,
            time: 0,
          },
        },
      });
    }
    fullYear.push(month);
  }
  return fullYear;
}
