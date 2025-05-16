
/**
 * 
 * @param {*} ui 
 * @returns 
 */
const _icons_list = function (ui) {
  const a = Skeletons.List.Smart({
    className: `${ui.fig.family}__icons-list`,
    innerClass: `${ui.fig.family}__icons-scroll ${ui.fig.group}__icons-scroll`,
    sys_pn: _a.list,
    flow: _a.none,
    vendorOpt: Preset.List.Orange_e,
  });

  return a;
};

/**
 * 
 * @param {*} ui 
 * @returns 
 */
const ___window_manager = function (ui) {

  const family = ui.fig.family;
  const group = ui.fig.group;
  const modal = 'wrapper-modal';
  const a = Skeletons.Box.Y({
    sys_pn: "wm-container",
    className: `${family}__main desk-window-wrapper`,
    debug: __filename,
    kids: [
      Skeletons.Box.Y({
        sys_pn    : "top-bar",
        className : `${ui.fig.family}__topbar`,
        kids      : [require('./topbar')(ui)]
      }),
      Skeletons.FileSelector({
        partHandler: ui,
      }),
      _icons_list(ui),
      Skeletons.Wrapper.Y({
        sys_pn: "windows-layer",
        className: `${family}__layer ${group}__layer`,
        sortWithCollection: false
      }),

      Skeletons.Wrapper.Y({
        className: `${family}__wrapper-tooltips ${group}__wrapper-tooltips`,
        name: "tooltips"
      }),

      Skeletons.Box.Y({
        className: `${family}__moving-tooltips ${group}__voming-tooltips`,
        sys_pn: "moving-tooltips",
        state:0,
      }),

      Skeletons.Wrapper.Y({
        className: `window__${modal} ${family}__${modal} ${group}__${modal} XXXX`,
        name: "modal"
      }),

      Skeletons.Box.X({
        kids: [
          { kind: 'perdrix_dock', sys_pn: 'dock' },
        ]
      })
    ]
  });

  return a;
};

module.exports = ___window_manager;
