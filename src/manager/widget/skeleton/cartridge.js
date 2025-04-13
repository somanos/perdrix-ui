/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
const {entry} = require('./entries')
/**
 * 
 * @param {*} ui 
 * @returns 
 */

 export function cartridge(ui, note, input) {
  let kids = [
    Skeletons.Note({
      className: `${ui.fig.family}__label`,
      ...note
    }),
    entry(ui, {
      className: `${ui.fig.family}__entry}`,

      ...input
    }),
  ]
  return Skeletons.Box.G({
    className: `${ui.fig.family}__cartridge`,
    debug: __filename,
    kids
  })
}
