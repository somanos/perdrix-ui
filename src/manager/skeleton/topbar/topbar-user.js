// ==================================================================== *
//   Copyright Xialia.com  2011-2023
//   FILE :  
//   TYPE : 
// ==================================================================== *

const __desk_top_bar_user = function (_ui_) {
  const pfx = `${_ui_.fig.family}__topbar-user`;

  const a = Skeletons.Box.X({
    debug: __filename,
    className: `${pfx}__avatar`,
    kids: [
      {
        kind: "avatar",
        sys_pn: "ref-avatar"
      },
      require('./dropdown')(_ui_)
    ]
  });
  return Skeletons.Box.Y({
    sys_pn: "user-container",
    className: `${pfx}-container`,
    kids: [a],
    uiHandler: _ui_,
    partHandler: [_ui_]
  })
    ;
};

module.exports = __desk_top_bar_user;
