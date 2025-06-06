
const {
  entry, customerHeader, headerBox, messageBock, footerWrapper, address
} = require("../../../skeleton")

module.exports = function (ui) {
  const pfx = ui.fig.family;
  const {
    street, city, housenumber, postcode, label, location
  } = ui.mget('customer') || ui.model.toJSON()
  let site;
  let state = 0;
  if (location && postcode) {
    site = address(ui, {
      street, city, housenumber, postcode, label, location
    })
    state = 1;
  }
  const body = Skeletons.Box.Y({
    className: `${pfx}__body`,
    sys_pn: _a.content,
    kids: [
      Skeletons.Box.Y({
        className: `${pfx}__entries-container`,
        sys_pn: "entries",
        kids: [
          entry(ui, {
            placeholder: "Adresse du chantier",
            name: _a.location,
            sys_pn: "address-entry"
          }),
        ]
      }),
      Skeletons.Wrapper.Y({
        className: `${pfx}__entries-manual`,
        sys_pn: "entries-manual",
        state,
        kids: site
      }),
      messageBock(ui),
    ]
  });


  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main ${ui.fig.group}__main`,
    kids: [
      headerBox(ui, { title: "Creer un chantier" }),
      customerHeader(ui),
      Skeletons.Box.Y({
        className: `${pfx}__container ${ui.fig.group}__container`,
        kids: [
          body,
          footerWrapper(ui),
        ]
      })
    ]
  });
};
