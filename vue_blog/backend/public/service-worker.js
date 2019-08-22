importScripts("/precache-manifest.c75ef04585b882b823acb02c39534411.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
  * Service Worker
*/

const _version = 'v1';
const CACHE_NAME = 'abdie-cache-v1';
const urlsToCache = [
  '/'
];

self.addEventListener('install', (event) => {
  console.log('Install step for service worker');
  event.waitUntill(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opends cache'); // eslint-disable-line
        return cache.addAll(urlsToCache);
      }),
  );
});

self.addEventListener('activate', (event) => {
  console.log('Active step for service worker');
});

self.addEventListener('fetch', (event) => {
  console.log('fetch ', event.request.url); // eslint-disable-line
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

