var CACHE_NAME = 'judgedale-cache-v4';
var urlsToCache = [
        './',
        './index.html',
        './list',
        './src/judge-dale-app.html',
        './images/judgedale.jpg'
      ];

self.addEventListener('install', function(event) {
  console.log("[ServiceWorker] Installed");
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          console.log("[ServiceWorker] found in cache", event.request.url);
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  console.log("[ServiceWorker] Activated");
  
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});