
require('./skin');
const Form = require('../../form');
const { phoneNumbersObject, searchPoc } = require("../../../utils");

class __form_custumer_poc extends Form {

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
    let args = this.getData();
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
    args.custId = this.mget('custId');
    if (error) return;

    this.postService(PLUGINS.customer.create_poc, { args }).then((customer) => {
      this.mset({customer})
      this.promptSite()
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
  onDomRefresh() {
    this.feed(require('./skeleton')(this));
  }

  /**
  * 
  */
  async selectPoc(cmd) {
    await this.clearList();
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
      let p = await this.ensurePart(key);
      if (phones[key]) {
        if (p.setValue) p.setValue(phones[key])
      }
    }
    const { pocId } = cmd.model.toJSON();
    this.mset({ pocId })
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
          case _a.email:
          case 'office':
          case 'fax':
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

module.exports = __form_custumer_poc
