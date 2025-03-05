// ==================================================================== *
//   Copyright Xialia.com  2011-2023
//   FILE : liceman\src\manager\skeleton\form\domain-setup.js
//   TYPE : Skeleton
// ==================================================================== *

function __row_item(_ui_, name, opt = {}) {
  const formFig = `${_ui_.fig.family}-form`;

  const fieldName = name.toLowerCase();

  const icon = Skeletons.Button.Svg({
    ico: 'desktop_settings',
    className: `${formFig}__icon input-icon-prefix ${fieldName}`
  });

  const a = Skeletons.Box.X({
    className: `${formFig}__row-wrapper input-wrapper ${fieldName} domain-setup`,
    kids: [
      Skeletons.EntryBox({
        className: `${formFig}__entry with-icon domain-setup`,
        sys_pn: `entry-${fieldName}`,
        formItem: fieldName,
        name: fieldName,
        prefix: icon,
        placeholder: LOCALE[name] || name,
        uiHandler: _ui_,
        errorHandler: [_ui_],
        showError: true,
        ...opt
      }),
    ]
  })
  let tips = LOCALE[name + '_TIPS'];
  if (tips) {
    a.kids.push(Skeletons.Button.Svg({
      ico: 'info',
      className: `${formFig}__icon info-icon`,
      tooltips: {
        content: tips,
      }
    }))
  }
  return a;
}


function __skl_license_manager_form_domain_setup(_ui_) {
  const formFig = `${_ui_.fig.family}-form`;

  let categories = [
    'DOMAIN_NAME',
    'NUMBER_OF_BAYS',
    'END_USER',
    // 'DATA_DIR', 
    // 'DB_DIR', 
    // 'WALLPAPER_DIR', 
    // 'IMPORT_DIR', 
    // 'EXPORT_DIR',
  ]

  let subtitle = Skeletons.Box.X({
    className: `${formFig}__subtitle-container`,
    kids: [
      Skeletons.Note({
        className: `${formFig}__subtitle`,
        service: 'trial-perdrix',
        uiHandler: _ui_,
        content: LOCALE.CREATE_BUSINESS_FILE,
      })
    ]
  })
  let formElementKids = [];

  const validationOpt = {
    validators: [{ reason: LOCALE.REQUIRE_THIS_FIELD, comply: Validator.require }]
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


  const buttons = Skeletons.Box.X({
    className: `${formFig}__button-wrapper`,
    sys_pn: 'ddomain-setup-submit-button-wrapper',
    kids: [
      Skeletons.Box.X({
        className: `${formFig}_go_btn_wrapper`,
        kids: [
          Skeletons.Note({
            className: `${formFig}__button button cancel-btn`,
            service: 'cancel-perdrix-creation',
            uiHandler: _ui_,
            content: LOCALE.CANCEL
          })
        ]
      }),

      Skeletons.Box.X({
        className: `${formFig}_go_btn_wrapper`,
        kids: [
          Skeletons.Note({
            className: `${formFig}__button button action-btn`,
            service: 'submit-perdrix-creation',
            uiHandler: _ui_,
            content: LOCALE.CREATE
          })
        ]
      })
    ]
  });

  const perdrixType = Skeletons.Switch({
    className: `${formFig}__switch`,
    sys_pn: 'perdrix-type-switch',
    service: 'perdrix-type',
    uiHandler: _ui_,
    state: 0,
    values: ['trial', _a.active],
    vendorOpt: [
      { label: LOCALE.TRIAL_LICENCE },
      { label: LOCALE.PAID_LICENCE }
    ]
  })
  const form = Skeletons.Box.Y({
    className: `${formFig}__container domain-setup`,
    kids: [
      subtitle,
      formElements,
      perdrixType,
      //ownSSLOptionsWrapper,
      //acme_own_ssl_path,
      //acmeOptionsWrapper,
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

export default __skl_license_manager_form_domain_setup;
