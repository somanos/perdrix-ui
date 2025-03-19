
module.exports = function (ui) {
  const figname = "topbar";
  const searchbox = {
    kind: "search",
    flow: _a.x,
    className: `${ui.fig.family}-${figname}__searchbox`,
    placeholder: LOCALE.FILTER,
    listClass: "found-box",
    sys_pn: 'search-box',
    mode: _a.interactive,
    interactive: _a.service,
    service: _e.search,
    uiHandler: [ui],
    showError:false
  };
  return Skeletons.Box.G({
    className: `${ui.fig.family}-${figname}__container`,
    sys_pn: "browser-top-bar",
    service: _e.raise,
    debug: __filename,
    kids: [
      require('./menu')(ui),
      searchbox,
      Skeletons.Box.X({
        className: `${ui.fig.family}-${figname}__title u-ai-center`,
        kids: [
          Skeletons.Box.X({
            className: `${ui.fig.family}-${figname}__title name`,
            sys_pn: "topbar-name",
            kids: [Skeletons.Note("Liste des clients")]
          })
        ]
      }),
      Skeletons.Window.TopbarControl(ui, "sc")
    ]
  });
};
