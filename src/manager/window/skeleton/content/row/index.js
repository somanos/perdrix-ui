/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// ==================================================================== *
//   Copyright Xialia.com  2011-2021
//   FILE : /src/drumee/builtins/window/skeleton/content/row/index.coffee
//   TYPE : Skeleton
// ==================================================================== *

const __media_skl_row = function(_ui_) {
  let a;
  // const style  = _ui_.getContentStyle(87, 1);
  // const vhost  = _ui_.mget(_a.vhost);
  const type   = _ui_.mget(_a.type);
  const pfx = `${_ui_.fig.group}__filter`;

  const header = Skeletons.Box.G({
    className  : `${pfx}__main`,
    kids       : [
      Skeletons.Box.X(),
      Skeletons.Box.X(),
      Skeletons.Button.Label({
        ico         : 'desktop_sortby',
        className   : `${pfx}__column name`,
        labelClass  : `${pfx}__label name`,
        label       : LOCALE.DOMAIN_NAME,
        service     : _e.sort,
        state       : 0,
        name        : _a.name
      }),
      Skeletons.Button.Label({
        ico         : 'desktop_sortby',
        className   : `${pfx}__column date`,
        labelClass  : `${pfx}__label date`,
        label       : LOCALE.LOCALE.CREATION_DATE,
        service     : _e.sort,
        state       : 0,
        name        : _a.date
      }),
      Skeletons.Button.Label({
        ico         : 'desktop_sortby',
        className   : `${pfx}__column size`,
        labelClass  : `${pfx}__label size`,
        label       : LOCALE.SIZE,
        service     : _e.sort,
        state       : 0,
        name        : _a.size
      }),
      Skeletons.Button.Label({
        ico         : 'desktop_sortby',
        className   : `${pfx}__column type`,
        labelClass  : `${pfx}__label type`,
        label       : LOCALE.TYPE,
        state       : 0
      })
    ]});
  
  const list = Skeletons.List.Smart({
    className  : `${_ui_.fig.group}__content-row drive-list`,
    innerClass : "drive-content-scroll",
    sys_pn     : _a.list,
    flow       : _a.none,
    timer      : 2000,
    // bubble     : 1
    uiHandler  : null,
    // signal     : "list:event"
    dataset    : {
      role     : _a.container,
      // ...license()  
    },
    itemsOpt   : {
      kind     : 'media_row',
      flow     : _a.x,
      //signal   : _e.ui.event
      service  : _ui_.mget('itemService') || 'open-node',
      type,
      role     : _ui_.mget(_a.role) || '',
      logicalParent : _ui_
    },   
      // handler  :
      //   uiHandler  : _ui_
    vendorOpt  : Preset.List.Orange_e,
    api        : _ui_.getCurrentApi
  });

  return a = Skeletons.Box.Y({
    debug       : __filename,
    className   : 'u-ai-center',
    styleOpt    : { 
      width       : _K.size.full,
      height      : _K.size.full,
      padding     : '0 0 10px'
    },
    kids        : [
      header,
      list
    ]});
};

module.exports = __media_skl_row;