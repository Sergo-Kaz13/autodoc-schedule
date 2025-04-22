function calculateAverageSalary(schedule) {
  const activeMonth = Number(document.querySelector(".monthItem").id);
  const activeYear = Number(document.querySelector(".activeYear").textContent);

  let sumSalary = 0;

  if (activeMonth >= 2) {
    schedule[activeYear].months.forEach(({ premiumPay, days }) => {
      sumSalary += premiumPay;
    });
  }

  console.log(["activeYear"], activeYear);
  console.log(["activeMonth"], activeMonth);

  return 10;
}

export default calculateAverageSalary;
