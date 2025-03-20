function switcher(ui) {
  let uiHandler = [ui];
  const pfx = `${ui.fig.family}`;
  let { buttons, service, name, value } = ui.model.toJSON();
  let kids = [];
  let i = 0;
  for (let b of buttons) {
    kids.push(
      Skeletons.Note({
        content: b.label,
        position: i,
        uiHandler,
        service,
        initialState: b.state,
      })
    )
    i++;
  }
  return Skeletons.Box.X({
    className: `${pfx}__main`,
    name,
    value,
    formItem: name,
    kidsOpt: {
      className: `${pfx}__button`,
      radio: `${ui.cid}-radio`,
    },
    kids
  })
};


module.exports = switcher;