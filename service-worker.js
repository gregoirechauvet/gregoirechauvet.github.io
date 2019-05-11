const FILES_TO_CACHE = [
  '/',
];

const cacheName = 'test';

self.addEventListener('install', e => {
	console.log('[Service worker] Install');

	e.waitUntil(
		caches.open(cacheName).then(cache => {
			return cache.addAll(FILES_TO_CACHE);
		})
	);
});

self.addEventListener('fetch', e => {
	e.respondWith(
		caches.match(e.request).then(function(r) {
			console.log('[Service Worker] Fetching resource: '+e.request.url);
			return r || fetch(e.request).then(function(response) {
				return caches.open(cacheName).then(function(cache) {
					console.log('[Service Worker] Caching new resource: '+e.request.url);
					cache.put(e.request, response.clone());
					return response;
				});
			});
		})
	);
});


self.addEventListener('activate', e => {
	e.waitUntil(
		caches.keys().then(keyList => {
			return Promise.all(keyList.map(key => {
				if (cacheName.indexOf(key) !== -1) {
					return caches.delete(key);
				}
			}));
		})
	);
});
