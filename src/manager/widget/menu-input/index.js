
class __menu_input extends LetcBox {

  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
    this.model.atLeast({
      axis: _a.y
    })
    this.kbdHandler = this.kbdHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  /**
   * 
   */
  onDestroy() {
    RADIO_KBD.off(_e.keyup, this.kbdHandler)
    RADIO_BROADCAST.off(_e.click, this.clickHandler)
  }

  /**
   * 
   * @param {*} key 
   */
  kbdHandler(key) {
    if (key == _e.Escape) {
      this.clearItems();
    }
  }

  /**
   * 
   * @param {*} key 
   */
  clickHandler(e, origin) {
    this.debug()
    if (mouseDragged) {
      return;
    }
    if (e && this.el.contains(e.currentTarget)) {
      return;
    }
    if (origin && (this.contains(origin) || ([_e.data, _a.idle].includes(origin.status)))) {
      return;
    }
    this.clearItems();
  }

  /**
   * 
   */
  clearItems() {
    this.ensurePart('items').then((p) => { p.clear() })
  }

  /**
   * Upon DOM refresh, after element actually insterted into DOM
   */
  onDomRefresh() {
    this.feed(require('./skeleton')(this));
    RADIO_KBD.on(_e.keyup, this.kbdHandler)
    RADIO_BROADCAST.on(_e.click, this.clickHandler)
  }

  /**
   * User Interaction Evant Handler
   * @param {View} trigger
   * @param {Object} args
   */
  onUiEvent(cmd, args = {}) {
    const service = cmd.mget(_a.service);
    this.debug("AAA:45", service, cmd, args);
    let name = this.mget(_a.name);
    switch (service) {
      case "item-selected":
        this.selectItem(cmd);
        break;
      case _a.input:
        switch (cmd.mget(_a.name)) {
          case name:
            let { key } = args;
            if (!key) {
              this.populateItems(cmd);
            } else {
              this.selectItem(cmd, key);
            }
            break;
        }
        break;
    }
  }

  /**
    * 
    */
  populateItems(cmd) {
    let r = []
    if (!cmd || !cmd.getValue) return r;
    let val = cmd.getValue();
    let reg = new RegExp(val, 'i')
    let name = this.mget(_a.name);
    let refAttribute = this.mget('refAttribute');
    this._selIndex = 0;
    for (let item of this.mget(_a.items)) {
      let ref = item[refAttribute]
      if (reg.test(ref) || reg.test(item.label)) {
        let el = Skeletons.Note({
          ...item,
          className: `${this.fig.family}__item ${name}`,
          content: ref || item.label,
          service: "item-selected",
          uiHandler: [this],
          formItem: name,
          name,
          state: 0
        })
        r.push(el);
        if (val) {
          if (r.length > 10) break;
        }
      }
    }
    this.ensurePart('items').then((p) => {
      p.feed(r)
    })
    return r;
  }

  /**
   * 
   */
  commitSelection(cmd) {
    this.ensurePart("entry").then((p) => {
      let value = cmd.mget(_a.content) || cmd.mget(_a.label)
      p.setValue(value);
      const name = this.mget(_a.name);
      p.mset(name, cmd.mget(name))
      p.mset(_a.value, value)
      this.clearItems();
    })
  }

  /**
 * 
 */
  async selectItem(cmd, key) {
    if (!key) {
      return this.commitSelection(cmd)
    }
    let content = await this.ensurePart('items');
    if (key == _e.Escape) {
      content.clear();
      return;
    }
    let curSel = this._curSelection;
    if (key == _e.Enter && curSel) {
      return this.commitSelection(curSel)
    }
    let i = 0;
    if (/down/i.test(key)) {
      if (content.isEmpty()) {
        let input = await this.ensurePart("entry");
        this.populateItems(input);
        return;
      }
    }
    for (let c of content.children.toArray()) {
      if (this._selIndex == i) {
        c.el.dataset.state = "1";
        this._curSelection = c;
        curSel = c;
      } else {
        c.el.dataset.state = "0";
      }
      i++;
    }
    if (!curSel) return;
    if (/up/i.test(key)) {
      this._selIndex--;
    } else if (/down/i.test(key)) {
      this._selIndex++;
    } else {
      return
    }

    if (this._selIndex >= content.collection.length) {
      this._selIndex = 0;
    }
    if (this._selIndex < 0) {
      this._selIndex = content.collection.length - 1;
    }

    let delta = curSel.$el.position().top + curSel.$el.height() - content.el.innerHeight();
    if (delta) {
      content.el.scrollBy(0, delta);
    }
  }


}

module.exports = __menu_input