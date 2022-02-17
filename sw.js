self.addEventListener('install', function (event) {
  console.log('Installation du service worker ');
  event.waitUntil(
    caches.open('v1').then(function (cache) {
      return cache.addAll([
        'images/2021-volkswagen-jetta-mmp-1-1597767712.jpg',
        'images/2021-honda-civic-mmp-1-1595005323.jpg',
        'images/2021_corolla-apex_exterior_0071614281777066.jpg',
        'icons-1.7.2/font/bootstrap-icons.css',
        'bootstrap-5.1.3-dist/js/bootstrap.bundle.min.js',
        'bootstrap-5.1.3-dist/css/bootstrap.min.css',
        'index.js',
        'index.html',
        'page-hors-ligne.html'

      ]);
    })
  );
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

function envoyerNotification() {
  if (Notification.permission === 'granted') {
      var options = {
          body: 'page indisponible',
          requireInteraction: true
      };

      this.registration.showNotification('connexion retablie', options);
  } else {
      console.log("aucune notification car non permis");
  }
} 


