var CACHE_NAME = 'cache-v1'
var urlsToCache = [
  '/',
  '/share',
  '/install-sw.js',
  '/img/favicon.ico',
  '/img/logo-128.png',
  '/img/logo-192.png',
  '/img/logo-48.png',
  '/img/logo-512.png',
  '/img/logo-96.png',
  '/img/logo-apple-touch-icon.png',
  '/img/logo.svg',
  '/img/promotion-440x280.png',
  '/img/promotion.svg',
  '/img/screenshot1.png',
  '/img/screenshot2.png',
  '/img/screenshot3.png',
  '/img/screenshot4.png',
]

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache')
      return cache.addAll(urlsToCache)
    }),
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response
      }
      return fetch(event.request)
    }),
  )
})
