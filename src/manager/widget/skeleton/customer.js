import { entry, menuInput} from "./widgets"
/**
 * 
 * @param {*} ui 
 * @returns 
 */
function _entries(ui) {
  let type = ui.mget(_a.type);
  let kids = [];
  const pfx = ui.fig.family;
  switch (type) {
    case 'company':
      kids = [
        Skeletons.Box.G({
          className: `${pfx}__entries-${type}`,
          kids: [
            entry(ui, {
              placeholder: "Nom de la societe",
              name: 'companyname',
              sys_pn: "companyname"
            }),
            menuInput(ui, {
              items: Env.get('companyClass'),
              name: 'companyclass',
              placeholder: "Type de societe",
              refAttribute: 'label',
              value: "",
            }),
          ]
        }),
        entry(ui, {
          placeholder: "Adresse",
          name: _a.location,
          sys_pn: "address-entry"
        }),
      ]
      break;
    case 'person':
      kids = [
        Skeletons.Box.G({
          className: `${pfx}__entries-${type}`,
          kids: [
            menuInput(ui, {
              items: Env.get('genderList'),
              name: 'gender',
              placeholder: LOCALE.GENDER,
              refAttribute: 'longTag',
              value: "",
            }),
            entry(ui, {
              placeholder: "Nom",
              name: _a.lastname,
              sys_pn: _a.lastname,
            }),
            entry(ui, { placeholder: "Prenom", name: _a.firstname }),
          ]
        }),
        entry(ui, {
          placeholder: "Adresse",
          name: _a.location,
          sys_pn: "address-entry"
        }),
      ]
      break;
  }
  return Skeletons.Box.Y({
    className: `${pfx}__entries-content`,
    kids
  })
};

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function customerBox(ui) {
  return Skeletons.Box.X({
    debug: __filename,
    className: `${ui.fig.family}__entries-main`,
    kids: _entries(ui)
  })
};
