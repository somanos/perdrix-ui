const __window = require('..');
const { modelComparator } = require('../../utils')
const CTYPE = 'ctype';
class __window_finder extends __window {
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
    this._api = {
      hub_id: Visitor.id,
    };
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
    this._timer = {};
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
    return {
      service: 'pdx_utils.search',
      words: this.getValue()
    }
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
  sortContent(cmd) {
    let order, name;
    if (cmd) {
      name = cmd.model.get(_a.name);
      order = cmd.model.get(_a.state) ? "asc" : "desc";
    } else {
      name = _a.filename;
      order = "asc";
    }
    let cmp = modelComparator(name);
    switch (name) {
      case _a.filesize:
      case _a.mtime:
      case _a.filename:
      case _a.ext:
        if (/^desc/.test(order)) {
          this.iconsList.collection.comparator = reverseSortBy(cmp);
        } else {
          this.iconsList.collection.comparator = cmp;
        }
        this.iconsList.collection.sort();
        break;
      default:
        this.warn("[729] - Unexpected name", name);
        return;
    }
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
  async _search(source) {
    if (!source || !source.getValue) {
      this.warn("Invalid search source");
      return;
    }
    let words = source.getValue();
    if (!words) {
      this.hide();
      return;
    }

    this.el.style.display = 'flex';
    if (!this.sources[source.cid]) {
      this.sources[source.cid] = 1;
      source.once(_e.destroy, () => {
        delete this.sources[source.cid];
        this._currentSource = null;
        this.hide();
      });
    }
    let list = await this.ensurePart(_a.list);
    if (list.isWaiting()) return;

    let api = {
      service: "pdx_utils.search",
      words
    }
    if (!api.words) return;
    let a = api.words.split(/:+/);
    if (a.length == 0) return;
    if (a.length >= 2) {
      api.table = a[0];
      api.words = a[1];
    };
    if (api.words.length < 3) return;
    if (this._filters.length) {
      api.tables = this._filters;
    }
    list.mset({ api });
    list.restart();
  }

  /**
   * 
   * @param {*} source 
   */
  search(source) {
    this.throtle(source).then(() => {
      this._search(source)
    })
  }

  /**
  *
  */
  onDomRefresh() {
    if (this._api.words) {
      this.setState(1);
    } else {
      this.setState(0);
      this.hide();
    }
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
  async loadSiteWindow(site) {
    this.loadWidget({
      kind: 'window_site',
      ...site.data(),
      id: `site-${site.mget(_a.id)}`,
    })
  }

  /**
    * 
    */
  async promptPoc(cmd) {
    this.loadWidget({
      kind: 'form_poc',
      ...cmd.data(),
      id: `site-${cmd.mget(_a.id)}`,
      uiHandler: [this],
      service: "poc-update"
    })
  }

  /**
   *
   */
  onPartReady(child, pn) {
    switch (pn) {
      case _a.content:
        child.feed(require('./skeleton/results')(this));
        break;
      case _a.list:
        child.on(_e.data, this._onDataReceived);
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
   * @param {*} cmd
   * @param {*} args
  */
  onUiEvent(cmd, args = {}) {
    const { service, type, content } = args
    this.debug(`AAA:273 onUiEvent service=${service}`, cmd.mget(_a.type), cmd, args, this);

    switch (service) {
      case _e.close:
        this.hide();
        return;
      case _a.filter:
        this.filterContent(cmd);
        return;
      case 'open-viewer':
        switch (cmd.mget(_a.type)) {
          case "customer":
            this.loadCustomer(cmd, 1);
            break;
          case "site":
            this.loadSiteWindow(cmd, 1);
            break;
          case "work":
            this.loadMissionWindow(cmd, 1);
            break;
          case "work":
            this.loadMissionWindow(cmd, 1);
            break;
          case "poc":
            this.promptPoc(cmd, 1);
            break;
        }
        return

      default:
        return super.onUiEvent(cmd, args);
    }
  }


}

module.exports = __window_finder;
