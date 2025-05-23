import { months } from "./data.js";
import generateSecondShiftPlan from "./generateSecondShiftPlan.js";

function switchGreenToOrange(
  schedule,
  year,
  month,
  shouldUpdate = false,
  mode
) {
  console.log("updateShift");

  year = year !== undefined ? (year = year) : new Date().getFullYear();
  month = month !== undefined ? (month = month) : new Date().getMonth();

  const currentYear = schedule[year];
  const shift = currentYear?.shift;

  if (!shift) {
    let nameShift = "green";
    if (mode === "decrement") {
      nameShift = schedule[year + 1].months[0].shift;
    } else if (mode === "increment") {
      nameShift = schedule[year - 1].months[months.length - 1].shift;
    }
    currentYear.shift = nameShift;
    generateSecondShiftPlan(currentYear, nameShift);
  } else if (shouldUpdate) {
    generateSecondShiftPlan(currentYear, shift, month);
  }
}

export default switchGreenToOrange;
