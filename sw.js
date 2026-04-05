const CACHE_NAME = "tasbih-pwa-v2";
const APP_SHELL_FILES = [
    "./",
    "./index.html",
    "./styles.css",
    "./script.js",
    "./all_in_one.html",
    "./manifest.webmanifest",
    "./icon.svg",
    "./icon-maskable.svg",
];

const NETWORK_FIRST_SUFFIXES = [
    "/index.html",
    "/all_in_one.html",
    "/script.js",
    "/styles.css",
    "/manifest.webmanifest",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL_FILES)),
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(
                    keys
                        .filter((key) => key !== CACHE_NAME)
                        .map((key) => caches.delete(key)),
                ),
            ),
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    const { request } = event;
    const url = new URL(request.url);
    const isSameOrigin = url.origin === self.location.origin;
    const isNetworkFirstAsset =
        isSameOrigin &&
        (request.mode === "navigate" ||
            NETWORK_FIRST_SUFFIXES.some((suffix) =>
                url.pathname.endsWith(suffix),
            ));

    if (request.method !== "GET") {
        return;
    }

    if (isNetworkFirstAsset) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    if (!response || response.status !== 200) {
                        return response;
                    }

                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, copy);
                    });
                    return response;
                })
                .catch(() => {
                    if (request.mode === "navigate") {
                        if (url.pathname.endsWith("/all_in_one.html")) {
                            return caches.match("./all_in_one.html");
                        }
                        return caches.match("./index.html");
                    }
                    return caches.match(request);
                }),
        );
        return;
    }

    event.respondWith(
        caches.match(request).then((cached) => {
            if (cached) {
                return cached;
            }

            return fetch(request)
                .then((response) => {
                    if (
                        !response ||
                        response.status !== 200 ||
                        request.url.startsWith("chrome-extension://")
                    ) {
                        return response;
                    }

                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, copy);
                    });
                    return response;
                })
                .catch(() => {
                    if (request.mode === "navigate") {
                        return caches.match("./index.html");
                    }
                    return caches.match(request);
                });
        }),
    );
});
