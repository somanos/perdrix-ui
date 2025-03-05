// ==================================================================== *
//   Copyright Xialia.com  2011-2023
//   FILE : src\manager\window\company\skeleton\topbar.js
//   TYPE : Skeleton
// ==================================================================== *

module.exports = function(_ui_, icon) {

  const figname = "topbar";
  const a = Skeletons.Box.X({
    className : `${_ui_.fig.group}-${figname}__container ${_ui_.mget(_a.area)}`,
    //sys_pn    : _a.topBar,
    service   : _e.raise,
    debug     : __filename,
    kids : [
      Skeletons.Button.Svg({
        className : `${_ui_.fig.family}-topbar__icon`,
        ico       : "editbox_list-plus",
        service   : "create-company",
        uiHandler : [_ui_]
      }),

      Skeletons.Box.X({
        className: `${_ui_.fig.group}-${figname}__title ${_ui_.fig.family}-${figname}__title`,
        kids: [
          Skeletons.Note({
            className : _a.name,
            content   : LOCALE.COMPANIES,
            //sys_pn    : "ref-window-name",
            uiHandler : _ui_,
            partHandler : _ui_,
          })
          //settings
        ]}),
      
      Skeletons.Window.TopbarControl(_ui_, "vsc")
    ]});
  return a;
};;
