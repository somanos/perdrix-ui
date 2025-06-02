
require('./skin');
const NO_FILE_DROP = 'Veuillez ouvrir le dossier factures ou devis pour déposer un ficher';
const WS_EVENT = "ws:event";

class __perdrix_manager extends DrumeeWm {
  constructor(...args) {
    super(...args);
    this.capture = this.capture.bind(this);
    this._upload = this._upload.bind(this);
    this.reorder = this.reorder.bind(this);
    this.onPartReady = this.onPartReady.bind(this);
    this.getLocalSelection = this.getLocalSelection.bind(this);
    this._getViewerPosition = this._getViewerPosition.bind(this);
    this.onDomRefresh = this.onDomRefresh.bind(this);
    this.onUiEvent = this.onUiEvent.bind(this);
    this.handleCustomersList = this.handleCustomersList.bind(this);
    this._displayContent = this._displayContent.bind(this);
    this._onmouseover = this._onmouseover.bind(this);
  }

  static initClass() {
    this.prototype.events = {
      drop: '_upload',
      // dragenter: "fileDragEnter",
      dragover: "fileDragOver",
    };
  }

  /**
   * 
   * @param {*} opt 
   */
  initialize(opt) {
    window.Wm = this;
    super.initialize(opt);
    this.offsetY = 0;
    this.declareHandlers();
    this.offsetHeight = 230;
    this.isApplication = true;
    this._launchOptions = { explicit: 1, singleton: 1 };
    this.contextmenuItems = [];
    this.acceptMedia = 0;
  }


  /**
   * 
   * @param {*} e 
   * @returns 
   */
  _upload(e) {
    PerdixDock.message()
    if (this._target === this) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      this.alert(NO_FILE_DROP)
    } else {
      this.upload(e)
    }

    return false
  }

  /**
   *
   * @param {*} e
   */
  fileDragOver(e) {
    super.fileDragOver(e)
    if (this._target === this) {
      PerdixDock.message(NO_FILE_DROP)
    } else {
      PerdixDock.message()
    }
  }

  _clear_message(e) {
    PerdixDock.message()
    return
  }

  /**
   * 
   * @returns 
   */
  resetSearch() {
    return (this.searchBar != null ? this.searchBar.setValue('') : undefined);
  }

  /**
   * 
   * @param {*} source 
   * @param {*} args 
   * @returns 
   */
  search(source, args) {
    this.finderSource = source;
    let kind = 'window_finder';
    const w = this.getItemByKind(kind);
    if (!w || w.isDestroyed()) {
      const string = source.getValue(1);
      let { top, left } = source.$el.offset();
      const item = {
        kind,
        string,
        trigger: source,
        uiHandler: [source],
      };
      this.windowsLayer.append(item);
      return
    }
    if (!source) {
      w.hide();
    } else {
      w.search(source, args);
    }
  }
  /**
   * 
   * @param {*} m 
   * @returns 
   */
  capture(m) {
    if (!m) return
    if (!m.isPseudo) {
      this.warn("Accept only pseudo media!", m);
      return;
    }
    const t = this.selectWindow(m);
    if (!t) {
      return;
    }
    return this._target = t.seek_insertion(m);
  }

  /**
   * 
   */
  handleCustomersList() {
    let kind = 'window_customer_list';
    if(this._timeout) return
    this._timeout = setTimeout(()=>{
      this._timeout = null;
      if (this.getItemByKind(kind)) return
      this.launch({ kind }, { explicit: 1, singleton: 1 });
    }, 2000)
  }

  /**
   * 
   */
  insert() { }


  /**
   * 
   * @param {*} m 
   * @returns 
   */
  reorder(m) {
    return this.debug("NO OP ", m);
  }

  /**
   * 
   * @param {*} child 
   * @param {*} pn 
   * @returns 
   */
  onPartReady(child, pn) {
    switch (pn) {
      case "browser-wraper":
        return this._content = child;

      case _a.list:
        this.iconsList = child;
        this.bindEvent(_a.live);
        break;

      case "logo-block":
        let logo = `https://${bootstrap().main_domain}` + _K.logo
        child.el.style.backgroundImage = `url(${logo})`;
        return logo

      case 'windows-layer':
        this.windowsLayer = child;
        child.onAddKid = c => {
          c.once(_e.destroy, () => {
            const last = child.children.last();
            if ((last != null) && _.isFunction(last.raise)) {
              return last.raise();
            }
          })
          child.el.style.width = '';
          RADIO_BROADCAST.on('customer-created', this.handleCustomersList)
          return child.el.style.height = '';
        }

        child.collection.on(_e.remove, function () { });
        return child.on(_e.show, () => {
          child.append({ kind: 'window_finder' });
          this.trigger("content:ready", child);
        });

      case "moving-tooltips":
        child.el.onmouseenter = (e) => {
          if (e.buttons) return;
          this._isOverTips = true;
        };
        child.el.onmouseleave = (e) => {
          this._isOverTips = false;
        };
    }
  }

  /**
   * Abstract
   */
  autoMenu() {
  }

  /**
   * 
   */
  getLocalSelection() {
    const f = [];
    this.iconsList.children.each(function (c) {
      if (c.model.get(_a.state)) {
        return f.push(c);
      }
    });
    if (_.isEmpty(f)) return this.iconsList.children.toArray();
    return f;
  }

  /**
   * 
   * @param {*} c 
   */
  _getViewerPosition(c) {
    const width = this.$el.width();
    const height = this.$el.height();
    const p = c.$el.position();
    p.width = _K.docViewer.width; //_K.browser.width
    p.height = _K.docViewer.height; //_K.browser.height
    p.zIndex = 1000 + this.windowsLayer.collection.length;
    if ((p.left + _K.docViewer.width) > width) {
      p.left = width - _K.docViewer.width - 52;
      if (p.left < 0) {
        p.left = 0;
      }
    }
    if ((p.top + _K.docViewer.height) > height) {
      p.top = height - _K.docViewer.height - 52;
      if (p.top < 0) {
        p.top = 0;
      }
    }
    return p;
  }

  /**
   *
  */
  onDomRefresh() {
    //this.debug("AAA:259", this, this.el);
    this.feed(require('./skeleton')(this));
    this.el.onmouseenter = this._mouseenter;
    this.el.onmouseleave = this._mouseleave;
    this._currentTarget;
    this._timeStamp = 0;
    this._currentTips;
    this.el.onmouseover = this._onmouseover;
  }

  /**
   * 
   */
  clearTimer() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }

  /**
   * 
   */
  closeTooltips() {
    let c = this.__movingTooltips;
    c.el.dataset.state = 0;
    c.el.innerHTML = "";
  }

  /**
   * 
   * @param {*} e 
   */
  _onmouseover(e) {
    let c = this.__movingTooltips;
    let state = c.el.dataset.state;
    if (state == 0) {
      return;
    }
    if (e.target.classList.contains('location-wrapper')) {
      this._isOverTips = true;
      this._currentTips = e.target;
      this.clearTimer();
    } else {
      if (this._isOverTips) {
        this.clearTimer();
      }
      if (!this._currentTips || !this._currentTips.contains(e.target)) {
        this._isOverTips = false;
      }
      if (this._sameSource === 0) {
        return
      }
      this._timer = setTimeout(() => {
        //this.debug("AAA:381 -- STATE  _sameSource WAS OVER",this._sameSource, this._isOverTips, state);
        if (this._sameSource) return;
        if (!this._isOverTips) {
          this.closeTooltips();
        }
      }, 1000);
    }
    this._timeStamp = e.timeStamp;
  }

  /**
   * 
   * @param {*} cmd 
   * @param {*} args 
   * @returns 
   */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.mget(_a.service);
    this.closeTooltips();
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
      case _e.search:
        this.search(cmd)
        return;
      case "finder-closed":
        this.ensurePart('search-box').then((p) => {
          p.setValue('')
        })
        break;

    }
  }

  /**
   * 
   * @param {*} data 
   * @returns 
   */
  _displayContent(data) {
    return this.feed(require("./skeleton").default(this, data));
  }

  /**
   * Relay socket event to manager
   * @param {*} service 
   * @param {*} data 
   * @param {*} options 
   */
  onWsMessage(service, data, options = {}) {
    this.trigger(WS_EVENT, { service, data, options })
  }

}
__perdrix_manager.initClass();

module.exports = __perdrix_manager;
