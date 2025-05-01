function renderSalaryMonth(salary) {
  console.log(["salary"], salary);

  const workPrice = document.querySelector(".workPrice");
  const dayTime100Price = document.querySelector(".time100Price");
  const time50Price = document.querySelector(".time50Price");
  const time120Price = document.querySelector(".time120Price");
  const higherPowerPrice = document.querySelector(".higherPowerPrice");
  const birthdayPrice = document.querySelector(".birthdayPrice");
  const workHolidayPrice = document.querySelector(".workHolidayPrice");
  const leaveOnRequestPrice = document.querySelector(".leaveOnRequestPrice");
  const hospitalPrice = document.querySelector(".hospitalPrice");

  workPrice.textContent = salary.sumWorkPrice;
  dayTime100Price.textContent = salary.sumDayTime100Price;
  time50Price.textContent = salary.sumTime50Price;
  time120Price.textContent = salary.sumTime120Price;
  higherPowerPrice.textContent = salary.sumHigherPowerPrice;
  birthdayPrice.textContent = salary.sumBirthdayPrice;
  workHolidayPrice.textContent = salary.sumWorkHolidayPrice;
  leaveOnRequestPrice.textContent = salary.sumLeaveOnRequestPrice;
  hospitalPrice.textContent = salary.sumHospitalPrice;
}

export default renderSalaryMonth;
