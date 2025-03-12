/**
 * 
 * @param {*} ui 
 * @returns 
 */

function cartridge(ui, opt) {
  let type = ui.mget(_a.type);
  let { label, adresse, service, extraClass, itemId, city } = opt;
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
  if (adresse) {
    kids.push(Skeletons.Note({
      className: `${ui.fig.family}__text ${extraClass}`,
      content: adresse,
      service,
      itemId,
      type
    }))
  }
  if (city) {
    kids.push(Skeletons.Note({
      className: `${ui.fig.family}__text ${extraClass}`,
      content: city,
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