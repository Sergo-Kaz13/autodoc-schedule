function getSchedule(db) {
  const transaction = db.transaction("schedule", "readonly");
  const store = transaction.objectStore("schedule");

  const request = store.getAll();

  request.onsuccess = function () {
    console.log(request.result);
  };
}

export default getSchedule;
