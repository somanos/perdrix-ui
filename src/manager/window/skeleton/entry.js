module.exports = function(_ui_, name, opt = {}) {
  const formFig = `${_ui_.fig.family}-form`;

  const fieldName = name.toLowerCase();

  const icon = Skeletons.Button.Svg({
    ico: 'desktop_settings',
    className: `${formFig}__icon input-icon-prefix ${fieldName}`
  });

  const a = Skeletons.Box.X({
    className: `${formFig}__row-wrapper input-wrapper ${fieldName}`,
    sys_pn: `entry-container-${fieldName}`,
    kids: [
      Skeletons.EntryBox({
        className: `${formFig}__entry with-icon domain-setup`,
        sys_pn: `entry-${fieldName}`,
        formItem: fieldName,
        name: fieldName,
        prefix: icon,
        placeholder: LOCALE[name] || name,
        uiHandler: _ui_,
        errorHandler: [_ui_],
        showError: true,
        ...opt
      }),
    ]
  })
  let tips = LOCALE[name + '_TIPS'];
  if (tips) {
    a.kids.push(Skeletons.Button.Svg({
      ico: 'info',
      className: `${formFig}__icon info-icon`,
      tooltips: {
        content: tips,
      }
    }))
  }
  return a;
}
