
import { entry, menuInput, buttons } from "./widgets"

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function address(ui, opt) {
  let {
    street, city, housenumber, postcode, countrycode, extended
  } = opt;
  const pfx = `${ui.fig.family}`;
  let type = "";
  let loc = [];
  if (street) {
    loc = street.split(/ +/);
    type = loc[0];
  }
  let { length } = Env.get('streetType').filter(function (p) {
    let r = new RegExp(`^${p.longTag}$`, 'i');
    return (r.test(type))
  })
  if (length) {
    loc.shift()
    street = loc.join(' ');
  }
  let streetType = menuInput(ui, {
    items: Env.get('streetType'),
    name: 'streettype',
    placeholder: "Type de voie",
    refAttribute: 'longTag',
    value: type,
  })

  let country = menuInput(ui, {
    items: Env.get('countryCode'),
    name: 'countrycode',
    refAttribute: 'countrycode',
    placeholder: "Pays",
    value: countrycode || 'France',
  })

  let floor;
  if (extended) {
    floor = Skeletons.Box.G({
      className: `${pfx}__address street`,
      kids: [
        entry(ui, { placeholder: "Etage", name: "floor" }),
        entry(ui, { placeholder: "Appartement", name: 'room' }),
        entry(ui, { placeholder: "Autre", name: 'other' }),
      ]
    })
  }
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
      floor,
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
