
const __form = require('..');
const { customerBox, placeholder} = require("../../skeleton")

class __form_customer extends __form {

  constructor(...args) {
    super(...args);
    this.searchCustomer = this.searchCustomer.bind(this);
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
  async feedList(api, itemsOpt, onEmpty) {
    let list = await this.ensurePart(_a.list);
    if (list.isWaiting()) {
      if (this._waitTimer) {
        clearTimeout(this._waitTimer)
      }
      this._waitTimer = setTimeout(() => {
        this.feedList(api, itemsOpt, onEmpty);
        this._waitTimer = null;
      }, 2000)
      return;
    }
    list.model.unset(_a.itemsOpt)
    list.mset({ api, itemsOpt });
    list.restart();
    let p = await this.ensurePart(_a.footer);
    p.el.dataset.state = 1;

    p = await this.ensurePart("entries-manual");
    p.clear();

    list.once(_e.data, async (data) => {
      if (_.isEmpty(data)) {
        return onEmpty(list);
      }
    })
    list.once(_e.eod, async (e) => {
      if (list.isNaturalyEmpty()) {
        onEmpty(list);
      }
    });
    list.once(_e.error, async () => {
      onEmpty(list);
    });
  }

  /**
   * 
   */
  searchCustomer(cmd) {
    if (this._locationCompleted) return;
    let words = cmd.getValue();
    let api = {
      service: "perdrix.customer_search",
      words,
      type: this.mget(_a.type)
    };
    let itemsOpt = {
      kind: 'customer_item',
      origin: 'searchbox',
      service: null
    }

    return new Promise((will, wont) => {
      if (!words || !words.length) return will();
      this.feedList(api, itemsOpt, (data) => {
      })
    })
  }

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
  selectCategory(cmd) {
    this._locationCompleted = 0;
    this.ensurePart("entries").then((p) => {
      let category = cmd.mget(_a.value) == 'company' ? 0 : 1;
      this.mset({ type: cmd.mget(_a.value), category })
      p.feed(customerBox(this))
    })
    this.ensurePart("entries-manual").then((p) => {
      p.clear()
    })
  }

  /**
  * 
  */
  itemMenuSelected(cmd) {
    this.ensurePart("menu-trigger").then((p) => {
      p.setLabel(cmd.mget(_a.label));
      this._data[cmd.mget(_a.name)] = cmd.mget(_a.value)
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
  createCustomer() {
    let args = this.getData();
    let fiels = [];
    if (this.mget(_a.type) == 'company') {
      fiels = ['companyname', 'city', 'postcode']
    } else {
      fiels = [_a.lastname, 'city', 'postcode']
    }
    let error = 0
    for (let name of fiels) {
      if (!args[name]) {
        this.changeDataset(name, _a.error, 1)
        error = 1;
      } else {
        this.changeDataset(name, _a.error, 0)
      }
    }
    if (error) return;
    args.category = this.mget(_a.category)
    args.location = [
      args.housenumber, args.streettype, args.streetname, args.additional
    ]
    this.debug("AAA:323", args, this);
    this.postService("perdrix.customer_create", { args }).then((data) => {
      this.debug("AAA:375", data)
    }).catch((e) => {
      this.debug("AAA:377 FAILED", e)
    })
  }

  /**
   * 
   */
  onDomRefresh() {
    this.feed(require('./skeleton')(this));
  }

  /**
   * 
   */
  onUiEvent(cmd, args = {}) {
    let service = args.service || cmd.mget(_a.service);
    switch (service) {
      case "select-category":
        this.selectCategory(cmd);
        break;
      case "item-selected":
        this.itemMenuSelected(cmd);
        break;
      case "streettype-selected":
        this.selectStreetType(cmd);
        break;
      case _a.input:
        switch (cmd.mget(_a.name)) {
          case 'companyname':
          case _a.lastname:
            this.throtle(cmd).then(this.searchCustomer);
            break;
          case _a.location:
            this.throtle(cmd).then(this.searchLocation);
            break;
          case 'streettype':
            let { key } = args;
            if (!key) {
              this.getStreetType(cmd);
            } else {
              this.selectStreetType(cmd, key);
            }
            break;
        }
        break;
      case 'select-address':
        this.addressSelected(cmd);
        break;
      case "prompt-location":
        this.prompLocation(cmd);
        break;
      case _e.create:
        this.createCustomer(cmd);
        break;
      default:
        super.onUiEvent(cmd, args)
    }
  }

}

module.exports = __form_customer
