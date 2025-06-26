const {
  phoneNumbers
} = require("../../../skeleton")

/**
 * 
 * @param {*} ui 
 * @returns 
 */
function poc_item(ui) {
  let { gender, lastname, firstname, phones, email, mode } = ui.model.toJSON();
  let name = "";
  let pfx = ui.fig.family;

  for (let n of [gender, lastname, firstname]) {
    if (n) {
      name = `${name} ${n}`
    }
  }
  let message = Skeletons.Note({
    className: `${pfx}__text email`,
    content: email
  })
  let editable = 0;
  if (email && ui.mget(_a.view) == _a.active) {
    message.href = `mailto:${email}`;
    editable = 1;
  }
  let ico = 'desktop_edit';
  let service = _a.change;
  switch (mode) {
    case 'removable':
      ico = 'drumee-trash';
      service = _e.remove;
      editable = 1;
      break;
    case 'editable':
      ico = 'editbox_pencil';
      service = _e.edit;
      editable = 1;
      break;
  }
  if (mode == 'removable') {
  }
  return Skeletons.Box.Y({
    className: `${pfx}__main`,
    debug: __filename,
    uiHandler: [ui],
    kids: [
      Skeletons.Box.G({
        className: `${pfx}__content`,
        kids: [
          Skeletons.Note({
            className: `${pfx}__text`,
            content: name
          }),
          message,
          phoneNumbers(ui, phones),
          Skeletons.Button.Svg({
            className: `${pfx}__icon`,
            ico,
            service,
            dataset: { editable }
          })
        ]
      }),
    ]
  })

}
module.exports = poc_item;
