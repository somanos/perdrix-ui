class __perdrix_dock extends LetcBox {

  /**
   * 
   * @param {*} opt 
   */
  initialize(opt = {}) {
    this.fig = 1;
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
    this._launchOptions = { explicit: 1, singleton: 1 };
    this.contextmenuSkeleton = _a.none;
  }


  /**
   * 
   */
  onChildBubble() {

  }

 
  /**
   * 
   * @param {*} child 
   * @param {*} pn 
   */
  onPartReady(child, pn) {
    switch (pn) {
      case 'dock-container':
        this.ensureElement(child.el, () => {
          child.$el.mouseover(() => {
            child.parent.$el.css("z-index", "100000");
          });
          child.$el.mouseout(() => {
            child.parent.$el.css("z-index", "10000");
          });
        })
    }
  }

  /**
   * 
   */
  onDomRefresh() {
    this.feed(require('./skeleton')(this));
  }


  /**
   * 
   * @param {*} cmd 
   * @param {*} args 
   */
  onUiEvent(cmd, args) {
    const service = cmd.service || cmd.mget(_a.service) || cmd.mget(_a.name);
    switch (service) {

      case _e.launch:
        if (cmd.mget('exclude')) {
          let e = Wm.getItemByKind(cmd.mget('exclude'));
          if (e && !e.isDestroyed()) {
            e.raise();
            return;
          }
        }
        cmd.el.dataset.isActive = _a.on;
        return Wm.launch({ kind: cmd.mget(_a.respawn), source: cmd }, this._launchOptions);
    }
  }

}

module.exports = __perdrix_dock
