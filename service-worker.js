importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

  workbox.precaching.precacheAndRoute([
    { url: '/nav.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/lib/idb.js', revision: '1' },
    { url: '/lib/db.js', revision: '1' },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
    { url: 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', revision: '1' },
], {
  ignoreUrlParametersMatching: [/.*/]
});


workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org\/v2/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'football-API',
  }),
);


workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages'
  })
);

workbox.routing.registerRoute(
  new RegExp('detail.html'),
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'content',
  }),
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
          new workbox.expiration.Plugin({
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
          }),
      ],
  }),
);


      self.addEventListener('push', function(event) {
        var body;
        if (event.data) {
          body = event.data.text();
        } else {
          body = 'Push message no payload';
        }
        var options = {
          body: body,
          icon: 'bola.png',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          }
        };
        event.waitUntil(
          self.registration.showNotification('Push Notification', options)
        );
      });
