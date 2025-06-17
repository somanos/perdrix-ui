
const {
  entry, person, menuInput, actionButtons
} = require("../../../skeleton")

module.exports = function (ui) {
  const pfx = ui.fig.family;

  return Skeletons.Box.Y({
    className: `${pfx}__body`,
    kids: [
      // Skeletons.Box.X({
      //   className: `${pfx}__main`,
      //   kids: Skeletons.Note({
      //     className: `${pfx}__text`,
      //     content: "Ajouter un contact client"
      //   })
      // }),
      Skeletons.Box.Y({
        className: `${pfx}__entries-container`,
        sys_pn: "entries",
        kids: [
          person(ui, 'poc'),
          Skeletons.Box.G({
            className: `${pfx}__entries-row2`,
            kids: [
              menuInput(ui, {
                items: Env.get('customerPocRoles'),
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
                ico: "company",
                value: ui.mget('office') || "",
              }),
              entry(ui, {
                placeholder: "Domicile",
                name: _a.home,
                sys_pn: _a.home,
                ico: "raw-ab_address",
                value: ui.mget(_a.home) || "",
              }),
              entry(ui, {
                placeholder: "Portable",
                name: _a.mobile,
                sys_pn: _a.mobile,
                ico: "account_mobile",
                value: ui.mget(_a.mobile) || "",
              }),
            ]
          }),
          actionButtons(ui, [
            { sys_pn: "btn-create", service: _a.create, content: "Créer" }
          ]),
        ]
      }),
    ]
  });
};
