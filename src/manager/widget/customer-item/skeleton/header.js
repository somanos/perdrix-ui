/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function header(ui, ico, content) {
  let icon = Skeletons.Button.Svg({
    className: `${ui.fig.family}__icon-header ${ui.mget('ctype')}`,
    ico,
  })
  let origin = ui.mget(_a.origin) || "";
  return Skeletons.Box.X({
    className: `${ui.fig.family}__cartridge-header`,
    debug: __filename,
    kids: [
      icon,
      Skeletons.Note({
        className: `${ui.fig.family}__text type ${origin}`,
        content
      }),
    ]
  })

}
module.exports = header;