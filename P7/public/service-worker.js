console.log("Service Worker cargado desde:", self.location.href);

// Nombre de la caché
const CACHE_NAME = "touringcoach-cache-v1";

// Archivos que queremos guardar para modo offline
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/manifest.json",
  "/image/touring.png"
];


// Instalación del Service Worker
self.addEventListener("install", (event) => {
  console.log("Instalando Service Worker...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Archivos cacheados con éxito");
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Activación del Service Worker
self.addEventListener("activate", (event) => {
  console.log("Service Worker activado");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  );
});

// Interceptar solicitudes y servir desde caché si no hay red
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() =>
          caches.match("/index.html")
        )
      );
    })
  );
});
