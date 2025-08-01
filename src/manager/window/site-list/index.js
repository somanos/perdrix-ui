const __window = require('..');
const { loadCustomerWindow } = require("../../utils")

const CTYPE = 'ctype';
class __window_site_list extends __window {
  constructor(...args) {
    super(...args);
    this.getCurrentApi = this.getCurrentApi.bind(this);
    this.hide = this.hide.bind(this);
    this._onDataReceived = this._onDataReceived.bind(this);
    this._onFilterClosed = this._onFilterClosed.bind(this);
    this.loadCustomerWindow = loadCustomerWindow.bind(this);
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

    this.onDomRefresh = this.onDomRefresh.bind(this);
    RADIO_BROADCAST.on('customer-created', this.onDomRefresh)
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
    RADIO_BROADCAST.off('customer-created', this.onDomRefresh)
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


  getCurrentApi() {
    if (!this._api) {
      this._api = {
        service: PLUGINS.site.list,
        args: {
          sort_by: _a.ctime,
          order: "desc"
        }
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
  async filterContent(cmd) {
    let filters = await this._updateFilter();

    this.ensurePart(_a.list).then((p) => {
      let models = this._storedModels.filter((m) => {
        return filters.includes(m.get(CTYPE))
      })
      p.collection.set(models)
    })
  }


  /**
   * 
   */
  sortContent(cmd) {
    let order, name;
    if (!cmd.getValue) return;
    if (cmd) {
      name = cmd.mget(_a.name);
      order = cmd.mget(_a.state) ? "asc" : "desc";
    } else {
      name = this._api.args.sort_by || _a.ctime;
      order = this._api.args.order || "desc";
    }
    this._api.args.sort_by = name;
    this._api.args.order = order;
    let words = cmd.getValue();
    if (words && words.length) {
      this._api.args.words = words;
    } else {
      delete this._api.args.words;
    }

    this._lastWords = this._api.words;
    this.ensurePart(_a.list).then((list) => {
      list.mset({ api: this._api });
      list.restart();
    })
  }

  /**
  *
  */
  onDomRefresh() {
    this.feed(require("./skeleton")(this));
  }

  /**
   * 
   */
  async _updateFilter() {
    let roll = await this.ensurePart('filter-roll');
    let filters = roll.collection.map((m) => {
      if (m.get(_a.state)) return m.get(CTYPE);
      return null
    })
    this._filters = _.filter(filters);
    return filters;
  }

  /**
   *
   */
  onPartReady(child, pn) {
    switch (pn) {
      case _a.content:
        child.feed(require('./skeleton/list')(this));
        break;
      case _a.list:
        child.on(_e.data, this._onDataReceived);
        this.list = child;
        this.debug("AAA:192", child)
        break;
      case _a.filter:
        this._updateFilter();
        child.on(_e.close, this._onFilterClosed);
        break;
      // case "window-header":
      //   this.setupInteract();
      //   break;
      default:
        super.onPartReady(child, pn)
    }
  }



  /**
   * @param {*} cmd
   * @param {*} args
  */
  onUiEvent(cmd, args = {}) {
    const { service, type, content } = args
    this.debug(`onUiEvent service=${service}`, cmd, this);

    switch (service) {
      case _e.close:
        this.hide();
        return;
      case _e.sort:
      case _e.search:
        this.throtle(cmd).then(() => {
          this.sortContent(cmd);
        })
        return;
      case 'load-customer-window':
        this.loadCustomerWindow(cmd)
        return
      case 'customer-updated':
        this.onDomRefresh();
        return

        //this.filterContent(cmd);
        return;

      default:
        return super.onUiEvent(cmd, args);
    }
  }


}

module.exports = __window_site_list;
