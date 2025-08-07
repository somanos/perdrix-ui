
const { acknowledge, address, company, person } = require("../../skeleton")
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
   * @param {*} cmd 
   * @param {*} extended 
   */
  async selectAddress(cmd, extended = 0) {
    await this.clearList();
    let p = await this.ensurePart("entries");
    this._data['properties'] = cmd.mget('properties');
    const {
      street, city, housenumber, postcode, label
    } = this._data['properties'] || {};

    let addr = await this.ensurePart("address-entry");
    addr.setValue(label)
    let isUpdate = this.mget('isUpdate');
    let serviceLabel;
    let service = _e.create;
    if (isUpdate) {
      serviceLabel = LOCALE.UPDATE;
      service = _e.update;
    }
    if (p.collection.length >= 3) {
      p.collection.pop()
    }
    p.append(address(this, {
      street, city, housenumber,
      postcode, extended,
      isUpdate, serviceLabel,
      service
    }));
  }

  /**
   * 
   */
  searchCustomer(cmd) {
    if (this.isBlindChar(cmd)) return;
    let custName = cmd.getValue();
    let api = {
      service: PLUGINS.customer.list,
      args: {
        custName,
        sort_by: _a.name,
        order:"aasc"
      },
    };
    let itemsOpt = {
      kind: 'customer_item',
      origin: 'searchbox',
      service: null
    }

    return new Promise((will, wont) => {
      this.feedList(api, itemsOpt, (data) => {
        this.clearList()
      })
    })
  }

  /**
  * 
  */
  selectCategory(cmd) {
    this._locationCompleted = 0;
    this.ensurePart("entries-content").then((p) => {
      let type = cmd.mget(_a.value)
      this.mset({ type })
      let category;
      p.collection.shift()
      if (type == 'company') {
        p.collection.unshift(company(this));
        category = 0;
      } else {
        p.collection.unshift(person(this))
        category = 1;
      }
      this.mset({ category })
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

    this.postService(PLUGINS.customer.create, { args }).then((data) => {
      this.debug("AAA:215", data)
      this.mset(data)
      this.loadPocForm(data);
      this.goodbye();
    }).catch((e) => {
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
      this.debug("AAA:171 FAILED", e)
    })
  }

  /**
   * 
   */
  async selectPoc(cmd, args = {}) {
    this.debug("AAAA:275", cmd, args)
    let { data } = args;
    data.id = `poc-${data.custId}`;
    this.ensurePart("poc-container").then((p) => {
      p.append({ ...data, kind: 'poc_item', mode: 'removable' })
    })
  }

  /**
   * 
   */
  loadPocForm(customer) {
    this.loadWidget({
      kind: "form_customer_poc",
      customer
    })
  }

  /**
   * 
   */
  async getCustomerPocs(cmd) {
    this.ensurePart('btn-create').then((p) => {
      p.el.dataset.state = 1;
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
        this.raise();
        break;
      case 'select-address':
        this.selectAddress(cmd).then(() => {
          this.ensurePart('btn-create').then((p) => {
            p.el.dataset.state = 1;
          })
        });
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
      case "poc-selected":
        this.selectPoc(cmd, args);
        break;
      case 'close-dialog':
        this.__wrapperDialog.clear();
        break;
      // case _e.close:
      //   if (this._pocsList && !this._pocsList.isDestroyed()) {
      //     this._pocsList.goodbye();
      //   };
      default:
        super.onUiEvent(cmd, args)
    }
  }

}

module.exports = __form_customer
