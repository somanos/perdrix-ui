
async function preloadKinds() {
  window.DrumeeWm = await Kind.waitFor('DrumeeWm');
  window.DrumeeInteractWindow = await Kind.waitFor('DrumeeInteractWindow');
  window.DrumeeInteractPlayer = await Kind.waitFor('DrumeeInteractPlayer');
  Kind.registerAddons({
    'customer_form': import('./manager/widget/form/customer'),
    'customer_item': import('./manager/widget/customer-item'),
    'location_item': import('./manager/widget/location-item'),
    'menu_input': import('./manager/widget/menu-input'),
    'perdrix_dock': import('./manager/dock'),
    'radio_buttons': import('./manager/widget/radio-buttons'),
    'search_results': import('./manager/widget/search-results'),
    'window_customer_list': import('./manager/window/customer-list'),
    'window_customer': import('./manager/window/customer'),
    'window_finder': import('./manager/window/finder'),
    'work_form': import('./manager/widget/form/work'),
    'work_item': import('./manager/widget/work-item/index.js'),
    'work_list': import('./manager/widget/work-list'),
  });
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

  if (!Visitor.isOnline()) {
    return location.href = `${base}#/welcome`;
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


console.log("AAA:55 PLUGIN LOADED", document.readyState, typeof (uiRouter))
if (document.readyState == 'complete') {
  start()
} else {
  document.addEventListener('drumee:plugins:ready', start);
}

