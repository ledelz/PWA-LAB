this.addEventListener('install', function (event) {
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

/* this.addEventListener('fetch', function (event) {
  console.log("Fetching ..." + event.request.url);

  event.respondWith(caches.match(event.request).then((response) => {
    if (response !== undefined) {
      return response;
    } else {
      console.log("Fetching from fetch ..." + event.request.url);
      return fetch(event.request);
    }
    
  }))

})

 */



this.addEventListener('fetch', function(event) {
  console.log("Fetching ..." + event.request.url);
  event.respondWith(cacheOrNetwork(event.request).catch(() => fallbackVersPageHorsLigne()));
});


async function cacheOrNetwork(request) {

 return  fromCache(request).catch(() => fetch(request));

};

async function fromCache(request) {
  const cache = await caches.open('v1');
  const matching = await cache.match(request);
  return matching || Promise.reject('no-match');
}

function fallbackVersPageHorsLigne() {
return caches.match('horsLigne.html');
}


this.addEventListener('sync', function (event) {
  console.log("evenement recu : " + event);
  if (event.tag == 'notif de connexion') {
      console.log("connexion rétabie");
  }
});

self.addEventListener('push', function (event) {
  console.log("push recu: " + e);
  if (event.data) {
    data = event.data.json();
}
console.log("donnee du push: " + JSON.stringify(data)); 
  envoyerNotification();
});


function envoyerNotification() {
  if (Notification.permission === 'granted') {
      var options = {
          body: 'Notification',
          requireInteraction: true
      };

      self.registration.showNotification('Hello', options);
  } else {
      console.log("aucune notification car non permis");
  }
}


