// ==================================================================== *
//   Copyright Xialia.com  2011-2023
//   TYPE : Skeleton
// ==================================================================== *

/**
 * 
 * @param {*} _ui_ 
 * @param {*} content 
 * @param {*} className 
 * @returns 
 */
function __tooltips(_ui_, content, className) {
  let a;
  if (className == null) { className = ''; }
  return a = {
    className: `${_ui_.fig.family}__tooltips ${_ui_.fig.name}-tooltips ${className}`,
    content
  };
};

/**
 * 
 * @param {*} _ui_ 
 * @param {*} type 
 * @param {*} ico 
 * @returns 
 */
function __row(_ui_, type, ico) {
  const pfx = _ui_.fig.family;
  return Skeletons.Box.X({
    debug: __filename,
    className: `${pfx}__row-main`,
    kids: [
      Skeletons.Button.Svg({
        ico,
        className: `${pfx}__icon ${type}`
      }),
      Skeletons.Note({
        className: `${pfx}__text ${type}`,
        content: _ui_.mget(type)
      }),
    ]
  });
};;

//------------------------------------
//
//------------------------------------
module.exports = function (_ui_) {
  const pfx = _ui_.fig.family;
  const header = require("../../skeleton/header")(_ui_)
  let content = LOCALE.ACTIVATE_LICENCE;
  let status = _a.active;
  if(_ui_.mget(_a.status) == _a.active ){
    content = LOCALE.REVOKE_LICENCE;
    status = 'trial';
  }
  let buttons = require("../../../window/skeleton/buttons")(_ui_, {
    content,
    status,
    service : 'update-perdrix',
    className: `${_ui_.fig.group}__button button action-btn`,
  }, {
    content : LOCALE.SEND,
    service : 'send-perdrix'
  });

  const body = Skeletons.Box.Y({
    className: `${pfx}__body`,
    sys_pn: _a.content,
    kids: [
      //copyButton,
      Skeletons.Box.Y({
        className: `${pfx}__details`,
        kids: [
          __row(_ui_, _a.date, 'desktop__clock'),
          __row(_ui_, _a.domain, 'desktop_public'),
          __row(_ui_, _a.key, 'gen-certificate'),
          __row(_ui_, 'number_of_bays', 'nas'),
          __row(_ui_, _a.fullname, 'account'),
          buttons
        ]
      }),
      Skeletons.Wrapper.Y({
        sys_pn : "footer"
      })
    ]
  });


  const a = Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main`,
    kids: [
      header,
      body
      // Skeletons.Box.Y({
      //   className: `${pfx}__bdy_footer`,
      //   kids: [body]
      // })
    ]
  });

  return a;
};

