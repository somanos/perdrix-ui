const { normalizelLocation } = require("../../utils")

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function customerHeader(ui, customer) {
  let source = customer || ui;
  let {
    custName,
    companyclass,
    gender,
    location,
    city,
  } = ui.mget('customer') || source.model.toJSON();
  console.log("AAA:17", ui.mget('customer'), customer, ui)

  let fig = 'customer'
  let company = null;
  if (gender) {
    custName = `${gender} ${custName}`;
  }
  if (companyclass) {
    company = Skeletons.Note({
      className: `${fig}-city ${fig}-text`,
      content: `(${companyclass})`
    })
  }

  let kids = [
    Skeletons.Note({
      className: `${fig}-custname ${fig}-text`,
      content: custName,
    }),
    company,
    Skeletons.Note({
      className: `${fig}-city ${fig}-text`,
      content: city,
    }),
    Skeletons.Note({
      className: `${fig}-adress ${fig}-text`,
      content: normalizelLocation(location),
    })
  ]
  let a = Skeletons.Box.X({
    className: `${ui.fig.family}__customer-header`,
    debug: __filename,
    kids
  })
  return a;
}
