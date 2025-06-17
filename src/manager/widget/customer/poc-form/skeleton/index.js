
const {
  customerHeader, headerBox,
} = require("../../../skeleton")

module.exports = function (ui) {
  const pfx = ui.fig.family;
  let c = ui.mget('customer');
  let customer;
  if (c) {
    customer = customerHeader(ui);
  }
  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main ${ui.fig.group}__main`,
    kids: [
      headerBox(ui, { title: "Créer un contact client" }),
      customer,
      Skeletons.Box.Y({
        className: `${pfx}__container ${ui.fig.group}__container`,
        kids: [require('./poc')(ui)]
      })
    ]
  });
};
