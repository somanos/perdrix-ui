/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// ==================================================================== *
//   Copyright Xialia.com  2011-2019
//   FILE : /src/drumee/builtins/player/skeleton/topbar.coffee
//   TYPE : Skeleton
// ==================================================================== *


// ===========================================================
//
// ===========================================================

module.exports = function (_ui_, size) {
  let a;
  const fig = `${_ui_.fig.family}-topbar`;
  const name = Skeletons.Note({
    className: _a.name,
    content:  LOCALE.LICENCE_DETAILS
  });


  return a = Skeletons.Box.X({
    className: `${fig}__main`,
    debug: __filename,
    sys_pn: 'topbar',
    justify: _a.right,
    service: _e.raise,
    uiHandler: _ui_,
    kids: [
      Skeletons.Box.X({
        className: `${fig}__title`,
        service: _e.raise,
        uiHandler: _ui_,
        kids: [
          name
        ]
      }),
      Skeletons.Window.TopbarControl(_ui_, "c")
    ]
  });
};
;
