function dockLaunchers(_ui_, ismobile) {
  if (ismobile == null) { ismobile = false; }
  let profileType = 'pro';

  const button_class = `${_ui_.fig.family}__button launcher ${profileType}`;
  const pfx = _ui_.fig.family;

  const button = require('./button');
  return Skeletons.Box.X({
    debug: __filename,
    className: `${pfx}__container application launcher ${profileType}`,
    kids: [
      button(_ui_, {
        ico: 'desktop_group',
        className: `${button_class} customer launcher-icon`,
        innerClass: 'customer',
        sys_pn: 'customer-launcher',
        respawn: 'window_customer_list',
        helperName: 'customer',
        service: _e.launch
      }, "Liste des clients"),
      button(_ui_, {
        ico: 'desktop_contactbook',
        className: `${button_class} company launcher-icon`,
        innerClass: 'company',
        sys_pn: 'new-customer-launcher',
        respawn: 'form_customer',
        service: _e.launch,
        helperName: 'company'
      }, "Ajouter un client"),
      button(_ui_, {
        ico: 'book',
        className: `${button_class} perdrix launcher-icon`,
        service: _e.launch,
        respawn: 'window_poc',
        helperName: 'perdrix',
      }, "Liste des contacts"),
      button(_ui_, {
        ico: 'book',
        className: `${button_class} schedule launcher-icon`,
        innerClass: 'addressbook',
        sys_pn: 'new-poc-launcher',
        respawn: 'form_poc',
        helperName : 'addressbook',
        service: _e.launch
      }, "Créer un contact"),
      button(_ui_, {
        ico: 'editbox_fill',
        className: `${button_class} schedule launcher-icon`,
        innerClass: 'addressbook',
        sys_pn: 'new-balance-launcher',
        respawn: 'window_balance',
        helperName : 'addressbook',
        service: _e.launch
      }, "Liste des factures"),
    ]
  });
};

module.exports = dockLaunchers;
