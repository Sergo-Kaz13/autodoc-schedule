import changeDataSchedule from "./changeDataSchedule.js";

function sendNewUserId(schedule) {
  const userId = schedule?.userId;
  console.log(["userId1"], userId);

  if (userId) return;

  const BIN_ID = "683d35008960c979a5a41193";
  const API_KEY =
    "$2a$10$jyfOv3X6UEQL8uJ8IAx9SeeWVrF9jMTlpMn7iI6a9k3y5o8i/RLlm";
  const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

  const newUserId = "id-" + Math.random().toString(36).substr(2, 9);
  schedule.userId = newUserId;
  const request = indexedDB.open("AutodocSchedule", 1);
  request.onsuccess = function (event) {
    const db = event.target.result;
    changeDataSchedule(db, schedule);
  };

  // =====================

  fetch(API_URL, {
    method: "GET",
    headers: {
      "X-Master-Key": API_KEY,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error(`GET failed: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log(["data"], data);

      const users = data.record || {};
      users.users.push({ id: newUserId });

      return fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_KEY,
          "X-Bin-Versioning": "false",
        },
        body: JSON.stringify(users),
      })
        .then((res) => {
          if (!res.ok) throw new Error(`PUT failed: ${res.status}`);
          return res.json();
        })
        .then((result) => {
          console.log("✅ Список оновлено:", result);
        })
        .catch((err) => {
          console.error("❌ Помилка:", err.message);
        });
    });
}
export default sendNewUserId;
