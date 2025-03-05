// ==================================================================== *
//   Copyright Xialia.com  2011-2021
//   FILE : /src/drumee/modules/desk/wm/dock/skeleton/launcher.coffee
//   TYPE : Skeleton
// ==================================================================== *


// ==================================================================== *
//
// ==================================================================== *
const __dock_widget_launchers = function (_ui_, ismobile) {
  if (ismobile == null) { ismobile = false; }
  let profileType = 'pro';

  const button_class = `${_ui_.fig.family}__button launcher ${profileType}`;
  const pfx = _ui_.fig.family;

  const button = require('./button');
  const a = Skeletons.Box.X({
    debug: __filename,
    className: `${pfx}__container application launcher ${profileType}`,
    kids: [
      button(_ui_, {
        ico: 'desktop_group',
        className: `${button_class} customer launcher-icon`,
        innerClass: 'customer',
        sys_pn: 'customer-launcher',
        respawn: 'window_customer',
        helperName: 'customer',
        service: _e.launch
      }, LOCALE.CUSTOMERS),
      button(_ui_, {
        ico: 'company',
        className: `${button_class} company launcher-icon`,
        innerClass: 'company',
        sys_pn: 'company-launcher',
        respawn: 'window_company',
        service: _e.launch,
        helperName: 'company'
      }, LOCALE.COMPANIES),
      button(_ui_, {
        ico: 'gen-certificate',
        className: `${button_class} perdrix launcher-icon`,
        service: _e.launch,
        respawn: 'window_perdrix',
        helperName: 'perdrix',
      }, LOCALE.LICENCES),
      button(_ui_, {
        ico: 'desktop_contactbook',
        className: `${button_class} schedule launcher-icon`,
        innerClass: 'addressbook',
        sys_pn: 'addressbook-launcher',
        respawn: 'window_addressbook',
        helperName : 'addressbook',
        service: _e.launch
      }, LOCALE.CONTACTS),
    ]
  });

  return a;
};

module.exports = __dock_widget_launchers;
