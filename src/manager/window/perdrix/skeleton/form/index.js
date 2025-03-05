// ==================================================================== *
//   Copyright Xialia.com  2011-2023
//   FILE : liceman\src\manager\skeleton\form\domain-setup.js
//   TYPE : Skeleton
// ==================================================================== *


export default function (_ui_) {
  const __row_item = require("../../../skeleton/entry");
  const formFig = `${_ui_.fig.family}-form`;

  let categories = [
    'DOMAIN_NAME',
    'NUMBER_OF_BAYS',
    'END_USER',
  ]

  let subtitle = Skeletons.Box.X({
    className: `${formFig}__subtitle-container`,
    kids: [
      Skeletons.Note({
        className: `${formFig}__subtitle`,
        service: 'trial-perdrix',
        uiHandler: _ui_,
        content: LOCALE.GENERATE_LICENCE
      })
    ]
  })
  let formElementKids = [];

  const validationOpt = {
    validators: [{ reason: LOCALE.REQUIRE_THIS_FIELD, comply: Validator.require }]
  }

  for (let name of categories) {
    let opt = { ...validationOpt };
    if (name == 'END_USER') {
      opt = {
        ...validationOpt,
        interactive: 1,
        service: _a.search,
        searchOpt: {
          api: _SVC.customer.search,
          itemsOpt: {
            kind: 'thumbnail_grid',
            type: 'customer',
            service: 'select-customer',
            uiHandler: [_ui_]
          }
        },
      }
    }
    formElementKids.push(
      __row_item(_ui_, name, opt)
    )
  }

  const formElements = Skeletons.Box.Y({
    className: `${formFig}__content`,
    sys_pn: 'entries',
    kids: formElementKids
  });

  // const sslOptions = Skeletons.Box.Y({
  //   className: `${formFig}__content`,
  //   sys_pn: 'ssloptions',
  //   kids: [
  //     __row_item(_ui_, 'CERTS_DIR', {interactive: 1}),
  //     __row_item(_ui_, 'ACME_ACCOUNT_EMAIL', {interactive: 1}),
  //   ]
  // });

  const buttons = require("../../../skeleton/buttons")(_ui_, {
  }, {
    service: 'submit-perdrix-creation',
    content: LOCALE.CREATE
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
      //sslOptions,
      perdrixType,
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
