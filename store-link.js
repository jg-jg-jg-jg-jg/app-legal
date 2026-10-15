// The store link of an app: one address for the QR code and links on its
// share images that sends each phone straight to the app's own store entry.
// Each app has a page of its own (e.g. /regex-trainer/, /sql-trainer/) that
// loads this file in its <head> and calls goToStore() with its two links.
//
//   Android -> Google Play, at once (the page is never shown)
//   iPhone/iPad -> App Store, at once - once the app is there; until then the
//                  page shows its "coming soon" note
//   computer -> the page with the official badges
//
// When an app reaches a store: put its link into that app's page.
// Where this file (and the badges/ folder beside it) is served from, so the
// pages work on the github.io address and on the custom domain alike.
var STORE_LINK_BASE = document.currentScript.src.replace(/store-link\.js.*$/, '');

function goToStore(links) {
  var ua = navigator.userAgent;
  var android = /Android/i.test(ua);
  var ios = /iPhone|iPad|iPod/i.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var target = android ? links.play : ios ? links.appStore : null;
  if (target) {
    // Straight on, without showing the page first. Should the hand-over not
    // happen (a QR reader's built-in browser that blocks it), the page with
    // its badges appears after a moment instead.
    document.documentElement.style.visibility = 'hidden';
    setTimeout(function () {
      document.documentElement.style.visibility = '';
    }, 2500);
    location.replace(target);
  }

  document.addEventListener('DOMContentLoaded', function () {
    // German badges for German browsers, English otherwise.
    var de = /^de\b/i.test(navigator.language || '');
    var stores = [
      ['app-store', links.appStore, de ? 'Laden im App Store' : 'Download on the App Store'],
      ['google-play', links.play, de ? 'Jetzt bei Google Play' : 'Get it on Google Play'],
    ];
    stores.forEach(function (store) {
      var link = document.getElementById(store[0]);
      if (!link) return;
      // A store's badge only while the app is there; the App Store one first.
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
