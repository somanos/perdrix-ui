const {
  phoneNumbers, actionButtons, footerWrapper
} = require("../../skeleton")

/**
 * 
 * @param {*} ui 
 * @returns 
 */
function poc_item(ui) {
  let { gender, lastname, firstname, phones, email } = ui.model.toJSON();
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
  if(email){
    message.href = `mailto:${email}`
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
          phoneNumbers(ui, phones)
        ]
      }),
      // actionButtons(ui, [
      //   { content: "Ses chantiers", service:"show-sites" },
      //   { content: "Ajouter un chantiers", service:"add-site" },
      // ]),
      // footerWrapper(ui)
    ]
  })

}
module.exports = poc_item;
/*
| gender    | int(10) unsigned | YES  |     | NULL    |                |
| lastname  | varchar(200)     | YES  |     | NULL    |                |
| firstname | varchar(200)     | YES  |     | NULL    |                |
| email     | varchar(200)     | YES  |     | NULL    |                |
| phones    | longtext         | YES  |     | NULL    |                |
*/