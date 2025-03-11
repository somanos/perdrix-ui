function properties(_ui_, text) {
  const a = Skeletons.Box.Y({
    debug: __filename,
    className: `${_ui_.fig.family}__properties-container`,
    kids: [
      Preset.Button.Close(_ui_, 'close-alert'),
      Skeletons.List.Smart({
        className: `${_ui_.fig.family}__properties-content`,
        kids: [Skeletons.Note({
          className: `${_ui_.fig.family}__properties-text`,
          content: text.trim()
        })]
      })
    ]
  });

  return a;
};

module.exports = properties;
