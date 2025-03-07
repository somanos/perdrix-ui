
module.exports = function(ui) {
  const figname = "topbar";
  const a = Skeletons.Box.X({
    className : `${ui.fig.family}-${figname}__container u-jc-sb`,
    sys_pn    : "browser-top-bar",
    service   : _e.raise,
    debug     : __filename,
    kids : [
      require('./menu')(ui),
      Skeletons.Box.X({
        className: `${ui.fig.family}-${figname}__title u-ai-center`,
        kids: [
          Skeletons.Box.X({
            className: `${ui.fig.family}-${figname}__title name`,
            sys_pn: "topbar-name",
            kids: [Skeletons.Note(LOCALE.SEARCH_RESULTS)]})
        ]}),
      Skeletons.Window.TopbarControl(ui, "sc")
    ]});

  return a;
};
