export function daysInMonth(month, year) {
  // month = month + 1;
  // if (month > 12) month = month - 12;
  // year = year != undefined ? year : new Date().getFullYear();
  // let d = new Date(year + "-" + month + "-01");
  // d.setDate(0);
  // d = d.getDate();

  // return d;

  year = year !== undefined ? year : new Date().getFullYear();
  const date = new Date(year, month, 0);

  return date.getDate();
}
