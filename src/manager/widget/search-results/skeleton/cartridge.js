/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function cartridge(ui, label, text) {
  return Skeletons.Box.X({
    className: `${ui.fig.family}__cartridge`,
    debug: __filename,
    kids: [
      Skeletons.Note({
        className: `${ui.fig.family}__label`,
        content: label
      }),
      Skeletons.Note({
        className: `${ui.fig.family}__text`,
        content: text
      }),
    ]
  })

}
module.exports = cartridge;