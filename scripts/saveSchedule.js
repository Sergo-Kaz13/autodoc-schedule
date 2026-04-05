import changeDataSchedule from "./changeDataSchedule.js";

export function saveSchedule(schedule) {
  const request = indexedDB.open("AutodocSchedule", 1);

  request.onsuccess = function (event) {
    const db = event.target.result;
    changeDataSchedule(db, schedule);
  };
}
