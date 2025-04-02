
const Core = require('../../../core');
require('../skin');
const { customerBox, acknowledge } = require("../../skeleton")

class __form_customer extends Core {

  constructor(...args) {
    super(...args);
    this.searchCustomer = this.searchCustomer.bind(this);
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
  }

  /**
   * 
   */
  onPartReady(child, pn) {
    this.raise();
    switch (pn) {
      case 'companyname':
      case _a.lastname:
        child.on(_e.blur, (e) => {
          this.clearList();
        })
        break;
      default:
        super.onPartReady(child, pn);
    }
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
  * @param {*} o 
  */
  onChildBubble(o) {
    this.triggerMethod('change:radio');
  }

  /**
   * 
   */
  createCustomer() {
    let args = this.getData();
    let fields = [];
    if (this.mget(_a.type) == 'company') {
      fields = ['companyname', 'city', 'postcode']
    } else {
      fields = [_a.lastname, 'city', 'postcode']
    }
    let error = 0
    for (let name of fields) {
      if (!args[name]) {
        this.changeDataset(name, _a.error, 1)
        error = 1;
      } else {
        this.changeDataset(name, _a.error, 0)
      }
    }
    if (error) return;
    args.category = this.mget(_a.category)

    this.postService("perdrix.customer_create", { args }).then((data) => {
      const { custName } = data;
      this.__content.feed(acknowledge(this, {
        message: `${custName} a bien ete cree`,
      }))
    }).catch((e) => {
      this.__wrapperDialog.feed(acknowledge(this, {
        message: LOCALE.ERROR_SERVER,
        failed: 1,
        service: 'close-dialog',
      }))
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
    this.debug("AAA:250", service, cmd.mget(_a.name), cmd.status, cmd, this)
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
        this.raise();
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
      case 'close-dialog':
        this.__wrapperDialog.clear();
      default:
        super.onUiEvent(cmd, args)
    }
  }

}

module.exports = __form_customer
