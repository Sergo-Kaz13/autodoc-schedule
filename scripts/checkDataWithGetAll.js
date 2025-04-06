function checkDataWithGetAll(db) {
  return new Promise((resolve, reject) => {
    try {
      const transaction = db.transaction("schedule", "readonly");
      const store = transaction.objectStore("schedule");

      const request = store.getAll();

      request.onsuccess = function () {
        const result = request.result;
        if (result.length > 0) {
          resolve(result[0]);
          console.log("IndexedDB має дані:", result[0]);
        } else {
          resolve({});
          console.log("IndexedDB порожня.");
        }
      };

      request.onerror = function () {
        reject.apply(request.error);
        console.error("Помилка отримання даних", request.error);
      };
    } catch (error) {
      console.error("Помилка роботи з IndexecDB:", error);
    }
  });
}

export default checkDataWithGetAll;
