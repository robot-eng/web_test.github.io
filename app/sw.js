const CACHE_NAME = 'pastel-finance-v1';
const RUNTIME_CACHE = 'pastel-finance-runtime';

const ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
];

const EXTERNAL_ASSETS = [
    'https://cdn.jsdelivr.net/npm/chart.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&family=Prompt:wght@300;400;500&display=swap'
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        Promise.all([
            caches.open(CACHE_NAME).then((cache) => {
                console.log('Caching app assets');
                return cache.addAll(ASSETS);
            }),
            caches.open(RUNTIME_CACHE).then((cache) => {
                console.log('Caching external assets');
                return cache.addAll(EXTERNAL_ASSETS).catch(() => {
                    console.log('External assets caching failed - will cache on first use');
                });
            })
        ])
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
                        console.log('Removing old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - cache first strategy with fallback
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Handle same-origin requests
    if (url.origin === location.origin) {
        event.respondWith(
            caches.match(request).then((response) => {
                if (response) {
                    console.log('Serving from cache:', request.url);
                    return response;
                }

                return fetch(request).then((response) => {
                    // Cache successful responses
                    if (response && response.status === 200 && response.type !== 'error') {
                        const responseToCache = response.clone();
                        caches.open(RUNTIME_CACHE).then((cache) => {
                            cache.put(request, responseToCache);
                        });
                    }
                    return response;
                }).catch(() => {
                    // Return cached version if offline
                    return caches.match(request).then((cachedResponse) => {
                        return cachedResponse || caches.match('./index.html');
                    });
                });
            })
        );
    } else {
        // Handle cross-origin requests (CDNs, APIs)
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Cache successful external requests
                    if (response && response.status === 200) {
                        const responseToCache = response.clone();
                        caches.open(RUNTIME_CACHE).then((cache) => {
                            cache.put(request, responseToCache);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    // Fall back to cache for external requests
                    return caches.match(request);
                })
        );
    }
});

// Background sync for future features
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-transactions') {
        event.waitUntil(
            // Sync transactions when online
            Promise.resolve()
        );
    }
});

console.log('Service Worker registered');
