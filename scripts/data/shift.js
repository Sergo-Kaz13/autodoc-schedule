export const shiftActions = {
  a: "Графік А",
  b: "Графік B",
  night: "Нічний",
};

export const SCHEDULES = [
  {
    id: "a",
    label: "Графік A",
    desc: "2-га → 1-ша зміна",
    dot: "#4ade80",
    dotLabel: "Зелена зміна",
    weeks: ["2-га", "1-ша", "2-га", "1-ша"],
    icon: "🌆",
  },
  {
    id: "b",
    label: "Графік B",
    desc: "1-ша → 2-га зміна",
    dot: "#60a5fa",
    dotLabel: "Синя зміна",
    weeks: ["1-ша", "2-га", "1-ша", "2-га"],
    icon: "🌅",
  },
  {
    id: "night",
    label: "Нічний",
    desc: "Тільки нічні зміни",
    dot: "#1e3a5f",
    dotLabel: "Нічна зміна",
    weeks: ["НІЧ", "НІЧ", "НІЧ", "НІЧ"],
    icon: "🌙",
  },
];
