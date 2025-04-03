/** 
 * Use Winwow Manager from Drumee SDK 
 */
async function preloadKinds() {
  window.DrumeeWm = await Kind.waitFor('DrumeeWm');
  window.DrumeeInteractWindow = await Kind.waitFor('DrumeeInteractWindow');
  window.DrumeeInteractPlayer = await Kind.waitFor('DrumeeInteractPlayer');
  Kind.registerAddons(require("./seeds"));
}

/**
 * Drumee UI Plugin start here
 * @param {*} e 
 */
async function start(parent) {
  console.log(`Loading PERDRIX Application`, uiRouter, parent);
  const { endpoint } = bootstrap();
  if (!Visitor.isOnline()) {
    return location.href = `${endpoint}#/welcome`;
  }

  let data = await uiRouter.fetchService("pdx_utils.get_env");
  if (!data || !data.app_home) {
    console.error("Could not get application env", data);
    Drumee.failover({ status: 403 })
    return
  }
  Env.set(data)

  if (location.host != data.app_home) {
    location.host = data.app_home;
    return;
  }

  await preloadKinds();
  console.log("Loading Plugins Application");

  import('./manager/index.js').then(async (m) => {
    let kind = 'perdrix_manager';
    let locale = require('../locale')(Visitor.language());
    LOCALE = { ...LOCALE, ...locale };
    Kind.register(kind, m.default);
    Kind.waitFor(kind).then((k) => {
      console.log("Loading Plugin Entry", kind);
      uiRouter.currentModule.feed({ kind })
    })
  })
}

if (document.readyState == 'complete') {
  start()
} else {
  document.addEventListener('drumee:plugins:ready', start);
}

