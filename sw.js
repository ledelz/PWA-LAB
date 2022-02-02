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
        'index.html'
      ]);
    })
  );
});

this.addEventListener('fetch', function (event) {
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

// possibilité de cloner la requete avec le code suivant : 
/*
self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {

      if (response !== undefined) {
        return response;
      } else {
        console.log("Fetching from fetch ..." + event.request.url);
        return fetch(event.request).then(function (response) {
     
          let responseClone = response.clone();
          
          caches.open('v1').then(function (cache) {
            cache.put(event.request, responseClone);
          });
          return response;
        })
      }
    }));
  });
*/
