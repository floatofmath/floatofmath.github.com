// STAT FIGHTER '89 has moved to https://wiendigga.at/stat-fighter/.
// The old site registered a service worker here that serves the game from its offline cache.
// Browsers check this file for updates, so this replacement reaches returning visitors:
// it takes over at once, deletes the old caches, unregisters itself and reloads open tabs,
// which then load the "moved" page from the network. It has no fetch handler on purpose.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const prefix = `stat-fighter-${self.registration.scope}-`;
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith(prefix)).map((name) => caches.delete(name)));
    await self.registration.unregister();
    const windows = await self.clients.matchAll({ type: 'window' });
    await Promise.all(windows.map((client) => client.navigate(client.url).catch(() => {})));
  })());
});
