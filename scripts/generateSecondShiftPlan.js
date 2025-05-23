function generateSecondShiftPlan(
  shiftPeriod,
  shiftName = "green",
  numberMonth = false
) {
  const { months } = shiftPeriod;
  let current = shiftName === "green" ? true : false;
  if (!numberMonth) {
    months.forEach((month) => {
      const { days } = month;
      month.shift = shiftName;
      days.forEach(({ numberDay, dayInfo }) => {
        if (numberDay === 5) {
          current = !current;
        } else if (current && numberDay !== 5 && numberDay !== 6) {
          dayInfo.backshift.status = true;
        } else {
          dayInfo.backshift.status = false;
        }
      });
    });
  } else {
    months.forEach((month, index) => {
      const { days } = month;
      days.forEach(({ numberDay, dayInfo }) => {
        if (numberDay === 5) {
          current = !current;
        } else if (current && numberDay !== 5 && numberDay !== 6) {
          if (numberMonth > index) return;
          dayInfo.backshift.status = true;
        } else {
          if (numberMonth > index) return;
          dayInfo.backshift.status = false;
        }
      });
      if (numberMonth > index) return;
      month.shift = shiftName;
    });
  }
}

export default generateSecondShiftPlan;
