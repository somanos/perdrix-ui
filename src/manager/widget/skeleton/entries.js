const { getLocationFields } = require('../../utils')
import { entry, menuInput, buttons } from "./widgets"

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function address(ui, opt) {
  let {
    street, city, housenumber,
    postcode, additional, countrycode,
    serviceLabel, service, location
  } = opt;
  const pfx = `${ui.fig.family}`;

  if (_.isString(location) || !location) {
    location = []
    if (housenumber) {
      location.push(housenumber)
    } else {
      location.push("")
    }

    let l = street.split(' ');
    if (l[0]) {
      location.push(l[0].toLocaleLowerCase())
      l.shift()
    }
    if (l[0]) {
      location.push(l.join(' '))
    }
  }
  let o = getLocationFields(location)
  let { streettype, streetname } = o
  housenumber = housenumber || o.housenumber;
  additional = additional || o.additional;
  let streetType = menuInput(ui, {
    items: Env.get('streetType'),
    name: 'streettype',
    placeholder: "Type de voie",
    refAttribute: 'longTag',
    value: streettype.toLocaleLowerCase(),
  })

  let country = menuInput(ui, {
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
          entry(ui, { placeholder: "Nom de voie", name: 'streetname', value: streetname }),
        ]
      }),
      Skeletons.Box.G({
        className: `${pfx}__address additional`,
        kids: [
          Skeletons.Element(),
          entry(ui, { placeholder: "Complément", value: additional, name: 'additional' }),
        ]
      }),
      //floor,
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
      serviceLabel ? buttons(ui, { label: serviceLabel, service }) : null
    ]
  })
};
