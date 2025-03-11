
function search_box(_ui_) {
  const pfx = `${_ui_.fig.group}-topbar`;

  const search = {
    kind: "search",
    flow: _a.x,
    className: `${pfx}__searchbox entry`,
    placeholder: LOCALE.FILTER,
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
    ]
  });

};

module.exports = search_box;
