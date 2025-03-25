
const Core = require('../../../core');
require('../skin');
const { workSite, placeholder } = require("../../skeleton")

class __form_work extends Core {

  constructor(...args) {
    super(...args);
    this.searchLocation = this.searchLocation.bind(this);
  }


  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
    this.model.atLeast({
      type: 'company',
      category: 0
    })
    this._data = {}
    this._timer = {}
  }

  /**
   * 
   */
  onPartReady(child, pn) {
    this.raise();
    switch (pn) {
      case "topbar":
        this.setupInteract();
        break;
      case "wrapper-dialog":
        this._dialogPos = child.$el.offset()
        break;
      case 'companyname':
      case _a.lastname:
        child.on(_e.blur, (e) => {
          this.clearList();
        })
        break;
    }
  }


  /**
   * 
   */
  async loadSitesList(cmd) {
    let api = {
      service: "perdrix.site_list",
      custId: this.mget('custId'),
    };
    let itemsOpt = {
      kind: 'site_item',
      service: 'set-site'
    }
    let p = await this.ensurePart("entries-manual");
    p.el.dataset.state = 1;

    this.feedList(api, itemsOpt, (list) => {
      this.debug("AAA:65", api, list)
      list.model.unset(_a.itemsOpt)
      list.feed(placeholder(this));
    })
  }

  // /**
  //  * 
  //  */
  // async feedList(api, itemsOpt, onEmpty) {
  //   let list = await this.ensurePart(_a.list);
  //   if (list.isWaiting()) {
  //     if (this._waitTimer) {
  //       clearTimeout(this._waitTimer)
  //     }
  //     this._waitTimer = setTimeout(() => {
  //       this.feedList(api, itemsOpt, onEmpty);
  //       this._waitTimer = null;
  //     }, 2000)
  //     return;
  //   }
  //   list.model.unset(_a.itemsOpt)
  //   list.mset({ api, itemsOpt });
  //   list.restart();
  //   let p = await this.ensurePart(_a.footer);
  //   p.el.dataset.state = 1;

  //   p = await this.ensurePart("entries-manual");
  //   p.clear();

  //   list.once(_e.data, async (data) => {
  //     if (_.isEmpty(data)) {
  //       return onEmpty(list);
  //     }
  //   })
  //   list.once(_e.eod, async (e) => {
  //     if (list.isNaturalyEmpty()) {
  //       onEmpty(list);
  //     }
  //   });
  //   list.once(_e.error, async () => {
  //     onEmpty(list);
  //   });
  // }


  /**
   * 
   */
  async searchLocation(cmd) {
    let words = cmd.getValue() || "";
    let { length } = words.split(/[ ,]+/)
    let api = {
      service: "perdrix.search_location",
      words,
    };
    let itemsOpt = {
      kind: 'location_item',
      service: 'select-address'
    }

    return new Promise(async (will, wont) => {
      if (length <= 2) return will(null);
      this.feedList(api, itemsOpt, (list) => {
        list.model.unset(_a.itemsOpt)
        list.feed(placeholder(this));
      })
    })
  }


  /**
    * 
    */
  throtle(cmd) {
    return new Promise((will, wont) => {
      if (!cmd || !cmd.getValue) return;
      if (this._timer[cmd.cid]) {
        clearTimeout(this._timer[cmd.cid])
      }
      this._timer[cmd.cid] = setTimeout(async () => {
        await will(cmd);
        this._timer[cmd.cid] = null;
      }, 1000)
    })
  }

  /**
  * 
  */
  selectSite(cmd) {
    this._locationCompleted = 0;
    this.ensurePart("site-address").then((p) => {
      p.feed(workSite(this, cmd))
    })
    this.ensurePart("entries-manual").then((p) => {
      p.clear()
    })
  }



  /**
   * 
   */
  async clearList() {
    let p = await this.ensurePart(_a.list);
    p.clear();

    p = await this.ensurePart(_a.footer);
    p.el.dataset.state = 0;
  }

  /**
   * 
   */
  async changeDataset(name, attr, val) {
    let p = await this.ensurePart(name);
    p.el.dataset[attr] = val;
  }

  /**
  * 
  */
  async prompLocation(cmd) {
    await this.clearList();
    let p = await this.ensurePart("entries-manual");
    p.feed(address(this, {}));
  }


  /**
  * 
  */
  async addressSelected(cmd) {
    await this.clearList();
    let p = await this.ensurePart("entries-manual");
    const {
      street, city, housenumber, postcode, label
    } = cmd.mget('properties') || {};
    this._locationCompleted = 1;
    p.feed(address(this, { street, city, housenumber, postcode }));
    let addr = await this.ensurePart("address-entry");
    addr.setValue(label)
  }

  /**
   * 
   */
  onDomRefresh() {
    this.debug("AAA:205", this)
    this.feed(require('./skeleton')(this));
  }

  /**
   * 
   */
  onUiEvent(cmd, args = {}) {
    let service = args.service || cmd.mget(_a.service);
    this.debug("AAA:213", service, cmd, this)
    switch (service) {
      case "select-site":
        let { choice } = cmd.getData();
        this.debug("AAA:238", choice, service, cmd)
        switch (choice) {
          case "same-address":
            break;
          case "list-sites":
            this.loadSitesList(cmd)
            break;
          case "add-site":
            break;
        }
        break;
      case "set-site":
        this.selectSite(cmd);
        break;
      default:
        super.onUiEvent(cmd, args)
    }
  }

}

module.exports = __form_work
