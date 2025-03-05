// ==================================================================== *
//   Copyright Xialia.com  2011-2018
//   FILE : src/drumee/builtins/desk/skeleton/main
//   TYPE : 
// ==================================================================== *

const button = require('./button');

// ===========================================================
//
// ===========================================================
const __desk_dock = function (_ui_) {
  const pfx = _ui_.fig.family;
  const trash = Skeletons.Box.X({
    debug: __filename,
    className: `${_ui_.fig.family}__container`,
    kids: [button(_ui_, {
      ico: 'drumee-trash',//desktop_delete'
      className: `${pfx}__button trash`,
      service: _e.trash,
      sys_pn: "trash-bin",
      uiHandler: _ui_,
      tooltips: {
        className: `${_ui_.fig.family}__tooltips ${_ui_.fig.name}-tooltips`,
        content: LOCALE.BASKET
      }
    })]
  });

  const a = Skeletons.Box.X({
    className: `${pfx}__main`,
    sys_pn: "dock-container",
    debug: __filename,
    kids: [
      require('./launcher')(_ui_),
      trash
    ]
  });



  return a;
};
module.exports = __desk_dock;
