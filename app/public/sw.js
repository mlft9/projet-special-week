const CACHE = 'truthsense-v1'

const APP_SHELL = [
  '/',
  '/comprendre',
  '/jouer',
  '/reperer',
  '/classement',
  '/signaler',
]

self.addEventListener('install', event => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(APP_SHELL))
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Ne pas intercepter les appels API
  if (url.pathname.startsWith('/api/')) return

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached
      return fetch(request).then(response => {
        // Mettre en cache uniquement les ressources statiques
        if (response.ok && (request.destination === 'script' || request.destination === 'style' || request.destination === 'image' || request.destination === 'font')) {
          const clone = response.clone()
          caches.open(CACHE).then(cache => cache.put(request, clone))
        }
        return response
      }).catch(() => {
        // Fallback vers la page d'accueil si hors-ligne
        if (request.destination === 'document') {
          return caches.match('/')
        }
      })
    })
  )
})
