function dockLaunchers(_ui_, ismobile) {
  if (ismobile == null) { ismobile = false; }
  let profileType = 'pro';

  const button_class = `${_ui_.fig.family}__button launcher ${profileType}`;
  const pfx = _ui_.fig.family;

  const button = require('./button');
  let launchers = [
    button(_ui_, {
      ico: 'geolocation',
      className: `${button_class} address launcher-icon`,
      respawn: 'window_address',
      service: _e.launch
    }, "Liste des addresse"),
    button(_ui_, {
      ico: 'desktop_group',
      className: `${button_class} customer launcher-icon`,
      respawn: 'window_customer_list',
      service: _e.launch
    }, "Liste des clients"),
    button(_ui_, {
      ico: 'desktop_group',
      className: `${button_class} customer launcher-icon plus`,
      respawn: 'form_customer',
      service: _e.launch,
    }, "Ajouter un client"),
    button(_ui_, {
      ico: 'maintenance',
      className: `${button_class} site launcher-icon`,
      respawn: 'window_site_list',
      service: _e.launch
    }, "Liste des chantiers"),
    button(_ui_, {
      ico: 'maintenance',
      className: `${button_class} site launcher-icon plus`,
      respawn: 'customer_selector',
      service: _e.launch,
    }, "Ajouter un chantier"),
    button(_ui_, {
      ico: 'account_name',
      className: `${button_class} poc launcher-icon`,
      service: _e.launch,
      respawn: 'window_site_poc',
    }, "Liste des contacts chantier"),
    button(_ui_, {
      ico: 'account_name',
      className: `${button_class} poc launcher-icon plus`,
      respawn: 'form_poc',
      service: _e.launch
    }, "Créer un contact chantier"),
    button(_ui_, {
      ico: 'desktop_docfile',
      className: `${button_class} quote launcher-icon`,
      service: _e.launch,
      respawn: 'window_quote_list',
    }, "Liste des devis"),
    button(_ui_, {
      ico: 'desktop_docfile',
      className: `${button_class} quote launcher-icon plus`,
      respawn: 'form_poc',
      service: _e.launch
    }, "Créer un devis"),
    button(_ui_, {
      ico: 'menu_pages',
      className: `${button_class} bill launcher-icon`,
      respawn: 'window_bill_list',
      service: _e.launch
    }, "Liste des facture"),
    button(_ui_, {
      ico: 'menu_pages',
      className: `${button_class} bill launcher-icon plus`,
      respawn: 'form_poc',
      service: _e.launch
    }, "Créer une facture"),
    // button(_ui_, {
    //   ico: 'menu_pages',
    //   className: `${button_class} bill launcher-icon`,
    //   respawn: 'window_balance',
    //   service: _e.launch
    // }, "Liste des facture"),
  ]
  if (Env.get('quote_home')) {
    launchers.push(
      button(_ui_, {
        ...Env.get('quote_home'),
        nodeName: "quote_home",
        ico: 'drumee-folder',
        className: `${button_class} perdrix quote launcher-icon`,
        innerClass: 'addressbook',
        sys_pn: 'quote-launcher',
        service: _e.view
      }, "Dossier des devis"),
    )
  }
  if (Env.get('bill_home')) {
    launchers.push(
      button(_ui_, {
        ...Env.get('bill_home'),
        nodeName: "bill_home",
        ico: 'drumee-folder',
        className: `${button_class} perdrix bill launcher-icon`,
        innerClass: 'addressbook',
        sys_pn: 'bill-launcher',
        service: _e.view
      }, "Dossier des factures"),
    )
  }
  return Skeletons.Box.X({
    debug: __filename,
    className: `${pfx}__container application launcher ${profileType}`,
    kids: launchers
  });
};

module.exports = dockLaunchers;
