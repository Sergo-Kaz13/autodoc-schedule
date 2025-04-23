function calculateAverageSalary(schedule) {
  const activeMonth = Number(document.querySelector(".monthItem").id);
  const activeYear = Number(document.querySelector(".activeYear").textContent);

  let sumSalary = 0;

  if (activeMonth >= 3) {
    schedule[activeYear].months.forEach(({ premiumPay, days }, i) => {
      if (i < activeMonth && i > activeMonth - 4) {
        console.log(["days"], days);
        console.log(["i"], i);
      }
      sumSalary += premiumPay;
    });
  } else {
    console.log("lol");
  }

  console.log(["activeYear"], activeYear);
  console.log(["activeMonth"], activeMonth);

  return 10;
}

export default calculateAverageSalary;
