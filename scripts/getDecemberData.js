function getDecemberData(year) {
  const december = year.months.at(-1);
  console.log(["december"], december);
  return december;
}

export default getDecemberData;
