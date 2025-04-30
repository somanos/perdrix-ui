const { contextBar } = require("../../../widget/skeleton")

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function tab(ui) {
  let buttons = [
    Skeletons.Button.Label({
      className: `${ui.fig.family}__button-action add`,
      label: "Nouvelle note",
      ico: "editbox_list-plus",
      icons: null,
      service: "create-note"
    }),
    Skeletons.Button.Label({
      className: `${ui.fig.family}__button-action add`,
      label: "Nouveau devis",
      ico: "editbox_list-plus",
      icons: null,
      service: "create-quote"
    }),
    Skeletons.Button.Label({
      className: `${ui.fig.family}__button-action add`,
      label: "Nouvelle facture",
      ico: "editbox_list-plus",
      icons: null,
      service: "create-bill"
    }),
  ]
  return contextBar(ui, buttons)
};
