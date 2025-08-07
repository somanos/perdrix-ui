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
    window.PerdixDock = this;
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
  async viewFolder(data, trigger) {
    if (!data || !data.nid || !data.hub_id) {
      Wm.alert(LOCALE.MISSING_ARGUMENTS);
      return;
    }
    let Media = await Kind.waitFor('media_pseudo');
    let media = new Media(data);
    let args = {
      kind: "window_folder", media, trigger, style: {
        left: 50, top: 50
      }
    }
    Wm.addWindow(args);
    let w = Wm.windowsLayer.children.last();
    setTimeout(() => {
      if (w && w.raise) w.raise();
    }, 500)
    this.debug("AAA:61", w)
    let pos = w.$el.position();
    if (w.anti_overlap && w.anti_overlap(pos)) {
      w.$el.css(pos)
    }
    return w;
  }


  /**
   * 
   */
  onDomRefresh() {
    this.feed(require('./skeleton')(this));
  }

  /**
   * 
   * @param {*} msg 
   */
  message(msg) {
    this.ensurePart('message').then((p) => {
      if (msg) {
        p.feed(
          Skeletons.Box.X({
            className: `${this.fig.family}__message-content`,
            kids: Skeletons.Note({
              className: `${this.fig.family}__message-text`,
              content: msg
            })
          })
        )
      } else {
        p.clear()
      }
    })
  }

  /**
   * 
   * @param {*} cmd 
   * @param {*} args 
   */
  onUiEvent(cmd, args) {
    const service = cmd.service || cmd.mget(_a.service) || cmd.mget(_a.name);
    this.debug("AAA:111", cmd.mget('exclude'), service)
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
        let w = Wm.launch({ kind: cmd.mget(_a.respawn), source: cmd }, this._launchOptions);
        if (!w) {
          Wm.getItemsByKind(cmd.mget(_a.respawn))[0]?.show()
        }
        break;
      case _e.view:
        let nodeName = cmd.mget("nodeName");
        let partName = cmd.mget("sys_pn");
        this.ensurePart(partName).then((p) => {
          this.viewFolder(Env.get(nodeName), p);
        })
        break;
    }
  }

}

module.exports = __perdrix_dock
