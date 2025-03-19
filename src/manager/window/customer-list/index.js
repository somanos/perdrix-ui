const __window = require('..');
const { modelComparator, reverseSortBy } = require('../../utils')
const CTYPE = 'ctype';
class __window_customer_list extends __window {
  constructor(...args) {
    super(...args);
    this.getCurrentApi = this.getCurrentApi.bind(this);
    this.hide = this.hide.bind(this);
    this._onDataReceived = this._onDataReceived.bind(this);
    this._onFilterClosed = this._onFilterClosed.bind(this);
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
    this.contextmenuSkeleton = 'a';
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
    this._storedModels = [];
    this._timer = new Date().getTime();
    this._filters = [];
    this._launchOptions = { explicit: 1, singleton: 1 };
  }

  /**
   * 
   */
  onBeforeDestroy() {
    let list = this.getPart(_a.list);
    if (list) list.off("change:state", this._onDataReceived)
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
        service: 'perdrix.customer_list',
        sort_by: _a.ctime,
        order: "desc"
      }
    }
    this.debug("AAA:100", this._api)
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
    if (cmd) {
      name = cmd.mget(_a.name);
      order = cmd.mget(_a.state) ? "asc" : "desc";
    } else {
      name = this._api.sort_by || _a.ctime;
      order = this._api.order || "desc";
    }

    this._api.sort_by = name;
    this._api.order = order;
    if (cmd.getValue) {
      let words = cmd.getValue();
      if (this._lastWords == words) return;
      this.debug("AAA:148", words)
      if (words && words.length) {
        this._api.words = words;
      } else {
        this._api.words = null;;
      }
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
        break;
      case _a.filter:
        this._updateFilter();
        child.on(_e.close, this._onFilterClosed);
        break;

      case "window-header":
        this.setupInteract();
        break;
    }
  }

  /**
   * 
   */
  loadCustomer(cmd, type) {
    const { custId } = cmd.model.toJSON();
    Wm.windowsLayer.append({
      kind: 'window_customer',
      id: `customer-${custId}`,
      customer: cmd
    });
    setTimeout(()=>{
      let w = Wm.windowsLayer.children.last();
      if(w && w.raise) w.raise()
    }, 1000)
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
        this.sortContent(cmd);
        return;
      case 'open-viewer':
        this.loadCustomer(cmd)
        return

        //this.filterContent(cmd);
        return;

      default:
        return super.onUiEvent(cmd, args);
    }
  }


}

module.exports = __window_customer_list;
