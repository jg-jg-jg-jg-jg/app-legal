var STORE_LINK_BASE = document.currentScript.src.replace(/store-link\.js.*$/, '');

function goToStore(links) {
  var ua = navigator.userAgent;
  var android = /Android/i.test(ua);
  var ios = /iPhone|iPad|iPod/i.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var target = android ? links.play : ios ? links.appStore : null;
  if (target) {
    document.documentElement.style.visibility = 'hidden';
    setTimeout(function () {
      document.documentElement.style.visibility = '';
    }, 2500);
    location.replace(target);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var de = /^de\b/i.test(navigator.language || '');
    var stores = [
      ['app-store', links.appStore, de ? 'Laden im App Store' : 'Download on the App Store'],
      ['google-play', links.play, de ? 'Jetzt bei Google Play' : 'Get it on Google Play'],
    ];
    stores.forEach(function (store) {
      var link = document.getElementById(store[0]);
      if (!link) return;
      if (!store[1]) { link.hidden = true; return; }
      link.href = store[1];
      link.hidden = false;
      var img = link.querySelector('img');
      img.src = STORE_LINK_BASE + 'badges/' + store[0] + '-' + (de ? 'de' : 'en') + '.svg';
      img.alt = store[2];
    });
    var soon = document.getElementById('ios-soon');
    if (soon && ios && !links.appStore) soon.hidden = false;
  });
}
