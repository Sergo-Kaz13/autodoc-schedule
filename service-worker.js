const CACHE_NAME = "schedule-app-cache-v1";
const urlsToCache = [
  "https://sergo-kaz13.github.io/autodoc-schedule/",
  "/index.html",
  "/styles.css",
  "/main.js",
  "/icon-192.png",
];

// Кешування файлів при встановленні
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Обробка запитів
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
