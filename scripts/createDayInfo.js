"use strict";
import { months } from "./data/months.js";
import LABELS from "./data/workStatusLabels.js";

function createDayInfo(store, selectedDate) {
  console.log(["selectedDate"], selectedDate);
  const SHIFT = {
    nightShift: "Нічна зміна",
    firstShift: "1-ша зміна",
    secondShift: "2-га зміна",
  };

  function getActive(data) {
    return Object.entries(data)
      .filter(([, value]) => value.status)
      .map(([key, { status, time, day }]) => {
        let text = "";
        return text;
      });
  }

  const selectedDayInfo =
    store.schedule[selectedDate.year].months[selectedDate.month].days[
      selectedDate.day - 1
    ].dayInfo;
  console.log(["selectedDayInfo"], selectedDayInfo);
  console.log(["getActive(selectedDayInfo)"], getActive(selectedDayInfo));

  document.querySelector(".headerModalDay").textContent =
    selectedDate.day < 10 ? "0" + selectedDate.day : selectedDate.day;
  document.querySelector(".headerModalMonth").textContent =
    months[selectedDate.month];
  document.querySelector(".headerModalYear").textContent = selectedDate.year;

  const dayBoxInfo = document.querySelector(".day-box-info");
}

export default createDayInfo;
