
module.exports = function(_ui_){
  const header = Skeletons.Box.X({
    debug     : __filename,
    className : `${_ui_.fig.family}__header ${_ui_.fig.group}__header`, 
    kidsOpt: {
      radio : _a.on,
      uiHandler    : _ui_
    },
    kids : [Skeletons.Window.TopbarControl(_ui_, "c")]
  });

  //const a = Skeletons.Window.Main(_ui_, menu);

  const a = Skeletons.Box.Y({
    className  : `${_ui_.fig.family}__main`,
    debug      : __filename,
    kids       : [
      header,
      {kind:'spinner'}
    ]
  })
  return a;
}