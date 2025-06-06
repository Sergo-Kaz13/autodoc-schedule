const CACHE_NAME = "schedule-app-cache-v1";
const BASE_URL = "/autodoc-schedule";
const urlsToCache = [
  `${BASE_URL}/`,
  `${BASE_URL}/index.html`,
  `${BASE_URL}/style.css`,
  `${BASE_URL}/main.js`,
  `${BASE_URL}/icon-192.png`,
  // "/index.html",
  // "/main.js",
  // "/styles.css",
];

// Кешування файлів при встановленні
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Оновлення кешу (очищення старих версій)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Обробка запитів
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (!event.request.url.startsWith("http")) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Кешування нових ресурсів
        const cloned = response.clone();
        caches
          .open(CACHE_NAME)
          .then((cache) => cache.put(event.request, cloned));
        return response;
      })
      .catch(() => caches.match(event.request).then((res) => res))
  );

  // event.respondWith(
  //   caches.match(event.request).then((cached) => {
  //     return (
  //       cached ||
  //       fetch(event.request).then((response) => {
  //         return caches.open(CACHE_NAME).then((cache) => {
  //           cache.put(event.request, response.clone());
  //           return response;
  //         });
  //       })
  //     );
  //   })
  // );
});
