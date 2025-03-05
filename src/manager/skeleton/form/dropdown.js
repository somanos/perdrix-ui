/* ================================================================== 
*   Copyright Xialia.com  2011-2023
*   FILE : \src\manager\skeleton\form\dropdown.js
*   TYPE : Skeleton
* =================================================================== **/

const __skl_dropdown_menu_item = function (_ui_, opt = {}, type) {
  const menuFig = `${_ui_.fig.family}-form-menu`;

  const mode = opt.mode || _a.enable

  const menuItem = Skeletons.Box.X({
    className: `${menuFig}__item ${mode}`,
    service: opt.service || 'change_option',
    uiHandler: _ui_,
    type,
    kidsOpt: {
      active: 0
    },
    dataset: { id: opt.id },
    kids: [
      Skeletons.Note({
        className: `${menuFig}__note menu-item`,
        content: opt.name || ''
      })
    ]
  });
  return menuItem;
}


/**
 * default Skeleton for dropdown_menu
 * @param {Object}  _ui_ 
 */
const __skl_dropdown_menu = function (_ui_, type) {

  const menuFig = `${_ui_.fig.family}-form-menu`;
  
  let selectedItem = _ui_.options[type].find((row) => row.selected);

  const menuTrigger = Skeletons.Box.X({
    className: `${menuFig}__input_wrapper`,
    kids: [
      Skeletons.Button.Svg({
        ico: `editbox_arrow--down`,
        className: `${menuFig}__icon-dropdown`,
      }),

      Skeletons.Note({
        content: selectedItem.name, // default label
        type,
        sys_pn: `${type}_selected_text`,
      }),
    ]
  })


  const options =  _ui_.options[type]
    .map((d, index) =>
      __skl_dropdown_menu_item(_ui_, { name: d.name, id: index, mode: d.mode }, type));

  const menuItems = Skeletons.Box.X({
    className: `${menuFig}__items-wrapper`,
    kids: [
      Skeletons.Box.Y({
        className: `${menuFig}__items-wrapper fullwidth`,
        kids: options
      })
    ]
  });

  const menu = Skeletons.Box.X({
    debug: __filename,
    className: `${menuFig}__dropdown ${_ui_.fig.group}__dropdown ${type}`,
    type,
    kids: [{
      kind: _t.menu.topic,
      className: `${menuFig}__wrapper ${_ui_.fig.group}__wrapper`,
      flow: _a.y,
      opening: _e.click,
      sys_pn: 'reseller-manager-form-dropdown',
      service: 'choose-a-option',
      type,
      persistence: _a.none,
      trigger: menuTrigger,
      items: menuItems
    }]
  });

  return menu;
};


export default __skl_dropdown_menu;