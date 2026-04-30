import { openDB } from "./db.js";
import store from "../store/store.js";

export async function getSchedule() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("schedule", "readonly");
    const objectStore = tx.objectStore("schedule");
    const request = objectStore.getAll();
    request.onsuccess = () => {
      store.schedule = request.result[0];
      resolve(request.result);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function setSchedule(schedule) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("schedule", "readwrite");
    const objectStore = tx.objectStore("schedule");
    const request = objectStore.put(schedule);
    request.onsuccess = () => {
      store.schedule = schedule;
      resolve(request.result);
    };
    request.onerror = () => reject(request.error);
  });
}
