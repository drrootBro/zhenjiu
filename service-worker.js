const CACHE_NAME = 'zhenjiu-cache-v1';
const urlsToCache = [
  '/',
  '/zhenjiu/index.html',
  '/zhenjiu/CSS/style.css',
  '/zhenjiu/js/app.js',
  '/zhenjiu/js/data.js',
  '/zhenjiu/js/i18n.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
