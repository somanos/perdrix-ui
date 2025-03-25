
import {entry} from "./widgets"

// /**
//  * 
//  * @param {*} ui 
//  * @returns 
//  */
// function _entries(ui) {
//   let type = ui.mget(_a.type);
//   let kids = [];
//   const pfx = ui.fig.family;
//   switch (type) {
//     case 'company':
//       kids = [
//         Skeletons.Box.G({
//           className: `${pfx}__entries-${type}`,
//           kids: [
//             entry(ui, {
//               placeholder: "Nom de la societe",
//               name: 'companyname',
//               sys_pn: "companyname"
//             }),
//             menu_input(ui, {
//               items: Env.get('companyClass'),
//               name: 'companyclass',
//               placeholder: "Type de societe",
//               refAttribute: 'label',
//               value: "",
//             }),
//           ]
//         }),
//         entry(ui, {
//           placeholder: "Adresse",
//           name: _a.location,
//           sys_pn: "address-entry"
//         }),
//       ]
//       break;
//     case 'person':
//       kids = [
//         Skeletons.Box.G({
//           className: `${pfx}__entries-${type}`,
//           kids: [
//             menu_input(ui, {
//               items: Env.get('genderList'),
//               name: 'gender',
//               placeholder: LOCALE.GENDER,
//               refAttribute: 'longTag',
//               value: "",
//             }),
//             entry(ui, {
//               placeholder: "Nom",
//               name: _a.lastname,
//               sys_pn: _a.lastname,
//             }),
//             entry(ui, { placeholder: "Prenom", name: _a.firstname }),
//           ]
//         }),
//         entry(ui, {
//           placeholder: "Adresse",
//           name: _a.location,
//           sys_pn: "address-entry"
//         }),
//       ]
//       break;
//   }
//   return Skeletons.Box.Y({
//     className: `${pfx}__entries-content`,
//     kids
//   })
// };

// /**
//  * 
//  * @param {*} ui 
//  * @returns 
//  */
// export function entries(ui) {
//   return Skeletons.Box.X({
//     debug: __filename,
//     className: `${ui.fig.family}__entries-main`,
//     kids: _entries(ui)
//   })
// };


/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function address(ui, opt) {
  const { street, city, housenumber, postcode, countrycode } = opt;
  const pfx = `${ui.fig.family}`;
  let type = "";
  if (street) type = street.split(/ +/)[0];

  let streetType = menu_input(ui, {
    items: Env.get('streetType'),
    name: 'streettype',
    placeholder: "Type de voie",
    refAttribute: 'longTag',
    value: type,
  })

  let country = menu_input(ui, {
    items: Env.get('countryCode'),
    name: 'countrycode',
    refAttribute: 'countrycode',
    placeholder: "Pays",
    value: countrycode || 'France',
  })

  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__entries-main`,
    sys_pn: "address",
    kids: [
      Skeletons.Box.G({
        className: `${pfx}__address street`,
        kids: [
          entry(ui, { placeholder: "Numero", name: "housenumber", value: housenumber }),
          streetType,
          entry(ui, { placeholder: "Nom de voie", name: 'streetname', value: street }),
        ]
      }),
      Skeletons.Box.G({
        className: `${pfx}__address additional`,
        kids: [
          Skeletons.Element(),
          entry(ui, { placeholder: "Complenent!", name: 'additional' }),
        ]
      }),
      Skeletons.Box.G({
        className: `${pfx}__address city`,
        kids: [
          entry(ui, {
            placeholder: "Code postal",
            name: 'postcode',
            value: postcode,
            sys_pn: "postcode",
          }),
          entry(ui, {
            placeholder: "Localite",
            name: 'city',
            sys_pn: "city",
            value: city
          }),
          country
        ]
      }),
      buttons(ui)
    ]
  })

};
