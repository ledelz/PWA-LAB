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


if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then(function (reg) {
      console.log("Scope" + reg.scope);
    })
    .catch(function (error) {
      console.log("Error" + error);
    });
}

// Initialise la variable
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  // pas de barre si installé
  e.preventDefault();
  // Réserve evenement
  deferredPrompt = e;
  // installer pwa fenêtre avertissement
  installApp();

  console.log(`'beforeinstallprompt' fired.`);

  // bouton installer
 // appButton.addEventListener("click", function () {
   // deferredPrompt.prompt();
 // })
});

// informer l'utilisateur de la possibilité d'installer pwa

function installApp() {
  console.log("fonctionne");
  const fenetre = document.getElementById("mytoast");
  const toast = new bootstrap.Toast(fenetre, {
    delay: 5000
  }); //affichée 5 secondes
  toast.show();
};

// Demande la permission d'afficher des notifications en cliquant sur le boutton
function meNotifier() {
  Notification.requestPermission().then(function (result) {
    console.log("permission accordée");
  });
}

// Déclenche l’enregistrement d’un background sync
if ("serviceWorker" in navigator && "SyncManager" in window) {
  navigator.serviceWorker.ready.then(function (reg) {
    return reg.sync.register("sit");
  });
}
