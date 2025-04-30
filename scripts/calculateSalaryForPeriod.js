import calculateSalaryMonth from "./calculateSalaryMonth.js";
import calculateTimeMonth from "./calculateTimeMonth.js";

function calculateSlaryForPeriod(period) {
  let periodSalary = 0;
  let totalWorkTime = 0;

  period.forEach((month) => {
    const { premiumPay } = month;
    periodSalary += premiumPay;

    const { workDayTime, dayTime100, dayTime120, dayTime50 } =
      calculateTimeMonth(month);

    totalWorkTime += workDayTime + dayTime100 + dayTime50 + dayTime120;
  });

  console.log(["periodSalary"], periodSalary);
  console.log(["totalWorkTime"], totalWorkTime);

  console.log(["period"], period);
}

export default calculateSlaryForPeriod;
