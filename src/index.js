
async function preloadKinds() {
  window.DrumeeWm = await Kind.waitFor('DrumeeWm');
  window.DrumeeInteractWindow = await Kind.waitFor('DrumeeInteractWindow');
  window.DrumeeInteractPlayer = await Kind.waitFor('DrumeeInteractPlayer');
  Kind.registerAddons(require("./seeds"));
}

/**
 * Load Drumee rendering engine (LETC)
 * Work from electron
 * @param {*} e 
 */
async function start(parent) {
  console.log(`Loading SERP Application`, parent);
  // let el = document.getElementById("main-loader");
  // let base = '/-/';
  // if (el && el.dataset.instance) {
  //   base = `/-/${el.dataset.instance}/`;
  // }
  const { endpoint } = bootstrap();
  if (!Visitor.isOnline()) {
    return location.href = `${endpoint}#/welcome`;
  }

  await preloadKinds();
  console.log("AAA:55 PLUGIN STARTED", typeof (uiRouter))
  // let loader = showLoader();

  import('./manager/index.js').then(async (m) => {
    let kind = 'perdrix_manager';
    let locale = require('../locale')(Visitor.language());
    LOCALE = { ...LOCALE, ...locale };
    Kind.register(kind, m.default);
    Kind.waitFor(kind).then((k) => {
      console.log("AAA:68 -- LOADING THE MANGER", kind);
      uiRouter.currentModule.feed({ kind })
    })
  })
}

if (document.readyState == 'complete') {
  start()
} else {
  document.addEventListener('drumee:plugins:ready', start);
}

