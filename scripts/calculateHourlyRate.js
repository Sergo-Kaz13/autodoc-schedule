import calculateNightBonus from "./calculateNightBonus.js";
import calculateSalaryMonth from "./calculateSalaryMonth.js";
import calculateTimeMonth from "./calculateTimeMonth.js";

function calculateHourlyRate(months, vacationRate) {
  let periodSalary = 0;
  let totalWorkTime = 0;
  let periodHospitalSalary = 0;

  months.forEach((month) => {
    const { premiumPay, minSalary = 4666 } = month;
    const time = calculateTimeMonth(month);
    const [nightBonusHour] = calculateNightBonus(time, minSalary);

    periodSalary += premiumPay;
    const {
      sumWorkPrice,
      sumDayTime100Price,
      sumTime120Price,
      sumTime50Price,
      sumHigherPowerPrice,
      sumBirthdayPrice,
      sumWorkHolidayPrice,
      sumLeaveOnRequestPrice,
    } = calculateSalaryMonth(month, nightBonusHour, vacationRate);

    periodSalary +=
      sumWorkPrice + sumDayTime100Price + sumTime120Price + sumTime50Price;

    periodHospitalSalary +=
      sumHigherPowerPrice +
      sumBirthdayPrice +
      sumWorkHolidayPrice +
      sumLeaveOnRequestPrice;

    const { workDayTime, dayTime100, dayTime120, dayTime50 } = time;

    totalWorkTime += workDayTime + dayTime100 + dayTime50 + dayTime120;
  });

  const averageMonthlySalary =
    (periodHospitalSalary + periodSalary) / months.length;
  const zus = averageMonthlySalary * 0.1371;
  const baseSalary = (averageMonthlySalary - zus) * 0.8;
  const hospitalRate = Number((baseSalary / 30).toFixed(2));

  const averageRate = Number((periodSalary / totalWorkTime).toFixed(2));

  return [averageRate, hospitalRate];
}

export default calculateHourlyRate;
