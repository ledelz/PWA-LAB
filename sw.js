
/* this.addEventListener('install', function (event) {
  console.log('Installation du service worker ');
  event.waitUntil(
    caches.open('v1').then(function (cache) {
      return cache.addAll([
        'favicon.ico',
        'images/2021-volkswagen-jetta-mmp-1-1597767712.jpg',
        'images/2021-honda-civic-mmp-1-1595005323.jpg',
        'images/2021_corolla-apex_exterior_0071614281777066.jpg',
        'icons-1.7.2/font/bootstrap-icons.css',
        'bootstrap-5.1.3-dist/js/bootstrap.bundle.min.js',
        'bootstrap-5.1.3-dist/css/bootstrap.min.css',
        'index.js',
        'index.html',
        'horsLigne.html'
      ]);
    })
  );
});

this.addEventListener('activate', (e) => {
  console.log('Service worker: active');
});

async function cacheOrNetwork(request) {
  try {
    return await fromCache(request);
  } catch {
    return await fetch(request);
  }
};

async function fromCache(request) {
  const cache = await caches.open('v1');
  const matching = await cache.match(request);
  return matching || Promise.reject('no-match');
}

this.addEventListener('fetch', function(event) {
  event.respondWith(cacheOrNetwork(event.request).catch(() => 
  fallbackVersPageHorsLigne()));
});
 
function fallbackVersPageHorsLigne() {
  return caches.match("horsLigne.html");
 }


this.addEventListener('sync', function (event) {
  console.log("evenement recu : " + event);
  if (event.tag == 'notif') {
      console.log("Connexion réétablie.");
      event.waitUntil(envoyerNotification());
  }
});

function envoyerNotification() {
  console.log("Notification envoyée");
  if (Notification.permission === 'granted') {
      var options = {
          body: 'Le contenu est maintenant disponible !',
          requireInteraction: true
      };

      self.registration.showNotification('connexion rétablie avec succes', options);
  } else {
      console.log("aucune notification car non permis");
  }
}
 */

this.addEventListener("install", function (event) {
  console.log("[Service Worker] Installation de v1");
  event.waitUntil(
    caches.open("v1").then(function (cache) {
      console.log("[Service Worker] Mise en cache");
      return cache.addAll([
        'favicon.ico',
        'images/2021-volkswagen-jetta-mmp-1-1597767712.jpg',
        'images/2021-honda-civic-mmp-1-1595005323.jpg',
        'images/2021_corolla-apex_exterior_0071614281777066.jpg',
        'icons-1.7.2/font/bootstrap-icons.css',
        'bootstrap-5.1.3-dist/js/bootstrap.bundle.min.js',
        'bootstrap-5.1.3-dist/css/bootstrap.min.css',
        'index.js',
        'index.html',
        'horsLigne.html'
      ]);
    })
  );
});


this.addEventListener("activate", (e) => {
  console.log("Sw actif");
});

function cacheOrNetwork(request) {
  return fromCache(request).catch(() => fetch(request));
}

function fromCache(request) {
  return caches.open("v1").then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject("no-match");
    });
  });
}

this.addEventListener("fetch", function (event) {
  event.respondWith(
    cacheOrNetwork(event.request).catch(() => fallbackVersPageHorsLigne())
  );
});

function fallbackVersPageHorsLigne() {
  return caches.match("page-hors-ligne.html");
}

// sync service worker.
this.addEventListener("sync", function (event) {
  console.log("reçu : " + event);
  if (event.tag == "sit") {
    console.log("Connection réétablie envoie notif si permis");
    event.waitUntil(envoyerNotification());
  }
});

// Connection rétablie. notification: la page est dispo.
function envoyerNotification() {
  console.log("Notification envoyée");
  if (Notification.permission === "granted") {
    var options = {
      body: "Page non disponible",
      requireInteraction: true,
    };

    self.registration.showNotification("Connection rétabli avec succes", options);
  } else {
    console.log("Pas de notif: non permis");
  }
}