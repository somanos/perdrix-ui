
const __media_skl_row = function (ui) {
  let a;
  const type = ui.mget(_a.type);
  const pfx = `${ui.fig.group}__filter`;

  const header = Skeletons.Box.G({
    className: `${pfx}__main`,
    kids: [
      Skeletons.Box.X(),
      Skeletons.Box.X(),
      Skeletons.Button.Label({
        ico: 'desktop_sortby',
        className: `${pfx}__column name`,
        labelClass: `${pfx}__label name`,
        label: LOCALE.DOMAIN_NAME,
        service: _e.sort,
        state: 0,
        name: _a.name
      }),
      Skeletons.Button.Label({
        ico: 'desktop_sortby',
        className: `${pfx}__column date`,
        labelClass: `${pfx}__label date`,
        label: LOCALE.CREATION_DATE,
        service: _e.sort,
        state: 0,
        name: _a.date
      }),
      Skeletons.Button.Label({
        ico: 'desktop_sortby',
        className: `${pfx}__column size`,
        labelClass: `${pfx}__label size`,
        label: LOCALE.SIZE,
        service: _e.sort,
        state: 0,
        name: _a.size
      }),
      Skeletons.Button.Label({
        ico: 'desktop_sortby',
        className: `${pfx}__column type`,
        labelClass: `${pfx}__label type`,
        label: LOCALE.TYPE,
        state: 0
      })
    ]
  });


  // const list = Skeletons.List.Smart({
  //   className: `${ui.fig.group}__table suggestion`,
  //   sys_pn: _a.list
  // });

  const list = Skeletons.List.Smart({
    className: `${ui.fig.group}__content-row drive-list`,
    innerClass: "drive-content-scroll",
    sys_pn: _a.list,
    flow: _a.none,
    timer: 2000,
    uiHandler: null,
    dataset: {
      role: _a.container,
    },
    itemsOpt: {
      kind: 'search_results',
      flow: _a.x,
      service: ui.mget('itemService') || 'open-node',
      type,
      role: ui.mget(_a.role) || '',
      logicalParent: ui
    },
    vendorOpt: Preset.List.Orange_e,
    api: ui.getCurrentApi
  });

  return a = Skeletons.Box.Y({
    debug: __filename,
    className: 'u-ai-center',
    styleOpt: {
      width: _K.size.full,
      height: _K.size.full,
      padding: '0 0 10px'
    },
    kids: [
      header,
      list
    ]
  });
};

module.exports = __media_skl_row;