if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function (reg) {
    // registration worked
    console.log('Registration succeeded.' + reg.scope);
  }).catch(function (error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
} else {
  console.log('Service workers are not supported.')};



// ajout d'une fenetre qui demande à l'utilisateur s'il veut installer l'application;
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstall();

  console.log(`'beforeinstallprompt'`);
  install.addEventListener('click', function () {
    deferredPrompt.prompt();
  })
});

function showInstall() {
  const installation = document.getElementById('fenetre')
  const toast = new bootstrap.Toast(installation, { delay: 10000 })
  toast.show();
}


// notifications
function meNotifier() {
  Notification.requestPermission().then(function (result) {
      console.log("permission donnée");
  });
}

if ('serviceWorker' in navigator && 'SyncManager' in window) {
  navigator.serviceWorker.ready.then(function(reg) {
      return reg.sync.register('notif');
  });
};
