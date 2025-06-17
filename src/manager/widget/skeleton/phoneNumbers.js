
let LABELS = [
  "Bureau",
  "Domicile",
  "Portable",
  "Fax"
]
/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function phoneNumbers(ui, numbers = []) {
  const pfx = `${ui.fig.family}`;
  let uiHandler = [ui];
  let kids = [];

  let i = 0;
  for (let label of LABELS) {
    if (numbers[i]) {
      let href;
      if (ui.mget(_a.view) == _a.active) {
        href = `tel:${numbers[i]}`;
      }
      kids.push(
        Skeletons.Box.G({
          className: `${pfx}__phone-number`,
          kids: [
            Skeletons.Note({
              className: `${pfx}__text label`,
              content: label,
              position: i,
              uiHandler,
            }),
            Skeletons.Note({
              className: `${pfx}__text number`,
              content: numbers[i],
              href,
              position: i,
              uiHandler,
            })
          ]
        }),
      )
    }
    i++;
  }

  return Skeletons.Box.Y({
    className: `${pfx}__phones-container`,
    sys_pn: "phones",
    kids: Skeletons.Box.Y({
      className: `${pfx}__phones-main`,
      kids,
    })
  })
};
