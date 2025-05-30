/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
const { entry } = require('./widgets')
/**
 * 
 * @param {*} ui 
 * @returns 
 */

export function cartridge(ui, note, input) {
  let kids = [
    Skeletons.Note({
      className: `${ui.fig.family}__label inactive`,
      active: 0,
      ...note
    }),
    entry(ui, {
      className: `${ui.fig.family}__entry}`,
      sys_pn: input.name,
      ...input
    }),
  ]
  return Skeletons.Box.G({
    className: `${ui.fig.family}__cartridge-main`,
    debug: __filename,
    kids
  })
}

/**
 * 
 * @param {*} ui 
 * @param {*} label 
 * @param {*} value 
 * @returns 
 */
export function labelValue(ui, o1, o2) {
  let label;
  let value;
  let pfx = `${ui.fig.family}__fields`;

  if (_.isString(o1)) {
    label = Skeletons.Note({
      className: `${pfx} label`,
      content: o1,
    })
  } else {
    label = Skeletons.Note({
      className: `${pfx} label`,
      ...o1
    })
  }

  if (_.isString(o2)) {
    value = Skeletons.Note({
      className: `${pfx} value`,
      content: o2,
    })
  } else {
    value = Skeletons.Note({
      className: `${pfx} value`,
      ...o2
    })
  }
  return Skeletons.Box.G({
    className: `${pfx}-grid`,
    kids: [label, value]
  })
}

/**
 * 
 * @param {*} ui 
 * @param {*} label 
 * @param {*} value 
 * @returns 
 */
export function entryValue(ui, o1, o2) {
  let label;
  let value;
  let pfx = `${ui.fig.family}__fields`;

  if (_.isString(o1)) {
    label = Skeletons.Note({
      className: `${pfx} label`,
      content: o1,
    })
  } else {
    label = Skeletons.Note({
      className: `${pfx} label`,
      ...o1
    })
  }

  if (_.isString(o2)) {
    value = Skeletons.Entry({
      className: `${pfx} value`,
      value: o2,
    })
  } else {
    value = Skeletons.Entry({
      className: `${pfx} value`,
      ...o2
    })
  }
  return Skeletons.Box.G({
    className: `${pfx}-grid`,
    kids: [label, value]
  })
}

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function contextButtons(ui) {
  return [
    Skeletons.Button.Svg({
      className: `icon`,
      ico: `drumee-trash`,
      service: _a.remove,
      dataset: {
        admin: Visitor.isPdxAdmin()
      },
      tooltips: LOCALE.DELETE
    }),
    Skeletons.Button.Svg({
      className: `icon`,
      ico: `account_check`,
      service: _a.save,
      tooltips: LOCALE.SAVE_CHANGES
    }),
  ]
}

export function quoteForm(ui) {
  const pfx = ui.fig.family;
  let {
    ht, ttc, tva, discount, filepath
  } = ui.model.toJSON() || {};


  return Skeletons.Box.Y({
    className: `${pfx}__cartridge-container`,
    kids: [
      cartridge(ui, {
        content: "Montant HT",
      }, {
        name: 'ht',
        value: ht || 0,
        currency: "€",
        placeholder: 0
      }),
      cartridge(ui, {
        content: "Taux TVA",
      }, {
        placeholder: 0,
        value: tva || 20,
        currency: "%",
        name: 'tva',
      }),
      cartridge(ui, {
        content: "Remise",
      }, {
        name: 'discount',
        placeholder: 0,
        currency: "€",
        value: discount || 0
      }),
      cartridge(ui, {
        content: "Montant TTC",
      }, {
        placeholder: 0,
        name: 'ttc',
        currency: "€",
        value: ttc || 0
      }),
    ]
  })

}