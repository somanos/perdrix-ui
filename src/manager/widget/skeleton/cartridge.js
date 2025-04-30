/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
const { entry } = require('./widgets')
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
      sys_pn: input.name,
      ...input
    }),
  ]
  return Skeletons.Box.G({
    className: `${ui.fig.family}__cartridge-main`,
    debug: __filename,
    kids
  })
}

/**
 * 
 * @param {*} ui 
 * @param {*} label 
 * @param {*} value 
 * @returns 
 */
export function labelValue(ui, label, value) {
  return Skeletons.Box.G({
    kids: [
      Skeletons.Note({
        className: `label`,
        content: label,
      }),
      Skeletons.Note({
        className: `value`,
        content: value,
      }),
    ]
  })
}
