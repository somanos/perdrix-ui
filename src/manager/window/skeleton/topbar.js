// ==================================================================== *
//   Copyright Xialia.com  2011-2019
//   FILE : __dbg_path
//   TYPE : Skelton
// ==================================================================== *

module.exports = function(_ui_, title) {

  const figname = "topbar";
  const a = Skeletons.Box.X({
    className : `${_ui_.fig.group}-${figname}__container customer ${_ui_.mget(_a.area)}`,
    //sys_pn    : _a.topBar,
    service   : _e.raise,
    debug     : __filename,
    kids : [
      Skeletons.Button.Svg({
        ico       : "editbox_list-plus",
        service   : _e.create,
        className : `${_ui_.fig.family}-topbar__icon`
      }),
      Skeletons.Box.X({
        className: `${_ui_.fig.group}-${figname}__title ${_ui_.fig.family}-${figname}__title`,
        kids: [
          Skeletons.Note({
            uiHandler : _ui_,
            partHandler : _ui_,
            className : _a.name,
            content   : title
          })
          //settings
        ]}),
      Skeletons.Window.TopbarControl(_ui_, "sc")
    ]});
  return a;
};;
