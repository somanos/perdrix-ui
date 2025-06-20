
const {
  customerHeader, headerBox, list
} = require("../../../skeleton")

module.exports = function (ui) {
  const pfx = ui.fig.family;
  let c = ui.mget('customer');
  let { addressId } = c;
  let customer;
  if (c) {
    customer = customerHeader(ui);
  }
  let pocsList;
  if (addressId) {
    let api = {
      service: PLUGINS.poc.list,
      args: {
        addressId
      }
    }
    let itemsOpt = {
      kind: 'poc_item',
      service: "select-poc",
      uiHandler: [ui]
    }
    pocsList = list(ui, _a.list, { api, itemsOpt })
  }
  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main ${ui.fig.group}__main`,
    kids: [
      headerBox(ui, { title: "Créer un contact client" }),
      customer,
      pocsList,
      Skeletons.Box.Y({
        className: `${pfx}__container ${ui.fig.group}__container`,
        kids: [require('./poc')(ui)]
      })
    ]
  });
};
