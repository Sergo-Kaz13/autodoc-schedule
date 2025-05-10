function changeDataSchedule(db, schedule) {
  console.log(["schedule"], schedule);

  const transaction = db.transaction("schedule", "readwrite");
  const store = transaction.objectStore("schedule");

  schedule.id = "1";

  const request = store.put(schedule);

  request.onsuccess = function () {
    console.log("Дафі користувача оновлено:", schedule);
  };

  request.onerror = function () {
    console.error("Помилка оновлення.", request.error);
  };
}

export default changeDataSchedule;
