import toggleInputActive from "../toggleInputActive.js";

export function initToggles(schedule) {
  toggleInputActive(".editBoard", "rateSpan", "rateInput", schedule);
  toggleInputActive(".taxBoard", "taxSpan", "taxInput", schedule);
  toggleInputActive(
    ".editHolidayDays",
    "holidayDaysSpan",
    "holidayDaysInput",
    schedule,
  );
  toggleInputActive(
    ".editPremium",
    "editPremiumSpan",
    "editPremiumInput",
    schedule,
  );
  toggleInputActive(
    ".minSalaryBlock",
    "minSalarySpan",
    "minSalaryInput",
    schedule,
  );
  toggleInputActive(
    ".editActualSalary",
    "editActusalSalarySpan",
    "editActualSalaryInput",
    schedule,
  );
}
