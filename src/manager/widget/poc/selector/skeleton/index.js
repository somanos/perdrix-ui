
const {
  customerHeader, headerBox,
} = require("../../../skeleton")

module.exports = function (ui) {
  const pfx = ui.fig.family;
  let c = ui.mget('customer');
  const { location, city, postcode } = c || {};
  let customer;
  if (c) {
    customer = customerHeader(ui);
  }
  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main ${ui.fig.group}__main`,
    kids: [
      headerBox(ui, { title: "Liste des contacts clients disponible" }),
      customer,
      Skeletons.Wrapper.Y({
        className: `${pfx}__entries-manual`,
        sys_pn: "entries-manual",
      }),
      Skeletons.Box.Y({
        className: `${pfx}__container ${ui.fig.group}__container`,
        kids: [
          Skeletons.List.Smart({
            className: `${ui.fig.family}__pocs content`,
            sys_pn: 'pocs-list',
            partHandler: [ui],
            api: {
              service: PLUGINS.customer.get_pocs_by_addr,
              location,
              postcode,
              city
            },
            itemsOpt: {
              kind: 'poc_item',
              service: 'poc-selected',
              uiHandler: [ui],
            },
            vendorOpt: Preset.List.Orange_e,
          })
        ]
      })
    ]
  });
};
