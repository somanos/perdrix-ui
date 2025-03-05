// ==================================================================== *
//   Copyright Xialia.com  2011-2019
//   FILE : __dbg_path
//   TYPE : Skelton
// ==================================================================== *

const __window_topbar = function(_ui_, icon) {
  const media = _ui_.mget(_a.media) || _ui_;
  const name = _ui_.model.get(_a.filename) || "";

  const settings =  Skeletons.Button.Svg({
    ico       : "editbox_cog",
    uiHandler : _ui_,
    part      : _ui_,
    sys_pn    : "ref-window-icon",
    className : "icon",
    service   : "show-settings"
  });

  const figname = "topbar";
  const a = Skeletons.Box.X({
    className : `${_ui_.fig.group}-${figname}__container ${_ui_.mget(_a.area)}`,
    sys_pn    : _a.topBar,
    service   : _e.raise,
    debug     : __filename,
    kids : [
      Skeletons.Box.X({
        className: `${_ui_.fig.group}-${figname}__title`,
        kids: [
          Skeletons.Note({
            sys_pn    : "ref-window-name",
            uiHandler : _ui_,
            partHandler : _ui_,
            className : "name",
            content   : name
          }),
          settings
        ]}),
      Skeletons.Wrapper.Y({
        className : `${_ui_.fig.group}__wrapper--context dialog__wrapper--context`,
        name      : "context",
        uiHandler   : _ui_,
        partHandler : _ui_
      }),

      require('./control')(_ui_)
    ]});
  return a;
};
module.exports = __window_topbar;
