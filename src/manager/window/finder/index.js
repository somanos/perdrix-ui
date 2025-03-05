// ==================================================================== *
//   Copyright Xialia.com  2011-2021
//   FILE : /src/drumee/builtins/window/search/index.js
//   TYPE : Component
// ==================================================================== *
const __window = require('..');

class __window_finder extends __window {
  constructor(...args) {
    super(...args);
    this.getCurrentApi = this.getCurrentApi.bind(this);
    this.hide = this.hide.bind(this);
  }


  /**
  * @param {*} opt
  */
  initialize(opt = {}) {
    require('./skin');
    if (!opt.words || opt.words.length < 3) {
      opt.dataset = { ...opt.dataset, state: _a.closed };
    }
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
    this.style.set({
      display: _a.none
    })
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
      return t.getValue;
    }
  }


  getCurrentApi() {
    return {
      service: 'perdrix.search',
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
  search(source, win, args) {
    if (!source || !source.getValue) {
      this.warn("Invalid search source");
      return;
    }
    let words = source.getValue();
    if (!words) {
      this.hide();
      return;
    }
    this.debug("AAA:101", words);
    let { top, left } = source.$el.offset();
    this.el.style.top = (top + source.$el.height()) + 'px';
    this.el.style.left = left + 'px';
    this.el.style.display = 'flex';
    if (!this.sources[source.cid]) {
      this.sources[source.cid] = 1;
      source.once(_e.destroy, () => {
        delete this.sources[source.cid];
        this._currentSource = null;
        this.hide();
      });
    }
    let searchOpt = source.mget('searchOpt');
    // if (!searchOpt || !searchOpt.api) return;
    // this._api.service = searchOpt.api;
    // this._api.words = words;
    // let { itemsOpt } = searchOpt
    // this.mset({ itemsOpt });
    //this.debug("AAA:101", this, itemsOpt, this._api);
    let api = {
      service: "perdrix.search",
      words
    }
    this.debug("AAA:101", api);

    this.ensurePart(_a.list).then((list) => {
      this.debug("AAA:116", api);
      if (!api.words) return;
      let a = api.words.split(/:+/);
      if (a.length == 0) return;
      if (a.length >= 2) {
        api.table = a[0];
        api.words = a[1];
      };
      if (api.words.length < 3) return;
      list.mset({ api, columns: ['ctime', 'id', 'type'] });
      list.restart();
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
    this.setupInteract();
  }

  /**
   *
   */
  onPartReady(child, pn) {
    switch (pn) {
      case _a.content:
        child.feed(require('./skeleton/results')(this));
        break;
    }
  }


  /**
   * @param {*} cmd
   * @param {*} args
  */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.mget(_a.service);
    this.debug(`onUiEvent service=${service}`, cmd, this);

    switch (service) {
      case _e.close:
        this.hide();
        // this.setValue('');
        // setTimeout(()=>{
        //   this.el.dataset.state = _a.closed;
        // }, 200);
        return;
      default:
        return super.onUiEvent(cmd, args);
    }
  }


}

module.exports = __window_finder;
