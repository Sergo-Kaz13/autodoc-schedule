import calculateSalaryMonth from "./calculateSalaryMonth.js";
import calculateTimeMonth from "./calculateTimeMonth.js";

function calculateSlaryForPeriod(period) {
  let periodSalary = 0;
  let totalWorkTime = 0;

  period.forEach((month) => {
    const { premiumPay } = month;
    periodSalary += premiumPay;
    const {
      sumWorkPrice,
      sumDayTime100Price,
      sumTime120Price,
      sumTime50Price,
    } = calculateSalaryMonth(month);

    periodSalary +=
      sumWorkPrice + sumDayTime100Price + sumTime120Price + sumTime50Price;

    const { workDayTime, dayTime100, dayTime120, dayTime50 } =
      calculateTimeMonth(month);

    totalWorkTime += workDayTime + dayTime100 + dayTime50 + dayTime120;
  });

  const averageRate = Number((periodSalary / totalWorkTime).toFixed(2));

  document.querySelector(".vacationPay").textContent = averageRate;

  return averageRate;
}

export default calculateSlaryForPeriod;
