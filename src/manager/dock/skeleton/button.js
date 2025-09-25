function _helpers(ui, content, name) {
  const pfx = `${ui.fig.family}__helper`
  const a = Skeletons.Box.X({
    debug: __filename,
    className: `${pfx}-container`,
    // service : `video-help`,
    name,
    haptic: 2000,
    kidsOpt: {
      active: 0
    },
    kids: [
      // Skeletons.Button.Svg({
      //   ico: 'desktop_videofile',
      //   className: `${pfx}-icon`,
      //   innerClass:'helper',
      // }),
      Skeletons.Note({
        className: `${pfx}-text`,
        content
      })
    ]
  });

  return a;
};

const dockButtom = function (ui, opt, label, extra) {
  const a = Skeletons.Box.X({
    debug: __filename,
    className: `${ui.fig.family}__action`,
    helper: _helpers(ui, label, opt.helperName),
    args: opt.args,
    kids: [Skeletons.Button.Svg({ innerClass: 'action', ...opt })]
  })
  if (extra) {
    a.kids.unshift(extra)
  }
  return a;
};

module.exports = dockButtom;
