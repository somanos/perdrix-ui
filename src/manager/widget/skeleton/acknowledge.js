const { actionButtons } = require("./widgets")
export function acknowledge(ui, opt = {}) {
  let { message, failed = 0, service = _e.close, actionTitle = LOCALE.CLOSE } = opt;
  let dataset = { failed };
  let ico = 'available';
  if (failed) ico = 'cross'
  return Skeletons.Box.Y({
    className: `${ui.fig.family}__acknowledge-main`,
    debug: __filename,
    kids: [
      Skeletons.Box.X({
        className: `${ui.fig.family}__acknowledge-content`,
        kids: [
          Skeletons.Button.Svg({
            ico,
            className: 'icon',
            dataset
          }),

          Skeletons.Note({
            className: 'text',
            content: message,
            dataset
          }),
        ]
      }),
      actionButtons(ui, [{ content: actionTitle, service, dataset }])
    ]
  });
};
