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

function enregistrerTagBgSync() {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
      navigator.serviceWorker.ready.then(function (reg) {
          return reg.sync.register('notif de connexion');
      });
  };
}

function meNotifier() {
  Notification.requestPermission().then(function (result) {
      console.log("permission donnée");
  });
}

// Web-Push
// Public base64 to Uint
function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


function subscribeUser() {
  if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(function (reg) {

          reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(
                  'BEbfcTLdFNJvysvhu9go33qFwE-K45_rfVigcFvQ2fYpAlRzWFM3iziv0b_XeSgMP6haBneLHMfO7rTaPCHzUbo'
              )
          }).then(function (pushSubscription) {
              console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
          }).catch(function (e) {
              if (Notification.permission === 'denied') {
                  console.warn('Permission for notifications was denied');
              } else {
                  console.error('Unable to subscribe to push', e);
              }
          });
      })
  }
}


