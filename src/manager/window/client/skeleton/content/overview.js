/**
 * 
 * @param {*} ui 
 * @returns 
 */

function clientOverview(ui, label, text) {
  const { civilite, localite, nom, numVoie, typeVoie, nomVoie, stype } = ui.mget(_a.content);
  const adresse = [numVoie, typeVoie, nomVoie].join(' ');
  let fig = ui.fig.name;
  let nomClient = nom;
  let soc = null;
  if (civilite) {
    nomClient = `${civilite} ${nom}`;
  }
  if(stype){
    soc = Skeletons.Note({
      className: `${fig}-localite ${fig}-text`,
      content: `(${stype})`
    })
  }

  let kids = [
    Skeletons.Note({
      className: `${fig}-nom ${fig}-text`,
      content: nomClient,
    }),
    soc,
    Skeletons.Note({
      className: `${fig}-localite ${fig}-text`,
      content: localite,
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
module.exports = clientOverview;