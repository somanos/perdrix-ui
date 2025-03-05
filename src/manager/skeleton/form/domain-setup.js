// ==================================================================== *
//   Copyright Xialia.com  2011-2023
//   FILE : \src\manager\skeleton\form\domain-setup.js
//   TYPE : Skeleton
// ==================================================================== *

function __row_item (_ui_, name, opt = {}) {
  const formFig = `${_ui_.fig.family}-form`;

  const fieldName = name.toLowerCase();

  const icon = Skeletons.Button.Svg({
    ico: 'desktop_settings',
    className: `${formFig}__icon input-icon-prefix ${fieldName}`
  });

  const a = Skeletons.Box.X({
    className : `${formFig}__row-wrapper input-wrapper ${fieldName} domain-setup`,
    kids      : [
      Skeletons.EntryBox({
        className   : `${formFig}__entry with-icon domain-setup`,
        sys_pn      : `entry-${fieldName}`,
        formItem    : fieldName,
        name        : fieldName,
        prefix      : icon,
        placeholder : LOCALE[name] || name,
        uiHandler   : _ui_,
        errorHandler: [_ui_],
        showError   : false,
        ...opt
      }),

      Skeletons.Button.Svg({
        ico       : 'info',
        className : `${formFig}__icon info-icon`,
        tooltips  : {
          content : LOCALE[name + '_TIPS'] || "",
        }
      })
    ]
  })

  return a;
}


function __skl_reseller_manager_form_domain_setup (_ui_) {
  const formFig = `${_ui_.fig.family}-form`;

  let categories = [
    'DOMAIN_NAME', 
    // 'DATA_DIR', 
    // 'DB_DIR', 
    // 'WALLPAPER_DIR', 
    // 'IMPORT_DIR', 
    // 'EXPORT_DIR',
  ] 

  let formElementKids = [];

  const validationOpt = {
    validators  : [{ reason: 'This field is required', comply: Validator.require }]
  }

  for (let name of categories) {
    formElementKids.push(
      __row_item(_ui_, name, validationOpt)
    )
  }

  const formElements = Skeletons.Box.Y({
    className: `${formFig}__content`,
    kids: formElementKids
  });

  const ownSSLOptionsWrapper = Skeletons.Box.X({
    className : `${formFig}__row-wrapper input-wrapper own_ssl ssl-dns-setup domain-setup`,
    kids      : [
      Skeletons.Button.Svg({
        className   : `${formFig}__icon option-icons checkbox`,
        icons       : ["editbox_shapes-roundsquare", "available"],
        sys_pn      : 'toggle-ssl-setup',
        state       : 0,
        values       : [0, 1],
        formItem    : 'own_ssl',
        service     : 'toggle-ssl-setup',
        trigger     : 'checkbox',
        uiHandler   : _ui_
      }),

      Skeletons.Note({
        className : `${formFig}__note own-ssl-label`,
        content   : LOCALE.OWN_SSL
      }),
    ]
  })
  
  const acme_own_ssl_path = Skeletons.Box.X({
    className : `${formFig}__row-wrapper input-wrapper acme_ssl_ca_path ssl-dns-setup domain-setup`,
    sys_pn    : 'acme-ssl-ca-path-wrapper',
    dataset   : {
      mode  : _a.closed
    },
    kids      : [
      __row_item(_ui_, 'ACME_SSL_CA_PATH')
    ]
  })

  const acme_ssl_dropdown = Skeletons.Box.X({
    className : `${formFig}__row-wrapper input-wrapper acme_ssl ssl-dns-setup domain-setup`,
    kids      : [
      Skeletons.Note({
        className : `${formFig}__note label`,
        content   : LOCALE.CHOOSE_SSL_PROVIDER
      }),
      
      require('./dropdown').default(_ui_, 'acme_ssl'),

      Skeletons.Button.Svg({
        ico       : 'info',
        className : `${formFig}__icon info-icon`,
        tooltips  : {
          content : LOCALE['SSL_CA_TIPS'] || "",
        }
      })
    ]
  })

  const acme_dns_dropdown = Skeletons.Box.X({
    className : `${formFig}__row-wrapper input-wrapper acme_dns ssl-dns-setup domain-setup`,
    kids      : [
      Skeletons.Note({
        className : `${formFig}__note label`,
        content   : LOCALE.CHOOSE_DNS_PROVIDER
      }),
      
      require('./dropdown').default(_ui_, 'acme_dns'),

      Skeletons.Button.Svg({
        ico       : 'info',
        className : `${formFig}__icon info-icon`,
        tooltips  : {
          content : LOCALE['ACME_DNS_TIPS'] || "",
        }
      })
    ]
  })

  const acmeEmailValidateOpt = {
    validators  : [{ reason: LOCALE.ENTER_VALID_EMAIL,comply: Validator.email }]
  }

  const acmeOptionsWrapper = Skeletons.Box.Y({
    className : `${formFig}__wrapper acme-options domain-setup`,
    sys_pn    : 'acme-options-wrapper',
    dataset   : {
      mode  : _a.open,
    },
    kids      : [
      acme_ssl_dropdown,
      acme_dns_dropdown,
      __row_item(_ui_, 'ACME_EMAIL_ACCOUNT', acmeEmailValidateOpt)
    ]
  })

  const buttons = Skeletons.Box.X({
    className: `${formFig}__button-wrapper`,
    sys_pn: 'ddomain-setup-submit-button-wrapper',
    kids: [
      Skeletons.Box.X({
        className: `${formFig}_go_btn_wrapper`,
        kids: [
          Skeletons.Note({
            className : `${formFig}__button button previous-btn`,
            service   : 'previous',
            uiHandler : _ui_,
            content   : LOCALE.PREVIOUS
          })
        ]
      }),

      Skeletons.Box.X({
        className: `${formFig}_go_btn_wrapper`,
        kids: [
          Skeletons.Note({
            className : `${formFig}__button button action-btn`,
            service   : _e.submit,
            uiHandler : _ui_,
            content   : LOCALE.SUBMIT
          })
        ]
      })
    ]
  });

  const form = Skeletons.Box.Y({
    className: `${formFig}__container domain-setup`,
    kids: [
      formElements,
      ownSSLOptionsWrapper,
      acme_own_ssl_path,
      acmeOptionsWrapper,
      buttons
    ]
  });

  const a = Skeletons.Box.Y({
    debug: __filename,
    className: `${formFig}__main domain-setup`,
    kids: [
      form
    ]
  });

  return a;
};

export default __skl_reseller_manager_form_domain_setup;
