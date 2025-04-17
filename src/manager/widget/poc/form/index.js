
require('./skin');
const Form = require('../../form');
const { acknowledge } = require("../../skeleton")

class __form_poc extends Form {

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
      type: 'poc',
      category: 0
    })
    this.source = opt.source;
    this.mset(this.source.data());
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
            if (!args[name].isEmail()) {
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
            if (!args[name].isPhoneNumber()) {
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
    args.siteId = this.mget('siteId') || this.mget('custId');
    args.siteType = this.mget('siteType') || 'customer';
    args.custId = this.mget('custId');
    this.debug("AAA:323", args, this);
    if (error) return;

    this.postService("poc.create", { args }).then((data) => {
      const { custName } = data;
      this.__content.feed(acknowledge(this, {
        message: `${custName} a bien ete cree`,
      }))
      this.triggerHandlers({ service: 'poc-created', data })
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
  onUiEvent(cmd, args = {}) {
    let service = args.service || cmd.mget(_a.service);
    this.debug("AAA:107", service, cmd.mget(_a.name), cmd, this)
    switch (service) {
      case _a.create:
        this.createPoc(cmd);
        break;
      case "select-site":
        let { choice } = cmd.getData();
        switch (choice) {
          case "same-address":
            this.mset({ siteId: this.mget('custId'), siteType: 'customer' })
            break;
        }
        super.onUiEvent(cmd, args)
        break;
      case "set-site":
        this.mset({ siteId: cmd.mget(_a.id), siteType: 'site' })
        this.selectSite(cmd);
        break;
      case 'close-dialog':
        this.__wrapperDialog.clear();
        break;
      default:
        super.onUiEvent(cmd, args)
    }
  }

}

module.exports = __form_poc
