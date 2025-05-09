
const {
  footerWrapper, entry, person,
  customerHeader, headerBox,
  messageBock, actionButtons,
  menuInput
} = require("../../../skeleton")

module.exports = function (ui) {
  const pfx = ui.fig.family;
  let site = ui.mget('site');
  let siteView;
  if (site) {
    siteView = {
      ...site,
      type: 'site',
      kind: 'location_view',
      state: 0
    }
  }

  const body = Skeletons.Box.Y({
    className: `${pfx}__body`,
    sys_pn: _a.content,
    kids: [
      Skeletons.Box.Y({
        className: `${pfx}__entries-container`,
        sys_pn: "entries",
        kids: [
          site,
          person(ui, 'poc'),
          Skeletons.Box.G({
            className: `${pfx}__entries-row2`,
            kids: [
              menuInput(ui, {
                items: Env.get('pocRoles'),
                name: 'role',
                placeholder: 'Role',
                refAttribute: _a.role,
                sys_pn: _a.role,
                value: ui.mget(_a.role) || "",
              }),
              entry(ui, {
                placeholder: "Email",
                name: _a.email,
                sys_pn: _a.email,
                value: ui.mget(_a.email) || "",
              })]
          }),
          Skeletons.Box.G({
            className: `${pfx}__entries-row3`,
            kids: [
              entry(ui, {
                placeholder: "Bureau",
                name: "office",
                sys_pn: "office",
                value: ui.mget('office') || "",
              }),
              entry(ui, {
                placeholder: "Domicile",
                name: _a.home,
                sys_pn: _a.home,
                value: ui.mget(_a.home) || "",
              }),
              entry(ui, {
                placeholder: "Portable",
                name: _a.mobile,
                sys_pn: _a.mobile,
                value: ui.mget(_a.mobile) || "",
              }),
              entry(ui, {
                placeholder: "Fax",
                name: "fax",
                sys_pn: "fax",
                value: ui.mget("fax") || "",
              }),
            ]
          })
        ]
      }),
      messageBock(ui),
    ]
  });

  let label = LOCALE.CREATE;
  if (ui.mget('pocId')) {
    label = LOCALE.UPDATE;
  }
  let customer;
  if(ui.mget('customer')){
    customer = customerHeader(ui);
  }
  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main ${ui.fig.group}__main`,
    kids: [
      headerBox(ui, { title: "Ajouter contact chantier" }),
      customer,
      Skeletons.Box.Y({
        className: `${pfx}__container ${ui.fig.group}__container`,
        kids: [
          body,
          footerWrapper(ui),
          actionButtons(ui, [{ service: _a.create, content: label }]),
        ]
      })
    ]
  });
};
