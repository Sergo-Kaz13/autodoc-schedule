import { daysInMonth } from "./daysInMonth.js";

export function createSchedule(year, decemberData = null) {
  console.log(decemberData);

  const fullYear = {
    workHolidayDays: 24,
    leaveOnRequestDays: 4,
    higherPowerTime: 16,
    birthday: 1,
    salaryYear: 0,
    months: [],
  };

  for (let i = 1; i < 13; i++) {
    const days = daysInMonth(i, year);

    const month = {
      rate: decemberData?.rate ?? 31.5,
      tax: decemberData?.tax ?? 27,
      hospitalRate: decemberData?.hospitalRate ?? 63.3,
      vacationPay: decemberData?.vacationPay ?? 100,
      minSalary: decemberData?.minSalary ?? 4666,
      premiumPay: 0,
      days: [],
    };

    for (let j = 1; j <= days; j++) {
      let numDayWeek = new Date(year, i - 1, j).getDay() - 1;
      numDayWeek =
        numDayWeek < 0 ? (numDayWeek = 6) : (numDayWeek = numDayWeek);

      let statusDay = "workDay";
      let time = 8;
      let workStatus = true;
      let weekendStatus = false;
      if (numDayWeek === 5 || numDayWeek === 6) {
        statusDay = "weekend";
        time = 0;
        workStatus = false;
        weekendStatus = true;
      }

      month.days.push({
        numberDay: numDayWeek,
        statusDay: statusDay,
        dayInfo: {
          workDay: {
            status: workStatus,
            time: time,
          },
          weekend: {
            status: weekendStatus,
          },
          holiday: {
            status: false,
          },
          workHoliday: {
            status: false,
            day: 0,
          },
          leaveOnRequest: {
            status: false,
            day: 0,
          },
          hospital: {
            status: false,
            day: 0,
          },
          birthday: {
            status: false,
            day: 0,
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
    fullYear.months.push(month);
  }
  return fullYear;
}
