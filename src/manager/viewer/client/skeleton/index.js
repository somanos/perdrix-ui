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
function __row(_ui_, label, ico) {
  //const pfx = _ui_.fig.family;
  const pfx = `${_ui_.fig.group}__row`;
  const inner = Skeletons.Box.G({
    debug: __filename,
    className: `${pfx}-container`,
    kids: [
      Skeletons.Button.Svg({
        ico,
        className: `${pfx}-icon medium`
      }),
      Skeletons.Note({
        className: `${pfx}-label`,
        content: label
      }),
    ]
  });
  return Skeletons.Box.X({
    className: `${pfx}-wrapper`,
    kids: [inner]
  })
};;

//------------------------------------
//
//------------------------------------
module.exports = function (_ui_) {
  //uiHandler : [_ui_]    

  //sys_pn    : "ref-invitation"
  const pfx = _ui_.fig.family;
  const header = Skeletons.Box.X({
    className: `${pfx}__header ${_ui_.fig.group}__header`,
    kids: [require('./topbar')(_ui_)],
    sys_pn: _a.header
  });

  const dialog = Skeletons.Wrapper.Y({
    className: `${_ui_.fig.group}__wrapper--modal dialog__wrapper--modal ${_ui_.fig.family}__wrapper--modal`,
    name: "dialog"
  });

  const body = Skeletons.Box.Y({
    className: `${_ui_.fig.group}__container`,
    sys_pn: _a.content,
    kids: [
      __row(_ui_, _ui_.mget(_a.firstname), 'account_info'),
      __row(_ui_, _ui_.mget(_a.lastname), 'account_info'),
      __row(_ui_, _ui_.mget(_a.email), 'email'),
      __row(_ui_, LOCALE.ENTERPRISE, 'company', "view-enterprise"),
      __row(_ui_, LOCALE.LICENCES, 'gen-certificate', "view-perdrixs"),
    ]
  });

  const footer = Skeletons.Box.Y({
    className: `${pfx}__footer`,
    sys_pn: _a.footer
  });


  const a = Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main ${_ui_.fig.group}__main`,
    kids: [
      header,
      Skeletons.Box.Y({
        className: `${pfx}__container ${_ui_.fig.group}__container`,
        kids: [body, footer, dialog]
      })
    ]
  });

  return a;
};

// `customer` (
//   `id` varchar(16) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
//   `ctime` int(11) DEFAULT NULL,
//   `email` varchar(256) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
//   `firstname` varchar(256) DEFAULT NULL,
//   `profile` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`profile`)),
//   `lastname` varchar(256) DEFAULT NULL,
//   `fullname` varchar(128) GENERATED ALWAYS AS (if(concat(ifnull(`firstname`,''),' ',convert(ifnull(`lastname`,'') using utf8mb4)) = ' ',convert(`email` using utf8mb4),concat(ifnull(`firstname`,''),' ',convert(ifnull(`lastname`,'') using utf8mb4)))) VIRTUAL,
//   `bu_id` varchar(16) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
//   `contact_id` varchar(16) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
