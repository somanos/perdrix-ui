
const {
  actionButtons
} = require("../../../skeleton")
const { getLocationText } = require('./../../../../utils')
module.exports = function (ui, src, dest) {
  const pfx = `${ui.fig.family}-confirm`;

  return Skeletons.Box.Y({
    className: `${pfx}__main`,
    sys_pn: _a.content,
    kids: [
      Skeletons.Element({
        className: `${pfx}__text merge`,
        content: `Il existe déjà une entrée avec l'adresse saisie. Voulez-vous les fusionner?`,
      }),
      Skeletons.Box.G({
        className: `${pfx}__table`,
        kids: [
          Skeletons.Box.Y({
            className: `${pfx}__column src`,
            kids: [
              Skeletons.Element({
                className: `${pfx}__text src`,
                content: `${getLocationText(src)}`,
              }),
              Skeletons.Element({
                className: `${pfx}__text src`,
                content: src.postcode,
              }),
              Skeletons.Element({
                className: `${pfx}__text src`,
                content: src.city,
              }),
            ]
          }),
          Skeletons.Button.Svg({
            className: `${pfx}__icon`,
            ico: "arrow-right",
          }),
          Skeletons.Box.Y({
            className: `${pfx}__column dest`,
            kids: [
              Skeletons.Element({
                className: `${pfx}__text dest`,
                content: `${getLocationText(dest)}`,
              }),
              Skeletons.Element({
                className: `${pfx}__text dest`,
                content: dest.postcode,
              }),
              Skeletons.Element({
                className: `${pfx}__text dest`,
                content: dest.city,
              }),
            ]
          }),
        ]
      }),
      actionButtons(ui, [
        { service: _e.cancel, content: LOCALE.CANCEL },
        { service: "merge", content: LOCALE.YES },
      ])
    ]
  });

};
