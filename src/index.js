
/**
 * 
 * @param {*} data 
 */
function setEnv(data) {
  Env.set(data)
  Visitor.canRead = function () {
    return (data.privilege & _K.permission.read)? 1 : 0;
  };
  Visitor.canWrite = function () {
    return (data.privilege & _K.permission.write)? 1 : 0;
  };
  Visitor.isPdxAdmin = function () {
    return (data.privilege & _K.permission.delete)? 1 : 0;
  };
  window.PLUGINS = Platform.get('plugins');
}

/** 
 * Use Winwow Manager from Drumee SDK 
 */
async function prepare() {
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
    Drumee.failover({ status: 500 })
    return
  }

  setEnv(data);

  if (!Visitor.canRead()) {
    Drumee.failover({ status: 403 })
    return
  }

  if (location.host != data.app_home) {
    location.host = data.app_home;
    return;
  }

  await prepare();

  console.log("Loading Plugins Application");

  import('./manager/index.js').then(async (m) => {
    let kind = 'perdrix_manager';
    let locale = require('../locale')(Visitor.language());
    LOCALE = { ...LOCALE, ...locale };
    Kind.register(kind, m.default);
    Kind.waitFor(kind).then((k) => {
      console.log("Loading Plugin Entry", kind);
      if (location.hash) {
        uiRouter.currentModule.feed({ kind })
      } else {
        uiRouter.ensurePart(_a.body).then((p) => {
          p.feed({ kind });
        })
      }
    })
  })
}


if (document.readyState == 'complete') {
  start()
} else {
  if (location.hash) {
    document.addEventListener('drumee:plugins:ready', start);
  } else {
    document.addEventListener('drumee:router:ready', start);
  }
}

