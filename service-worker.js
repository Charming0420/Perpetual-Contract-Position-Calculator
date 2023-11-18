self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("my-cache").then((cache) =>
      cache.addAll([
        "/",
        "/index.html",
        "/styles.css",
        "/calculator.js",
        // 列出其他想要緩存的資源
      ])
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
