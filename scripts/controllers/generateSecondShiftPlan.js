const SHIFT_CONFIG = {
  a: {
    workDays: [0, 1, 2, 3, 4],
    status: (current) => (current ? "firstShift" : "secondShift"),
  },
  b: {
    workDays: [0, 1, 2, 3, 4],
    status: (current) => (current ? "secondShift" : "firstShift"),
  },
  night: {
    workDays: [6, 0, 1, 2, 3],
    status: () => "nightShift",
  },
};

function resetDayInfo(dayInfo) {
  for (const key in dayInfo) {
    const item = dayInfo[key];
    if ("status" in item) item.status = false;
    if ("time" in item) item.time = 0;
    if ("day" in item) item.day = 0;
  }
}

function isDefaultDay(day) {
  const { dayInfo } = day;
  return (
    dayInfo.workDay.status === true &&
    dayInfo.higherPower.status === false &&
    dayInfo.addHours50.status === false &&
    dayInfo.addHours120.status === false
  );
}

function generateSecondShiftPlan(
  shiftPeriod,
  shiftName = "a",
  numberMonth = false,
) {
  console.log(["shiftName"], shiftName);
  const { months } = shiftPeriod;
  const config = SHIFT_CONFIG[shiftName];
  let current = false;

  months.forEach((month, index) => {
    if (numberMonth !== false && numberMonth > index) {
      month.days.forEach(({ numberDay }) => {
        if (numberDay === 5) current = !current;
      });
      return;
    }

    month.shift = shiftName;

    month.days.forEach((day) => {
      const { numberDay, dayInfo } = day;
      // night — просто виставляємо всім

      const isWeekend =
        shiftName === "night"
          ? numberDay === 5 || numberDay === 4
          : numberDay === 5 || numberDay === 6;

      if (isWeekend) {
        if (numberDay === 5) current = !current;
        if (!isDefaultDay(day)) return;
        resetDayInfo(dayInfo);
        day.statusDay = "weekend";
        dayInfo.weekend.status = true;
        return;
      }

      if (day.statusDay === "workDay" || day.statusDay === "weekend") {
        day.dayInfo.weekend.status = false;
        day.statusDay = "workDay";
        dayInfo.workDay.status = true;
        dayInfo.workDay.time = 8;
        dayInfo.backshift.status =
          shiftName === "night" ? "nightShift" : config.status(current);
      } else if (day.statusDay === "addHours100") {
        console.log(["day.statusDay"], day.statusDay);

        dayInfo.backshift.status =
          shiftName === "night" ? "nightShift" : config.status(current);
      }
    });
  });
}

export default generateSecondShiftPlan;
