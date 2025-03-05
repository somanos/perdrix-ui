// ==================================================================== *
//   Copyright Xialia.com  2011-2023
//   TYPE : Skeleton
// ==================================================================== *


const __row_item = require("../../../skeleton/entry");

function __skl_license_manager_form_domain_setup(_ui_) {
  const formFig = `${_ui_.fig.family}-form`;

  let categories = [
    'EMAIL',
    'FIRSTNAME',
    'LASTNAME',
    'COMPANY'
  ]

  let subtitle = Skeletons.Box.X({
    className: `${formFig}__subtitle-container`,
    kids: [
      Skeletons.Note({
        className: `${formFig}__subtitle`,
        service: 'trial-perdrix',
        uiHandler: _ui_,
        content: LOCALE.CREATE_CUSTOMER_FILE
      })
    ]
  })
  let formElementKids = [];

  const validationOpt = {
    validators: [{ reason: LOCALE.REQUIRE_THIS_FIELD, comply: Validator.require }]
  }

  for (let name of categories) {
    let opt = { ...validationOpt };
    let api, itemsOpt;
    if (name == 'COMPANY') {
      api = _SVC.enterprise.search;
      itemsOpt = {
        type: 'company',
        service: 'select-company',
      }
    } else {
      api = _SVC.customer.contact_search;
      itemsOpt = {
        type: 'contact',
        service: 'select-contact',
      }
    }
    itemsOpt = {...itemsOpt, kind: 'thumbnail_grid', uiHandler: [_ui_]}
    opt = {
      ...validationOpt,
      interactive: 1,
      service: _a.search,
      searchOpt: { api, itemsOpt },
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


  const buttons = Skeletons.Box.X({
    className: `${formFig}__button-wrapper`,
    sys_pn: 'ddomain-setup-submit-button-wrapper',
    kids: [
      Skeletons.Box.X({
        className: `${formFig}_go_btn_wrapper`,
        kids: [
          Skeletons.Note({
            className: `${formFig}__button button cancel-btn`,
            service: 'close-form',
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

  const form = Skeletons.Box.Y({
    className: `${formFig}__container domain-setup`,
    kids: [
      subtitle,
      formElements,
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
