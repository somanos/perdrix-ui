function showLoader() {
  let a = document.createElement(`div`);
  a.innerHTML = (`<div id="loader-spinner" class="spinner spinner-loader spinner__item spinner__ui spinner-loader__ui">
    <div class="drumee-loading drumee-loading-wrapper"> 
      <div class="loader-wrapper"> 
        <div class="loader small"></div> 
        <div class="loader small"></div> 
        <div class="loader small"></div> 
        <div class="loader small"></div> 
        <div class="loader small"></div> 
      </div> 
    </div>
  </div>`);
  document.body.append(a);
  return a;
}

async function preloadKinds() {
  window.DrumeeWm = await Kind.waitFor('DrumeeWm');
  window.DrumeeInteractWindow = await Kind.waitFor('DrumeeInteractWindow');
  window.DrumeeInteractPlayer = await Kind.waitFor('DrumeeInteractPlayer');
  Kind.registerAddons({
    'perdrix_dock' : import('./manager/dock'),
    'search_results': import('./manager/widget/search-results'),
    'client_item': import('./manager/widget/client-item'),
    //'viewer_client': import('./manager/viewer/client/index.js'),
    'viewer_travaux': import('./manager/viewer/travaux'),
    'window_client_list': import('./manager/window/client-list'),
    'window_client': import('./manager/window/client'),
    'window_finder': import('./manager/window/finder'),
  });
}
/**
 * Load Drumee rendering engine (LETC)
 * Work from electron
 * @param {*} e 
 */
async function start(e) {
  console.log(`Loading SERP Application`);
  let el = document.getElementById("main-loader");
  document.removeEventListener('drumee:ready', start);
  let base = '/-/';
  if (el && el.dataset.instance) {
    base = `/-/${el.dataset.instance}/`;
  }

  if (!Visitor.isOnline()) {
    return location.href = `${base}#/welcome`;
  }

  let loader = showLoader();
  await preloadKinds();

  import('./manager/index.js').then(async (m) => {
    let kind = 'perdrix_manager';
    let locale = require('../locale')(Visitor.language());
    LOCALE = { ...LOCALE, ...locale };
    Kind.register(kind, m.default);
    Kind.waitFor(kind).then((k) => {
      loader.remove();
      e.root.$el.addClass("perdrix-manager__root")
      console.log("AAA:68 -- LOADING THE MANGER", e.root, kind);
      e.root.feed({ kind });
    })
  })
}
document.addEventListener('drumee:router:ready', start);
