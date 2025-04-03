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
    className: `${ui.fig.family}__icon-header ${ui.mget(_a.type)}`,
    ico,
  })
  let origin = ui.mget(_a.origin) || "";
  return Skeletons.Box.Y({
    className: `${ui.fig.family}__cartridge-header`,
    debug: __filename,
    kids: [
      Skeletons.Box.X({
        className: `${ui.fig.family}__text type ${origin}`,
        kids:[
          icon,
          Skeletons.Note({
            className: `${ui.fig.family}__text type ${origin}`,
            content
          }),    
        ]
      }),
      Skeletons.Note({
        className: `${ui.fig.family}__text id`,
        content: ui.mget('custId')
      }),
    ]
  })
}
module.exports = header;