
/**
 * 
 * @param {*} _ui_ 
 * @returns 
 */
const _icons_list = function (_ui_) {
  const a = Skeletons.List.Smart({
    className: `${_ui_.fig.family}__icons-list`,
    innerClass: `${_ui_.fig.family}__icons-scroll ${_ui_.fig.group}__icons-scroll`,
    sys_pn: _a.list,
    flow: _a.none,
    vendorOpt: Preset.List.Orange_e,
  });

  return a;
};

/**
 * 
 * @param {*} _ui_ 
 * @returns 
 */
const ___window_manager = function (_ui_) {

  const family = _ui_.fig.family;
  const group = _ui_.fig.group;
  const modal = 'wrapper-modal';
  const a = Skeletons.Box.Y({
    sys_pn: "wm-container",
    className: `${family}__main desk-window-wrapper`,
    debug: __filename,
    kids: [
      Skeletons.Box.Y({
        sys_pn    : "top-bar",
        className : `${_ui_.fig.family}__topbar`,
        kids      : [require('./topbar')(_ui_)]
      }),
      _icons_list(_ui_),
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
