const modalData = [
  {
    group: "Робочі",
    element: ".dayStatusWork .dayStatusBlock",
    types: [
      { id: "shift1", label: "1-ша зміна", icon: "🌅" },
      { id: "shift2", label: "2-га зміна", icon: "🌆" },
      { id: "night", label: "Нічна", icon: "🌙" },
      { id: "overtime100", label: "Понаднормові 100%", icon: "⚡" },
    ],
  },
  {
    group: "Вихідні",
    element: ".dayStatusWeekend .dayStatusBlock",
    types: [
      { id: "dayoff", label: "Вихідний", icon: "☀️" },
      { id: "holiday", label: "Святo", icon: "🎉" },
    ],
  },
  {
    group: "Відпустка",
    element: ".dayStatusVacation .dayStatusBlock",
    types: [
      { id: "vacation", label: "Основна відпустка", icon: "🌴" },
      { id: "vacationDemand", label: "Відпустка на вимогу", icon: "📋" },
      { id: "unpaid", label: "Неоплачувана відпустка", icon: "💸" },
    ],
  },
  {
    group: "Лікарняний",
    element: ".dayStatusHospital .dayStatusBlock",
    types: [
      { id: "sick", label: "Лікарняний", icon: "🩺" },
      { id: "bloodDonation", label: "День здачі крові", icon: "🩸" },
      {
        id: "bloodDonationOff",
        label: "Вихідний після здачі крові",
        icon: "🩹",
      },
    ],
  },
];

const ADDONS = [
  { id: "ot50", label: "Понаднормові 50%", icon: "⚡" },
  { id: "ot120", label: "Понаднормові 120%", icon: "⚡" },
  { id: "force", label: "Вища сила", icon: "⚡" },
];

export { modalData, ADDONS };
