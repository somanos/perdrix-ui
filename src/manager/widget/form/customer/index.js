
const __form = require('..');
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
      type: 'company'
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
    }
  }

  /**
   * 
   */
  async feedList(api, itemsOpt, will, wont) {
    let list = await this.ensurePart(_a.list);
    list.mset({ api, itemsOpt });
    list.restart();
    let footer = await this.ensurePart(_a.footer);
    footer.el.dataset.state = 1;
    list.once(_e.data, async (data) => {
      this.debug("AAA:66 GOT DATA", data)
      will(data);
    })
    list.once(_e.eod, async () => {
      this.debug("AAA:70 GOT EOD", data)
      will(data);
    });
    list.once(_e.error, async () => {
      this.debug("AAA:104 ERROR", list.isEmpty())
      will([]);
    });
  }

  /**
   * 
   */
  searchCustomer(cmd) {
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
      this.feedList(api, itemsOpt, will, wont)
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
      this.feedList(api, itemsOpt, will, wont)
    })
  }

  /**
   * 
   */
  // throtleLocation(cmd) {
  //   this.debug("AAA:121", cmd, this._pending.location, this._locationCompleted, this._currentWords, this._timer.location)
  //   if (this._locationCompleted) return;
  //   if (!cmd || !cmd.getValue) return;
  //   if (this._timer.location) return;
  //   let words = cmd.getValue() || "";
  //   let { length } = words.split(/[ ,]+/)
  //   this.debug("AAA:129", cmd, length, words, this._pending.location, this._locationCompleted, this._currentWords)
  //   if (length <= 2) return;
  //   if (this._currentWords == words) return;
  //   this._timer.location = setTimeout(() => {
  //     words = cmd.getValue() || "";
  //     this._currentWords = words;
  //     this.searchLocation(words);
  //     this._timer.location = 0;
  //     if (this._pending.location && this._pending.location != this._currentWords) {
  //       this.searchLocation(words);
  //     }
  //   }, 1000)
  // }

  /**
   * 
   */
  // throtleCustomer(cmd) {
  //   if (!cmd || !cmd.getValue) return;
  //   if (this._timer.customer) return;
  //   let words = cmd.getValue() || "";
  //   let { length } = words.split(/[ ,]+/)
  //   if (length <= 2) return;
  //   if (this._currentWords == words) return;
  //   this._timer.customer = setTimeout(() => {
  //     words = cmd.getValue() || "";
  //     this._currentWords = words;
  //     this.debug("AAA:121", cmd, length, this._pending.customer, this._currentWords)
  //     this.searchCustomer(words);
  //     this._timer.customer = 0;
  //     if (this._pending.customer && this._pending.customer != this._currentWords) {
  //       this.searchCustomer(words);
  //     }
  //   }, 1000)
  // }

  /**
    * 
    */
  throtle(cmd) {
    return new Promise((will, wont) => {
      if (!cmd || !cmd.getValue) return;
      if (this._timer[cmd.cid]) return;
      this._timer[cmd.cid] = setTimeout(async () => {
        await will(cmd);
        this._timer[cmd.cid] = null;
      }, 1000)
    })
  }


  /**
  * 
  */
  itemMenuSelected(cmd) {
    this.debug("AAA:158", cmd)
    this.ensurePart("menu-trigger").then((p) => {
      this.debug("AAA:158", this, p, cmd);
      p.setLabel(cmd.mget(_a.label));
      this._data[cmd.mget(_a.name)] = cmd.mget(_a.value)
    })
  }

  /**
  * 
  */
  addressSelected(cmd) {
    this.debug("AAA:158", cmd)
    this.ensurePart(_a.list).then(async (p) => {
      p.model.unset(_a.itemsOpt);
      const {
        street, city, housenumber, postcode, label
      } = cmd.mget('properties') || {};
      this.debug("AAA:158", this, p, cmd, { street, city, housenumber, postcode });
      this._locationCompleted = 1;
      const { address, buttons } = require("./skeleton/entries")
      p.feed(address(this, { street, city, housenumber, postcode }));
      let addr = await this.ensurePart("address-entry");
      addr.setValue(label)
      if (!this.__buttons || this.__buttons.isDestroyed()) {
        this.append(buttons(this));
      }
    })
  }

  /**
   * 
   */
  createCustomer() {
    let args = this.getData();
    this.debug("AAA:201", args)
    this.postService("perdrix.customer_create", args).then((data) => {
      this.debug("AAAA:202", data)
    }).catch((e) => {
      this.warn("AAAA:204 FAILED TO CREATE", e)
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
        const { entries } = require("./skeleton/entries")
        this.ensurePart("entries").then((p) => {
          this.mset({ type: cmd.mget(_a.type) })
          p.feed(entries(this))
        })
        break;
      case "item-selected":
        this.itemMenuSelected(cmd);
        break;
      case _a.input:
        switch (cmd.mget(_a.name)) {
          case _a.name:
          case _a.lastname:
            this.throtle(cmd).then(this.searchCustomer);
            break;
          case _a.location:
            this.throtle(cmd).then(this.searchLocation);
            break;
        }
        break;
      case 'select-address':
        this.addressSelected(cmd);
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
