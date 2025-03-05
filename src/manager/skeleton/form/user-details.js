// ==================================================================== *
//   Copyright Xialia.com  2011-2023
//   FILE : \src\manager\skeleton\form\user-details.js
//   TYPE : Skeleton
// ==================================================================== *

function __row (_ui_, iconName, opt) {
  const formFig = `${_ui_.fig.family}-form`;

  opt.cn = opt.cn || '';
  let cn = opt.cn || '';
  delete opt.cn;

  const icon = Skeletons.Button.Svg({
    ico: iconName,
    className: `${formFig}__icon input-icon-prefix ${cn}`
  });

  const a = Skeletons.Box.Y({
    className: `${formFig}__row-wrapper input-wrapper ${cn} user-details`,
    kids: [
      Skeletons.EntryBox({
        className: `${formFig}__entry with-icon user-details`,
        formItem: 'name',
        sys_pn: 'ref-name',
        uiHandler: _ui_,
        prefix: icon,
        errorHandler: [_ui_],
        showError: false,
        ...opt
      }),
    ]
  });
  return a;
};

function __skl_reseller_manager_form_user_details (_ui_) {
  const formFig = `${_ui_.fig.family}-form`;

  const compOpt = {
    placeholder: LOCALE.COMPANY_NAME,
    preselect: 1,
    cn: 'company r1',
    formItem: 'company_name',
    validators: [
      {
        reason: LOCALE.REQUIRE_THAT_FIELD.format(LOCALE.COMPANY_NAME.toLowerCase()),
        comply: Validator.require
      }
    ]
  };

  const contactIcon = Skeletons.Button.Svg({
    ico: 'account_contacts',
    className: `${formFig}__icon input-icon-prefix`
  });

  const firtnameOpt = Skeletons.EntryBox({
    className   : `${formFig}__entry name firstname with-icon`,
    placeholder : LOCALE.FIRSTNAME,
    sys_pn      : 'ref-name',
    prefix      : contactIcon,
    formItem    : 'contact_firstname',
    uiHandler   : _ui_,
    showError   : false,
    errorHandler: [_ui_],
    validators: [
      {
        reason: LOCALE.REQUIRE_THAT_FIELD.format(LOCALE.FIRSTNAME.toLowerCase()),
        comply: Validator.require
      }
    ]
  });

  const lastnameOpt = Skeletons.EntryBox({
    className   : `${formFig}__entry name lastname with-icon`,
    placeholder : LOCALE.LASTNAME,
    sys_pn      : 'ref-name',
    prefix      : contactIcon,
    formItem    : 'contact_lastname',
    uiHandler   : _ui_,
    showError   : false,
    errorHandler: [_ui_],
    validators: [
      {
        reason: LOCALE.REQUIRE_THAT_FIELD.format(LOCALE.LASTNAME.toLowerCase()),
        comply: Validator.require
      }
    ]
  });

  const contactName = Skeletons.Box.X({
    className : `${formFig}__row-wrapper input-wrapper contact name`,
    kids      : [
      firtnameOpt,
      lastnameOpt
    ]
  })

  const jobOpt = {
    placeholder: LOCALE.PROFESSION_NAME,
    cn: 'job r1',
    formItem: 'contact_job',
    validators: [
      {
        reason: LOCALE.REQUIRE_THAT_FIELD.format(LOCALE.PROFESSION_NAME.toLowerCase()),
        comply: Validator.require
      }
    ]
  };

  const emailOpt = {
    mode: _a.commit,
    placeholder: LOCALE.PRO_EMAIL,
    cn: 'email r2',
    formItem: 'contact_email',
    validators: [
      {
        reason: LOCALE.ENTER_VALID_EMAIL,
        comply: Validator.email
      },
      {
        reason: LOCALE.REQUIRE_THAT_FIELD.format(LOCALE.EMAIL.toLowerCase()),
        comply: Validator.require
      }
    ]
  };

  const phoneOpt = {
    placeholder: LOCALE.PRO_PHONE,
    comply: _a.none,
    formItem: 'contact_phone',
    validators: [
      {
        reason: LOCALE.REQUIRE_THAT_FIELD.format(LOCALE.PRO_PHONE.toLowerCase()),
        comply: Validator.require
      },
      { reason: LOCALE.VALID_PHONE_NO , comply: Validator.phone }
    ]
  };

  // const messageOpt = {
  //   placeholder: LOCALE.MESSAGE,
  //   type: _a.textarea,
  //   cn: 'message r3',
  //   formItem: 'message',
  //   validators: [
  //     {
  //       reason: LOCALE.REQUIRE_THAT_FIELD.format(LOCALE.MESSAGE.toLowerCase()),
  //       comply: Validator.require
  //     }
  //   ]
  // };

  const formElements = Skeletons.Box.Y({
    className: `${formFig}__content`,
    sys_pn  : 'user-details-form',
    kids: [
      __row(_ui_, 'company', compOpt),
      contactName,
      __row(_ui_, 'chat_card', jobOpt),
      __row(_ui_, _a.email, emailOpt),
      __row(_ui_, 'telephone_handset', phoneOpt),
      // __row(_ui_, 'editbox_pencil', messageOpt)
    ]
  });

  const termsAndConditionsWrapper = Skeletons.Box.X({
    className : `${formFig}__row-wrapper input-wrapper terms-and-conditions`,
    sys_pn    : 'conditions-wrapper',
    dataset   : {
      lang : Visitor.language()
    },
    kids      : [
      Skeletons.Button.Svg({
        className : `${formFig}__icon checkbox conditions`,
        icons     : ["editbox_shapes-roundsquare", "available"],
        sys_pn    : 'conditions-checkbox',
        state     : 0,
        formItem  : _a.condition,
        reference : _a.state
      }),

      Skeletons.Note({
        className : `${formFig}__note conditions static`,
        content   : LOCALE.I_ACCEPT
      }),

      Skeletons.Note({
        className : `${formFig}__note conditions trigger text-underline`,
        content   : LOCALE.GENERAL_TERMS_USE,
        service   : 'open-terms-and-conditions',
        uiHandler : [_ui_]
      })
    ]
  })

  const button = Skeletons.Box.Y({
    className: `${formFig}__button-wrapper`,
    sys_pn: 'user-details-submit-button-wrapper',
    kids: [
      Skeletons.Box.X({
        className: `${formFig}_go_btn_wrapper`,
        kids: [
          Skeletons.Note({
            className: `${formFig}__button button action-btn`,
            service: _a.next,
            uiHandler: _ui_,
            content: LOCALE.NEXT
          })
        ]
      })
    ]
  });

  const form = Skeletons.Box.Y({
    className: `${formFig}__container user-details`,
    kids: [
      formElements,
      termsAndConditionsWrapper,
      button
    ]
  });

  const a = Skeletons.Box.Y({
    debug: __filename,
    className: `${formFig}__main user-details`,
    kids: [
      form      
    ]
  });

  return a;
};

export default __skl_reseller_manager_form_user_details;
