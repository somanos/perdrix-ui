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
export function labelValue(ui, o1, o2) {
  let label;
  let value;
  let pfx = `${ui.fig.family}__fields`;

  if (_.isString(o1)) {
    label = Skeletons.Note({
      className: `${pfx} label`,
      content: o1,
    })
  } else {
    label = Skeletons.Note({
      className: `${pfx} label`,
      ...o1
    })
  }

  if (_.isString(o2)) {
    value = Skeletons.Note({
      className: `${pfx} value`,
      content: o2,
    })
  } else {
    value = Skeletons.Note({
      className: `${pfx} value`,
      ...o2
    })
  }
  return Skeletons.Box.G({
    className: `${pfx}-grid`,
    kids: [label, value]
  })
}
