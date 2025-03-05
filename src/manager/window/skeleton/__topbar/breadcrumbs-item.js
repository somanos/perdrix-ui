// ==================================================================== *
//   Copyright Xialia.com  2011-2021
//   FILE : /src/drumee/builtins/window/skeleton/topbar/breadcrumbs-item.coffee
//   TYPE : Skeleton
// ==================================================================== *

const __breadcrumbs_item = function(_ui_, item) {
  const filename = item.filename || item.name;

  let folderIcon = 'raw-drumee-folder-blue';
  let iconColor = 'blue';
  if ((_ui_.mget(_a.kind) === 'window_team') && (item.ext === _a.root)) {
    folderIcon = 'raw-drumee-folder-purple';
    iconColor = 'purple';
  }
  
  if ((_ui_.mget(_a.kind) === 'window_sharebox') && (item.ext === _a.root)) {
    folderIcon = 'raw-drumee-folder-orange';
    iconColor = 'orange';
  }


  const a = Skeletons.Box.X({
    debug : __filename,
    className  : `${_ui_.fig.group}-breadcrumbs__item`,
    uiHandler  : [_ui_],
    filetype   : _a.folder,
    service    : "open-node",
    filename,
    nid        : item.nid,
    hub_id     : item.hub_id,
    pid        : item.pid,
    kidsOpt: {
      active : 0
    },
    kids : [
      Skeletons.Button.Svg({
        ico        : folderIcon,
        className  : `${_ui_.fig.group}-breadcrumbs__item--icon ${iconColor}`
      }),
      
      Skeletons.Note({
        content    : filename,
        className  : `${_ui_.fig.group}-breadcrumbs__item--filename filename`
      })
    ]});
  return a;
};

module.exports = __breadcrumbs_item;
