function calculateSalaryNetto(brutto) {
  const zusPension = Number((brutto * 0.0976).toFixed(2)); //Пенсійний фонд (9.76%)
  const zusDisability = Number((brutto * 0.015).toFixed(2)); //Інвалідний фонд (1.5%)
  const zusSickness = Number((brutto * 0.0245).toFixed(2)); //Фонд на випадок хвороби (2.45%)

  const totalZus = zusPension + zusDisability + zusSickness;

  // База для медичного страхування
  const healthBase = brutto - totalZus;

  // Медичне страхування (9%)
  const healthInsurance = healthBase * 0.09;

  // Податкова база
  const taxBase = healthBase - 250; // 250 zł - виплати на отримання доходу

  // Податок PIT (17%)
  let pitTax = taxBase * 0.12;

  // Податкова пільга (300 zł)
  pitTax = Math.round(pitTax - 300);
  pitTax = Math.max(0, pitTax); //Податок неможе бути від'ємним

  // Нетто
  const netto = brutto - totalZus - healthInsurance - pitTax;

  return Number(netto.toFixed(2));
}

export default calculateSalaryNetto;
