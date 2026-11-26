/* Repas SBH - rappels de déclaration */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = { body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Repas SBH', {
    body: d.body || '',
    icon: 'repas-192.png',
    badge: 'repas-192.png',
    tag: d.tag || undefined,
    data: { url: d.url || 'repas-sbh.html' }
  }));
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || 'repas-sbh.html', self.location.href).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    for (const c of list) if (c.url.indexOf('repas-sbh.html') >= 0 && 'focus' in c) return c.focus();
    return self.clients.openWindow(url);
  }));
});
