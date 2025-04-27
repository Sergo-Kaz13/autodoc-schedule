function calculateUrlop(schedule) {
  const activeYear = document.querySelector(".activeYear").textContent;
  const {
    birthday,
    higherPowerTime,
    leaveOnRequestDays,
    months,
    workHolidayDays,
  } = schedule[activeYear];

  document.querySelector(".holidayDaysSpan").textContent = workHolidayDays;
  document.querySelector(".higherPowerHours").textContent = higherPowerTime;
  document.querySelector(".birthday").textContent = birthday;

  let birthdayUsed = 0;
  let higherPowerUsed = 0;
  let leaveOnRequestUsed = 0;
  let workHolidayUsed = 0;
  let leaveOnRequestUsedCound = 0;

  months.forEach(({ days }) => {
    days.forEach(({ dayInfo }) => {
      const { birthday, higherPower, workHoliday, leaveOnRequest } = dayInfo;

      if (birthday?.status) birthdayUsed += birthday.day;
      if (higherPower?.status) higherPowerUsed += higherPower.time;

      if (workHoliday?.status) {
        const workHolidayRemaining = workHolidayDays - workHolidayUsed;
        const leaveOnRequestRemaining = leaveOnRequestDays - leaveOnRequestUsed;

        workHolidayUsed += workHoliday.day;
        if (workHolidayRemaining <= leaveOnRequestRemaining) {
          leaveOnRequestUsedCound += workHoliday.day;
        }

        // if (
        //   workHolidayDays - workHolidayUsed >
        //   leaveOnRequestDays - leaveOnRequestUsed
        // ) {
        //   workHolidayUsed += workHoliday.day;
        // } else {
        //   workHolidayUsed += workHoliday.day;
        //   leaveOnRequestUsed += workHoliday.day;
        // }
      }

      if (leaveOnRequest?.status) {
        leaveOnRequestUsed += leaveOnRequest.day;
        leaveOnRequestUsedCound += leaveOnRequest.day;
        workHolidayUsed += leaveOnRequest.day;
      }
    });
  });

  const vacationBalance = workHolidayDays - workHolidayUsed;

  if (vacationBalance < 4) {
    leaveOnRequestUsedCound = 4 - vacationBalance;
  }

  updateTextContent(".workHolidayDaysUsed", workHolidayUsed);
  updateTextContent(".leaveOnRequestDaysUsed", leaveOnRequestUsed);
  updateTextContent(".higherPowerTimeUsed", higherPowerUsed);
  updateTextContent(".birthdayUsed", birthdayUsed);
  updateTextContent(".workHolidayDaysStay", vacationBalance);
  updateTextContent(
    ".leaveOnRequestDaysStay",
    leaveOnRequestDays - leaveOnRequestUsed
  );
  updateTextContent(".higherPowerTimeStay", higherPowerTime - higherPowerUsed);

  return {
    workHolidayUsed,
    leaveOnRequestUsed,
    higherPowerUsed,
    birthdayUsed,
    leaveOnRequestUsedCound,
    vacationBalance,
  };
}

const updateTextContent = (selector, value) => {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = value;
  }
};

export default calculateUrlop;
