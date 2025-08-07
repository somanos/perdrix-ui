/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
const { fromUnixtime, normalizelLocation } = require("../../../../utils")
const {
  menuInput
} = require("../../../../widget/skeleton");
/**
 * 
 * @param {*} ui 
 * @returns 
 */

function mission_item(ui) {
  let { type, workType, ctime, description, site, id, customer } = ui.model.toJSON()
  let { city, location } = site;
  let pfx = ui.fig.family;
  if (!id) {
    return Skeletons.Note({
      className: `${pfx}__description`,
      content: "Travail indéterminé"
    })
  }
  let { bill, quote, note } = ui.model.toJSON();
  let attachments;
  let attached = '0';
  if (bill || quote || note) {
    attached = '1';
    attachments = Skeletons.Box.Y({
      className: `${pfx}__content attachments`,
      kidsOpt: {
        className: `${pfx}__summary-count-item`,
      },
      kids: [
        Skeletons.Button.Label({
          ico: 'editbox_pencil',
          label: `${note} notes`,
          service: "view-notes"
        }),
        Skeletons.Button.Label({
          ico: 'account_documents',
          label: `${quote} devis`,
          service: "view-quotes"
        }),
        Skeletons.Button.Label({
          ico: 'desktop_drumeememo',
          label: `${bill} factures`,
          service: "view-bills"
        }),
      ]
    });
  } else {
    attachments = Skeletons.Element()
  }
  let cust;
  if (customer) {
    cust = Skeletons.Note({
      className: `${pfx}__text`,
      content: `${customer.custName}`,
    });
  }
  let features = Skeletons.Box.Y({
    className: `${pfx}__content features`,
    kids: [
      Skeletons.Note({
        className: `${pfx}__text`,
        content: fromUnixtime(ctime)
      }),
      Skeletons.Button.Svg({
        className: `${pfx}__icon`,
        ico: 'desktop_desksettings',
      }),
      cust
    ]
  });
  let name = 'description';
  let args = {
    className: `${pfx}__textarea ${name}`,
    name,
    value: description,
    formItem: name,
    innerClass: name,
    placeholder: "Description de la mission",
    uiHandler: [ui],
    type: _a.textarea,
    sys_pn: "description"
  }

  let details = Skeletons.Box.Y({
    className: `${pfx}__content details`,
    kids: [
      menuInput(ui, {
        items: Env.get('workType'),
        name: 'category',
        placeholder: 'Type de travail',
        refAttribute: 'label',
        service: 'update-mission',
        value: workType || type,
        api: {
          service: 'work.update',
          id: ui.mget(_a.id)
        }
      }),
      Skeletons.Box.X({
        className: `${pfx}__location`,
        kids: [
          Skeletons.Note({
            className: `${pfx}__text`,
            content: city
          }),
          Skeletons.Note({
            className: `${pfx}__text`,
            content: normalizelLocation(location)
          })
        ]
      }),
      Skeletons.Entry(args)
      // Skeletons.Note({
      //   className: `${pfx}__description`,
      //   content: description.replace(/\n/g, '<br>')
      // })
    ]
  });


  return Skeletons.Box.G({
    className: `${pfx}__main`,
    debug: __filename,
    uiHandler: [ui],
    dataset: {
      attached
    },
    kids: [
      features,
      details,
      attachments,
    ],
  })

}
module.exports = mission_item;

