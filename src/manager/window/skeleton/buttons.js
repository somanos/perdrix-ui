module.exports = function (_ui_, button1 = {}, button2 = {}) {
  const formFig = `${_ui_.fig.group}`;
  const buttons = Skeletons.Box.X({
    className: `${formFig}__buttons-wrapper`,
    kids: [
      Skeletons.Box.X({
        className: `${formFig}_go_btn_wrapper`,
        kids: [
          Skeletons.Note({
            className: `${formFig}__button button cancel-btn`,
            service: 'close-form',
            content: LOCALE.CANCEL,
            ...button1,
            uiHandler: _ui_,
          })
        ]
      }),

      Skeletons.Box.X({
        className: `${formFig}_go_btn_wrapper`,
        kids: [
          Skeletons.Note({
            className: `${formFig}__button button action-btn`,
            service: 'submit-perdrix-creation',
            content: LOCALE.CREATE,
            ...button2,
            uiHandler: _ui_,
          })
        ]
      })
    ]
  });
  return buttons;
}
