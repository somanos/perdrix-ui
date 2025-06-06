
const { customerBox, acknowledge, address } = require("../../skeleton")
const Form = require('../../form');

class __form_customer extends Form {

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
  data() {
    const {
      category,
      city,
      companyclass,
      ctime,
      custId,
      custName,
      gender,
      geometry,
      location,
      customer,
      postcode,
      street,
      type,
    } = this.model.toJSON();

    return {
      category,
      city,
      companyclass,
      ctime,
      custId,
      custName,
      gender,
      geometry,
      location,
      customer,
      postcode,
      street,
      type,
    }
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
      case 'entries-manual':
        if (!this.mget('isUpdate')) break;
        const {
          street, city, housenumber, postcode, label, location
        } = this.model.toJSON() || {};

        this._locationCompleted = 1;
        child.el.dataset.state = 1;
        child.feed(address(this, {
          street,
          location,
          city,
          housenumber,
          postcode,
          service: _e.update,
          serviceLabel: LOCALE.UPDATE
        }));
        this.ensurePart("address-entry").then((addr) => {
          addr.setValue(label)
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
      service: "customer.search",
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

    this.postService("customer.create", { args }).then((data) => {
      this.mset({ ...data, customer: data })
      //this.promptSite(this)
      this.promptMission(this);
      this.goodbye();
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
  updateCustomer() {
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
    args.id = this.mget('custId');
    args.custId = args.id;
    this.postService("customer.update", { args }).then((data) => {
      let service = this.mget('callbackService');
      if (service) {
        this.triggerHandlers({
          service,
          data
        })
      }
      this.goodbye();
    }).catch((e) => {
      this.__wrapperDialog.feed(acknowledge(this, {
        message: LOCALE.ERROR_SERVER,
        failed: 1,
        service: 'close-dialog',
      }))
      this.debug("AAA:171 FAILED", e)
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
    this.verbose("AAA:214", service, cmd, this)
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
        this.promptLocation(cmd);
        break;
      case _e.create:
        this.createCustomer(cmd);
        break;
      case _e.update:
        this.updateCustomer(cmd);
        break;
      case 'close-dialog':
        this.__wrapperDialog.clear();
      default:
        super.onUiEvent(cmd, args)
    }
  }

}

module.exports = __form_customer
