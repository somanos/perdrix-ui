function top_bar (_ui_) {
  const pfx = `${_ui_.fig.group}-topbar`;

  const a = Skeletons.Box.X({
    debug: __filename,
    className: `${pfx}__main`,
    active: 0,
    kids: [
      Skeletons.Box.X({
        active: 0,
        className: `${pfx}__left_wrapper ${pfx}-header-wrapper`,
        kids: [
          Skeletons.Image.Svg({
            className: `c-top-bar__logo c-top-bar__logo--white ${pfx}__logo_icon`,
            href: "#",
            width: 40,
            height: 40,
            padding: 0,
            sys_pn: 'logo-block',
          })
        ]
      }),
      Skeletons.Box.X({
        className: `${pfx}__center_wrapper ${pfx}-header-wrapper`,
        kids: [require('./search-box')(_ui_)]
      }),
      Skeletons.Box.X({
        className: `${pfx}__top_right_wrapper ${pfx}-header-wrapper`,
        kids: [
          Skeletons.Box.X({
            className: `${pfx}__top_right_holder`,
            kids: [require('./topbar-user')(_ui_)]
          })
        ]
      })
    ]
  });
  return a;
};

module.exports = top_bar;
