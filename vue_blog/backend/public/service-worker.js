importScripts("/precache-manifest.6fa9ba83edeca04a4af21af38252909b.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

const CACHE_NAME = 'abdie-cache-v1';
const urlsToCache = [
  '/',
];

self.addEventListener('install', (event) => {
  event.waitUntill(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opends cache'); // eslint-disable-line
        return cache.addAll(urlsToCache);
      }),
  );
});

self.addEventListener('fetch', (event) => {
  console.log('fetch active'); // eslint-disable-line
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          (fetchResponse) => {
            if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
              return fetchResponse;
            }
            const responseToCache = fetchResponse.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return fetchResponse;
          },
        );
      }),
  );
});

