/**
 * 
 * @param {*} ui 
 * @returns 
 */

function customerOverview(ui, label, text) {
  let { custName, gender, city, location, stype } = ui.mget(_a.content);
  const adresse = location.join(' ');
  let fig = ui.fig.name;
  let soc = null;
  if (gender) {
    custName = `${gender} ${custName}`;
  }
  if(stype){
    soc = Skeletons.Note({
      className: `${fig}-city ${fig}-text`,
      content: `(${stype})`
    })
  }

  let kids = [
    Skeletons.Note({
      className: `${fig}-nom ${fig}-text`,
      content: custName,
    }),
    soc,
    Skeletons.Note({
      className: `${fig}-city ${fig}-text`,
      content: city,
    }),
    Skeletons.Note({
      className: `${fig}-adresse ${fig}-text`,
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