
const {
  list, customerHeader, siteSelector, actionButtons,
  headerBox, messageBock, descriptionEntry
} = require("../../../skeleton")

module.exports = function (ui) {
  const pfx = ui.fig.family;
  let site = ui.mget('site');
  this.debug("AAA:10", site)
  let siteView;
  if(site){
    siteView = {
      ...site,
      type: 'site',
      kind: 'location_view',
      state: 1
    }
  }

  const body = Skeletons.Box.Y({
    className: `${pfx}__body`,
    sys_pn: _a.content,
    kids: [
      Skeletons.FileSelector({
        partHandler: ui,
      }),
      Skeletons.Wrapper.Y({
        className: `${pfx}__entries-manual`,
        sys_pn: "entries-manual",
        kids: [list(ui)],
        state: 0,
      }),
      Skeletons.Wrapper.Y({
        className: `${pfx}__site-address`,
        sys_pn: "site-address",
        kids:[
          siteView
        ]
      }),
      descriptionEntry(ui, {
        label: "Description",
        ico: "desktop_desksettings",
        name: "description",
        sys_pn: "description",
      }),
      messageBock(ui)
    ]
  });


  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main ${ui.fig.group}__main`,
    kids: [
      headerBox(ui, { title: "Créer une note" }),
      customerHeader(ui),
      Skeletons.Box.Y({
        className: `${pfx}__container ${ui.fig.group}__container`,
        kids: [
          body,
          actionButtons(ui, [
            { service: _a.create, content: "Créer la note", sys_pn:"go-btn" },
          ]),
        ]
      })
    ]
  });
};
