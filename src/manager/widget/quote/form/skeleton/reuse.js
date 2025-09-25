
const {
  list, cartridge, actionButtons, entry,
  headerBox, messageBock, descriptionEntry, quoteForm
} = require("../../../skeleton")
const { normalizelLocation } = require('../../../../utils')
module.exports = function (ui) {
  const pfx = ui.fig.family;
  let { site, description, customer } = ui.model.toJSON()
  let service = _a.create;
  let content = "Créer le devis";
  let title = "Créer un devis";
  let address = "";
  if (site?.location) {
    address = normalizelLocation(site.location)
  }
  if (site.city) address = `${address} ${site.city}`
  let custName = customer?.custName || "";
  const body = Skeletons.Box.Y({
    className: `${pfx}__body`,
    sys_pn: _a.content,
    kids: [
      Skeletons.FileSelector({
        partHandler: ui,
      }),
      Skeletons.Box.Y({
        className: `${pfx}__site-address`,
        kidsOpt: {
          className: `${pfx}__cartridge-main recipient`,
        },
        kids: [
          cartridge(ui,
            { content: "Nom du client" },
            { value: custName, name: "custName", interactive: 1, uiHandler: [ui], service: "search-customer", sys_pn: "custName", placeholder: "" },
            Skeletons.Button.Svg({
              className: `${pfx}__searchbox icon`,
              ico: "unavailable",
              service: "reset-customer"
            })
          ),
          cartridge(ui,
            { content: "Adresse du chantier" },
            { value: address, name: "address", interactive: 1, uiHandler: [ui], service: "search-address", sys_pn: "address", placeholder: "" },
            Skeletons.Button.Svg({
              className: `${pfx}__searchbox icon`,
              ico: "unavailable",
              service: "reset-address"
            })
          ),
        ]
      }),
      Skeletons.Wrapper.Y({
        className: `${pfx}__address-form`,
        sys_pn: "address-form",
      }),
      Skeletons.Wrapper.Y({
        className: `${pfx}__entries-manual`,
        sys_pn: "entries-manual",
        kids: [list(ui)],
        state: 0,
      }),
      Skeletons.Box.G({
        className: `${pfx}__description-container`,
        kids: [
          descriptionEntry(ui, {
            label: "Description",
            ico: "desktop_desksettings",
            name: "description",
            sys_pn: "description",
            value: description
          }),
          quoteForm(ui),
        ]
      }),
      messageBock(ui)
    ]
  });

  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main ${ui.fig.group}__main`,
    kids: [
      headerBox(ui, { title }),
      Skeletons.Box.Y({
        className: `${pfx}__container ${ui.fig.group}__container`,
        kids: [
          body,
          actionButtons(ui, [
            { sys_pn: "btn-create", service, content }
          ]),
        ]
      })
    ]
  });
};
