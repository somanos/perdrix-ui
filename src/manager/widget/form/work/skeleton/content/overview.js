/**
 * 
 * @param {*} ui 
 * @returns 
 */

function customerOverview(ui) {
  let {
    custName,
    companyclass,
    gender,
    location,
    city,
  } = ui.model.toJSON();

  const adresse = location.join(' ');
  let fig = ui.fig.name;
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
      content: adresse,
    })
  ]
  let a = Skeletons.Box.X({
    className: `${ui.fig.family}__overview`,
    debug: __filename,
    kids
  })
  return a;
}
module.exports = customerOverview;