import calculateNightBonus from "./calculateNightBonus.js";
import calculateSalaryMonth from "./calculateSalaryMonth.js";
import calculateTimeMonth from "./calculateTimeMonth.js";

function calculateSalaryForPeriod(period) {
  console.log(period);

  let periodSalary = 0;
  let totalWorkTime = 0;

  period.forEach((month) => {
    const { premiumPay, minSalary = 4666, rate } = month;
    const time = calculateTimeMonth(month);
    const [nightBonusHour] = calculateNightBonus(time, minSalary);

    periodSalary += premiumPay;
    const {
      sumWorkPrice,
      sumDayTime100Price,
      sumTime120Price,
      sumTime50Price,
    } = calculateSalaryMonth(month, rate, nightBonusHour);

    periodSalary +=
      sumWorkPrice + sumDayTime100Price + sumTime120Price + sumTime50Price;

    const { workDayTime, dayTime100, dayTime120, dayTime50 } = time;

    totalWorkTime += workDayTime + dayTime100 + dayTime50 + dayTime120;
  });

  const averageRate = Number((periodSalary / totalWorkTime).toFixed(2));

  return averageRate;
}

export default calculateSalaryForPeriod;
