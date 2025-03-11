/**
 * 
 * @param {*} ui 
 * @returns 
 */

function cartridge(ui, opt) {
  let type = ui.mget(_a.type);
  let { label, text, service, extraClass, itemId} = opt;
  extraClass = extraClass || "";
  let kids = [];
  if (label) {
    kids.push(Skeletons.Note({
      className: `${ui.fig.family}__label  ${extraClass}`,
      content: label,
      service,
      itemId,
      type
    }))
  }
  if (text) {
    kids.push(Skeletons.Note({
      className: `${ui.fig.family}__text ${extraClass}`,
      content: text,
      service,
      itemId,
      type
    }))
  }

  return Skeletons.Box.X({
    className: `${ui.fig.family}__cartridge`,
    debug: __filename,
    kids
  })
}
module.exports = cartridge;