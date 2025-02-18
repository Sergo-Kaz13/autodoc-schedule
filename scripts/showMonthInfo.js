const showMonthInfo = (activeMonth) => {
  const { rate, days } = activeMonth;

  const allTime = {
    workDayTime: 0,
    dayTime100: 0,
    dayTime50: 0,
    dayTime120: 0,
    higherPowerTime: 0,
    workHolidayTime: 0,
    hospitalTime: 0,
  };

  days.forEach((day) => {
    const { dayInfo } = day;

    for (const key in dayInfo) {
      switch (key) {
        case "workDay":
          dayInfo[key].status ? (allTime.workDayTime += dayInfo[key].time) : "";
          break;
        case "addHours100":
          dayInfo[key].status ? (allTime.dayTime100 += dayInfo[key].time) : "";
          break;
        case "addHours50":
          dayInfo[key].status ? (allTime.dayTime50 += dayInfo[key].time) : "";
          break;
        case "addHours120":
          dayInfo[key].status ? (allTime.dayTime120 += dayInfo[key].time) : "";
          break;
        case "higherPower":
          dayInfo[key].status
            ? (allTime.higherPowerTime += dayInfo[key].time)
            : "";
          break;
        case "workHoliday":
          dayInfo[key].status ? (allTime.workHolidayTime += 1) : "";
          break;
        case "hospital":
          dayInfo[key].status ? (allTime.hospitalTime += 1) : "";
          break;
        case "leaveOnRequest":
          dayInfo[key].status ? (allTime.workHolidayTime += 1) : "";
          break;
      }
    }
  });

  console.log(["time"], allTime.workDayTime);

  console.log(["allTime.workDayTime"], allTime);
};

export default showMonthInfo;
