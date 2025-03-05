
function search_box(_ui_) {
  const pfx = `${_ui_.fig.group}-topbar`;

  const search_icon = Skeletons.Button.Svg({
    className: `${pfx}__searchbox icon`,
    ico: "lens"
  });

  const search = {
    kind: "search",
    flow: _a.x,
    className: `${pfx}__searchbox entry`,
    placeholder: LOCALE.SEARCH,
    listClass: "found-box",
    sys_pn: 'search-box',
    mode: _a.interactive,
    interactive: _a.service,
    service: _e.search,
    uiHandler: [_ui_]
  };

  return Skeletons.Box.X({
    className: `${pfx}__searchbox inner`,
    kids: [
      search,
      search_icon
    ]
  });

};

module.exports = search_box;
