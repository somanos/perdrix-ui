
import { entry, menuInput, buttons } from "./widgets"
let LABELS = [
  "Etage",
  "Appartement",
  "Autres",
]
function field(ui, opt) {

}
/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function locationViewer(ui, opt) {
  let {
    city, postcode, countrycode, location = []
  } = opt;
  const pfx = `${ui.fig.family}`;

  let l1 = location.splice(0, 3);
  let l2 = ``;
  let kids = [];
  kids.push(
    Skeletons.Note({
      className: `${fig}-custname ${fig}-text`,
      content: l1.join(' ')
    })
  )
  let i = 0;
  if (location.join('').length) {
    for (let label of LABELS) {
      if (location[i]) {
        l2 = `${l2} ${label} ${location[i]}`
      }
      i++;
    }
  }
  if (l2) {
    kids.push(
      Skeletons.Note({
        className: `${fig}-custname ${fig}-text`,
        content: l2
      })
    )
  }
  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__location-main`,
    sys_pn: "location",
    kids: [
      Skeletons.Box.G({
        className: `${pfx}__location l1`,
        kids 
      }),
      Skeletons.Box.G({
        className: `${pfx}__location city`,
        kids: [
          Skeletons.Note({
            className: `${fig}-custname ${fig}-text`,
            content: postcode
          }),
          Skeletons.Note({
            className: `${fig}-custname ${fig}-text`,
            content: city
          }),
          Skeletons.Note({
            className: `${fig}-custname ${fig}-text`,
            content: countrycode
          }),
        ]
      }),
    ]
  })
};
