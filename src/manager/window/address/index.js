const __window = require('..');
const BLIND_CHARS = [
  _e.click, _e.blur, _e.Escape, 'Tab', 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'
];
const { loadAddressWindow } = require("../../utils")

class __window_address extends __window {
  constructor(...args) {
    super(...args);
    this.getCurrentApi = this.getCurrentApi.bind(this);
    this._onDataReceived = this._onDataReceived.bind(this);
    this.loadAddressWindow = loadAddressWindow.bind(this)
  }


  /**
  * @param {*} opt
  */
  initialize(opt = {}) {
    require('./skin');
    if (!opt.words || opt.words.length < 3) {
      opt.dataset = { ...opt.dataset, state: _a.closed };
    }
    opt.noDefaultStyle = true;
    super.initialize(opt);
    this.isSearch = 1;
    this.model.set({
      hub_id: Visitor.id,
      role: _a.search,
    });
    this.model.atLeast({
      itemService: 'load-customer-window'
    })

    this.refreshList = this.refreshList.bind(this);
    RADIO_BROADCAST.on('address-update', this.refreshList)
    this._storedModels = [];
    this._timer = new Date().getTime();
    this._filters = [];
    this._launchOptions = { explicit: 1, singleton: 1 };

    this.sources = {};
    let source = opt.trigger;
    if (!source) return;
    this.sources[source.cid] = 1;
    source.once(_e.destroy, () => {
      delete this.sources[source.cid];
      this.hide();
    });
    this.style.unset();
    this.style.set({
      display: _a.none
    })
  }

  /**
   * 
   */
  onBeforeDestroy() {
    let list = this.getPart(_a.list);
    if (list) list.off("change:state", this._onDataReceived)
    RADIO_BROADCAST.off('address-update', this.refreshList)
  }

  /**
   * 
   */
  _onDataReceived(menu) {
    this.ensurePart(_a.list).then((p) => {
      this._storedModels = [...p.collection.models];
      this.raise();
    })
  }

  /**
   * 
   */
  _onFilterClosed(menu) {
    /** DO NOT REMOVE */
  }

  /**
  *
  */
  setValue(v) {
    let t = this.mget(_a.trigger);
    if (t && t.__refEntry) {
      t.__refEntry.setValue(v);
    }
  }

  /**
  *
  */
  getValue() {
    let t = this.mget(_a.trigger);
    if (t && t.getValue) {
      return t.getValue();
    }
  }


  /**
   * 
   * @returns 
   */
  getCurrentApi() {
    if (!this._api) {
      this._api = {
        service: PLUGINS.address.list,
        filter: [
          {
            name: _a.ctime,
            value: "desc",
          },
          {
            name: "streetname",
            value: "asc",
          },
        ],
      }
    }
    return this._api;
  }
  /**
   * 
   */
  hide() {
    this.el.style.display = _a.none;
    setTimeout(() => {
      this.el.style.display = _a.none;
      //this.el.dataset.state = _a.closed;
    }, 200);
  }

  /**
   * 
   */
  refreshList() {
    this.ensurePart(_a.list).then((list) => {
      list.restart();
    })
  }

  /**
   * 
   */
  searchAddress(cmd) {
    let order, name;
    if (cmd) {
      name = cmd.mget(_a.name);
      if (BLIND_CHARS.includes(cmd.status)) return;
      //order = cmd.mget(_a.state) ? "asc" : "desc";
    }
    if (!name) return;
    if (cmd.getValue) {
      this._api[name] = cmd.getValue();
    }
    this.debug("AAA:151", this._api, name, this._api[name])
    this.ensurePart(_a.list).then((list) => {
      list.mset({ api: this._api });
      list.restart();
    })
  }

  /**
  *
  */
  onDomRefresh() {
    super.onDomRefresh();
    this.feed(require("./skeleton")(this));
  }


  /**
   *
   */
  onPartReady(child, pn) {
    switch (pn) {
      case _a.content:
        child.feed(require('./skeleton/list')(this));
        break;
      default:
        super.onPartReady(child, pn)
    }
  }


  /**
   * @param {*} cmd
   * @param {*} args
  */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.model.get(_a.service);
    this.debug(`onUiEvent service=${service}`, cmd, this);

    switch (service) {
      case _e.search:
        this._api = {
          ...this._api,
          filter: [
            {
              name: "streetname",
              value: "asc",
            },
            {
              name: "housenumber",
              value: "asc",
            },
          ],
        }
        this.searchAddress(cmd);
        return;
      case "load-viewer":
        this.loadAddressWindow(cmd.data());
        return;

      default:
        return super.onUiEvent(cmd, args);
    }
  }


}

module.exports = __window_address;
