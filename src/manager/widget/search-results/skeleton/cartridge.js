/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function cartridge(ui, label, text, itemId) {
  let details = '';
  if (itemId) details = 'see-details';
  let ctype = ui.mget('ctype');
  let service = 'see-details';
  let kids = [
    Skeletons.Note({
      className: `${ui.fig.family}__label ${details}`,
      content: label,
      service,
      itemId,
      ctype
    }),
    Skeletons.Note({
      className: `${ui.fig.family}__text ${details}`,
      content: text,
      service,
      itemId,
      ctype
    })
  ]
  let a = Skeletons.Box.G({
    className: `${ui.fig.family}__cartridge`,
    debug: __filename,
    kids
  })
  return a;
}
module.exports = cartridge;