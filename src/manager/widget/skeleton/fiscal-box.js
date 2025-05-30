const { labelValue, selectionMenu } = require("./")

/**
 * 
 * @param {*} ui 
 * @param {*} buttons 
 * @returns 
 */
export function fiscalBox(ui, buttons) {
  let menuOpt = {
    label: "Année fiscale",
    simpleItem: 1,
    service: "fiscal-year",
    persistence: _a.once,
    buttons
  };
  return [
    Skeletons.Box.Y({
      kids: [
        Skeletons.Note({
          className: `${ui.fig.family}__current-fyear`,
          sys_pn: "current-fyear",
          content: "Toutes les années"
        }),
        selectionMenu(ui, menuOpt),
      ]
    }),
    Skeletons.Box.G({
      className: `${ui.fig.family}__total`,
      kids: [
        labelValue(ui, { content: "Total HT" }, { sys_pn: "amount_ht" }),
        labelValue(ui, { content: "Total TTC" }, { sys_pn: "amount_ttc" }),
      ]
    }),
  ]
};
