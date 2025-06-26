
const {
  list, customerHeader, actionButtons,
  headerBox, messageBock, descriptionEntry, menuInput
} = require("../../../skeleton")

module.exports = function (ui) {
  const pfx = ui.fig.family;
  let { site, customer } = ui.model.toJSON();
  let site_widget;
  if (site) {
    site_widget = {
      ...site,
      kind: 'location_view',
      state: 0,
      showMap: 0
    }
  }
  const body = Skeletons.Box.Y({
    className: `${pfx}__body`,
    sys_pn: _a.content,
    kids: [
      Skeletons.Wrapper.Y({
        className: `${pfx}__entries-manual`,
        sys_pn: "entries-manual",
        kids: [list(ui)],
        state: 0,
      }),
      Skeletons.Wrapper.Y({
        className: `${pfx}__site-address`,
        sys_pn: "site-address",
        state: site ? 1 : 0,
        kids: [site_widget]
      }),
      descriptionEntry(ui,
        {
          label: "Description du travail",
          ico: "desktop_desksettings",
          name: "description",
          innerClass: "mission",
          sys_pn: "description",
        },
        menuInput(ui, {
          items: Env.get('workType'),
          name: 'category',
          placeholder: 'Type de travail',
          refAttribute: 'label',
          value: "",
        }),
        // Skeletons.Note({
        //   className: `${pfx}__button-item poc`,
        //   content: 'Choisir un contact',
        //   uiHandler: [ui],
        //   service: "show-pocs",
        // }),
        // Skeletons.Note({
        //   className: `${pfx}__button-item poc`,
        //   content: 'Ajouter un contact',
        //   uiHandler: [ui],
        //   service: "add-poc",
        // })
      ),
      messageBock(ui),
    ]
  });

  if (!ui.mget('site')) {
    let args = {
      api: {
        service: "site.list",
        custId: ui.mget('custId'),
      },
      itemsOpt: {
        kind: 'site_item',
        service: 'set-site',
        uiHandler: [ui]
      },
      className: `${ui.fig.family}__pocs-list`,
    }
    body.kids.unshift(list(ui, "sites-list", args));
  }

  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main ${ui.fig.group}__main`,
    kids: [
      headerBox(ui, { title: "Créer une nouvelle mission" }),
      customerHeader(ui),
      Skeletons.Box.Y({
        className: `${pfx}__container ${ui.fig.group}__container`,
        kids: [
          body,
          actionButtons(ui, [
            { content: "Créer la mission", service: "create-mission", sys_pn: "button-work" },
          ])
        ]
      })
    ]
  });
};
