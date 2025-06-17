import { entry, company, person } from "./widgets"
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
        company(ui),
        // entry(ui, {
        //   placeholder: "Adresse",
        //   name: _a.location,
        //   sys_pn: "address-entry"
        // }),
      ]
      break;
    case 'person':
      kids = [
        person(ui),
        // entry(ui, {
        //   placeholder: "Adresse",
        //   name: _a.location,
        //   sys_pn: "address-entry"
        // }),
      ]
      break;
  }
  return Skeletons.Box.Y({
    className: `${pfx}__entries-content`,
    sys_pn: "entries-content",
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
