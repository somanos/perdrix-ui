
require('./skin');
const Form = require('../../form');
const { phoneNumbersObject, searchPoc} = require("../../../utils");
const { acknowledge } = require("../../skeleton")

class __form_poc extends Form {

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
    this.model.atLeast({
      type: 'poc',
      category: 0
    });
    let p = phoneNumbersObject(opt.phones)
    this.mset(p)
  }


  /**
   * 
   */
  createPoc() {
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

    this.postService("site.add_poc", { args }).then((data) => {
      this.triggerHandlers({ service: 'poc-created', data })
      this.goodbye()
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
  data() {
    return this.source.data()
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
        this.createPoc(cmd);
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

      default:
        super.onUiEvent(cmd, args)
    }
  }

}

module.exports = __form_poc
