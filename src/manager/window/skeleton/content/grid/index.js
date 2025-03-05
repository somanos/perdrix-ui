
const __media_skl_grid = function (_ui_) {
  const type = _ui_.mget(_a.type);

  const opt = {
    kind: _a.media,
    type,
    logicalParent: _ui_,
    role: _ui_.mget(_a.role) || '',
    uiHandler: null
  };

  if (_ui_.mget(_a.itemsOpt)) {
    _.merge(opt, _ui_.mget(_a.itemsOpt));
  }

  const list = Skeletons.List.Smart({
    className: `${_ui_.fig.group}__icons-list`,
    innerClass: `${_ui_.fig.group}__icons-scroll`,
    sys_pn: _a.list,
    flow: _a.none,
    dataset: {
      role: _a.container,
    },
    spinnerWait: 1500,
    spinner: true,
    itemsOpt: opt,
    vendorOpt: Preset.List.Orange_e,
    api: _ui_.getCurrentApi,
    placeholder: _ui_.getPlaceholder
  });

  const a = Skeletons.Box.Y({
    debug: __filename,
    flow: _a.y,
    className: `${_ui_.fig.group}__icons-container`,
    kids: [
      list
    ]
  });

  return a;
};

module.exports = __media_skl_grid;
