
module.exports = function(_ui_) {
  const figname = "topbar";
  const a = Skeletons.Box.X({
    className : `${_ui_.fig.family}-${figname}__container u-jc-sb`,
    sys_pn    : "browser-top-bar",
    service   : _e.raise,
    debug     : __filename,
    kids : [
      Skeletons.Box.X({
        className: `${_ui_.fig.family}-${figname}__title u-ai-center`,
        kids: [
          Skeletons.Box.X({
            className: `${_ui_.fig.family}-${figname}__title name`,
            sys_pn: "topbar-name",
            kids: [Skeletons.Note(LOCALE.SEARCH_RESULTS)]})
        ]}),
      Skeletons.Window.TopbarControl(_ui_, "sc")
    ]});

  return a;
};
