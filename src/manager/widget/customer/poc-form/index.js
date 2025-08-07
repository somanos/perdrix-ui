
require('./skin');
const Form = require('../../form');
const { phoneNumbersObject, searchPoc } = require("../../../utils");
const { AsYouType } = require('libphonenumber-js')
class __form_customer_poc extends Form {

  constructor(...args) {
    super(...args);
    this.searchPoc = searchPoc.bind(this);
  }

  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
  }


  /**
   * 
   */
  createCustomerPoc() {
    let args = {
      ...this.data(),
      ...this.getData()
    }
    //let args = this.getData();
    let fields = [
      _a.email, 'office', _a.home, _a.mobile, 'fax', _a.lastname, _a.firstname
    ];
    let error = 0;
    for (let name of fields) {
      if (args[name]) {
        switch (name) {
          case _a.email:
            if (!args[name] || !args[name].isEmail()) {
              this.changeDataset(name, _a.error, 1)
              error = 1;
            } else {
              this.changeDataset(name, _a.error, 0)
            }
            break;
          case _a.mobile:
          case _a.home:
          case 'office':
          case 'fax':
            let val = args[name] || "";
            val = val.toString();
            if (!val.isPhoneNumber()) {
              this.changeDataset(name, _a.error, 1)
              error = 1;
            } else {
              this.changeDataset(name, _a.error, 0)
            }
            break;
        }
      } else {
        this.changeDataset(name, _a.error, 0)
      }
      switch (name) {
        case _a.lastname:
          if (!args[name]) {
            this.changeDataset(name, _a.error, 1)
            error = 1;
          } else {
            this.changeDataset(name, _a.error, 0)
          }
          break;
      }
    }
    args.pocId = this.mget('pocId');
    args.siteId = this.mget('siteId');
    args.category = 'customer';
    if (error) return;

    this.postService(PLUGINS.customer.create_poc, { args }).then((data) => {
      this.mset(data)
      this.debug("AAA:82", data, this.data())
      this.promptSite(data)
      this.goodbye()
    }).catch((e) => {
      this.debug("AAA:377 FAILED", e)
    })
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
      pocId,
      addressId,
      custName,
      gender,
      geometry,
      location,
      customer,
      postcode,
      street,
      type,
    } = this.mget('customer') || this.model.toJSON();

    return {
      category,
      city,
      companyclass,
      ctime,
      custId,
      pocId,
      addressId,
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
  onDomRefresh() {
    this.feed(require('./skeleton')(this));
    let { addressId, custName, lastname, firstname } = this.mget('customer') || {}
    this.mget({ custName, lastname, firstname })
    this.debug("AAA:137", this.mget('customer'), addressId)
    this.fetchService(PLUGINS.poc.list, {
      args: {
        addressId
      }
    }).then(async (data) => {
      if (!data || !data.length) return;
      let list = await this.changeDataset(_a.list, _a.state, 1);
      this.debug("AAA:142", list, data)
      list.feed(data)
    })
  }

  /**
  * 
  */
  async selectPoc(cmd) {
    //await this.clearList();
    for (let part of [_a.gender, _a.role, _a.firstname, _a.lastname, _a.email]) {
      let p = await this.ensurePart(part);
      if (cmd.mget(part)) {
        if (p.setValue) {
          p.setValue(cmd.mget(part))
        }
      }
    }
    let phones = phoneNumbersObject(cmd.mget('phones'));
    for (let key in phones) {
      let p = await this.getPart(key);
      if (!p) continue;
      if (phones[key]) {
        if (p.setValue) p.setValue(phones[key])
      } else {
        p.setValue("")
      }
    }
    const { pocId, customer, addressId } = cmd.model.toJSON();
    this.mset({ pocId, address: customer, addressId })
  }


  /**
   * 
   */
  onUiEvent(cmd, args = {}) {
    let service = args.service || cmd.mget(_a.service);
    this.debug("AAA:107", service, cmd.mget(_a.name), cmd, this)
    switch (service) {
      case _a.create:
        this.createCustomerPoc(cmd);
        break;
      case 'select-poc':
        this.selectPoc(cmd);
        break;
      case _a.input:
        switch (cmd.mget(_a.name)) {
          case _a.mobile:
          case _a.home:
          case 'office':
          case 'fax':
            let v = cmd.getValue();
            v = new AsYouType('FR').input(v)
            cmd.setValue(v);
          case _a.email:
          case _a.lastname:
            this.throtle(cmd).then(this.searchPoc);
            break;
        }
        this.raise();
        break;
      default:
        super.onUiEvent(cmd, args)
    }
  }
}

module.exports = __form_customer_poc
