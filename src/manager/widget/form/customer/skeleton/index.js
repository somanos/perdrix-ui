/**
 * 
 * @param {*} ui 
 * @param {*} content 
 * @param {*} className 
 * @returns 
 */
function __tooltips(ui, content, className) {
  let a;
  if (className == null) { className = ''; }
  return a = {
    className: `${ui.fig.family}__tooltips ${ui.fig.name}-tooltips ${className}`,
    content
  };
};

/**
 * 
 * @param {*} ui 
 * @param {*} type 
 * @param {*} ico 
 * @returns 
 */
function entry(ui, opt) {
  let { label, ico, className, name, placeholder } = opt;
  const pfx = `${ui.fig.group}__${className}`;
  return Skeletons.Box.X({
    className: `${pfx} main-entry`,
    kids: [
      Skeletons.Button.Svg({
        ico,
        className: `${_ui_.fig.family} icon`
      }),
      Skeletons.Entry({
        className: `${pfx} entry`,
        name,
        formItem: name,
        innerClass: name,
        placeholder,
        errorHandler: [_ui_]
      })
    ]
  });
}


//   const inner = Skeletons.Box.G({
//     debug: __filename,
//     className: `${pfx}-container`,
//     kids: [
//       Skeletons.Button.Svg({
//         ico,
//         className: `${pfx}-icon medium`
//       }),
//       Skeletons.Note({
//         className: `${pfx}-label`,
//         content: label
//       }),
//     ]
//   });
//   return Skeletons.Box.X({
//     className: `${pfx}-wrapper`,
//     kids: [inner]
//   })
// }


/**
 * 
 * id, category, type, societe, genre, nom, prenom, numVoie, codeVoie, nomVoie, nomVoie2, codePostal, city, codePays, ctime 

 */

//------------------------------------
//
//------------------------------------
module.exports = function (ui) {
  //uiHandler : [ui]    

  //sys_pn    : "ref-invitation"
  const pfx = ui.fig.family;
  const header = Skeletons.Box.X({
    className: `${pfx}__header ${ui.fig.group}__header`,
    kids: [require('./topbar')(ui)],
    sys_pn: _a.header
  });

  const dialog = Skeletons.Wrapper.Y({
    className: `${ui.fig.group}__wrapper--modal dialog__wrapper--modal ${ui.fig.family}__wrapper--modal`,
    name: "dialog"
  });

  const body = Skeletons.Box.Y({
    className: `${ui.fig.group}__container`,
    sys_pn: _a.content,
    kids: [
      entry(ui, { placeholder: "Nom", name: _a.lastname }),
      entry(ui, { placeholder: "Prenom", name: _a.firstname }),
      entry(ui, { placeholder: "Adresse", name: 'address' }),
    ]
  });

  const footer = Skeletons.Box.Y({
    className: `${pfx}__footer`,
    sys_pn: _a.footer
  });


  const a = Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main ${ui.fig.group}__main`,
    kids: [
      header,
      Skeletons.Box.Y({
        className: `${pfx}__container ${ui.fig.group}__container`,
        kids: [body, footer, dialog]
      })
    ]
  });

  return a;
};

// `customer` (
//   `id` varchar(16) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
//   `ctime` int(11) DEFAULT NULL,
//   `email` varchar(256) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
//   `firstname` varchar(256) DEFAULT NULL,
//   `profile` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`profile`)),
//   `lastname` varchar(256) DEFAULT NULL,
//   `fullname` varchar(128) GENERATED ALWAYS AS (if(concat(ifnull(`firstname`,''),' ',convert(ifnull(`lastname`,'') using utf8mb4)) = ' ',convert(`email` using utf8mb4),concat(ifnull(`firstname`,''),' ',convert(ifnull(`lastname`,'') using utf8mb4)))) VIRTUAL,
//   `bu_id` varchar(16) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
//   `contact_id` varchar(16) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
