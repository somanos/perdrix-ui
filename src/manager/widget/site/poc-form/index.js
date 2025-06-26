
require('./skin');
const Form = require('../../form');
const { phoneNumbersObject, searchPoc } = require("../../../utils");
const { AsYouType } = require('libphonenumber-js')
class __form_site_poc extends Form {

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
  createSitePoc() {
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
    args.category = 'site';
    if (error) return;

    this.postService(PLUGINS.site.create_poc, { args }).then((data) => {
      this.mset(data)
      if (data.isNew) {
        this.promptMission(data)
      }
      this.goodbye()
      RADIO_BROADCAST.trigger('site-poc-pupdate', data);
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
      customer,
      ctime,
      custId,
      addressId,
      geometry,
      location,
      postcode,
      site,
      street,
      type,
    } = this.model.toJSON();

    return {
      category,
      city,
      customer,
      ctime,
      custId,
      addressId,
      geometry,
      location,
      postcode,
      site,
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
      case _a.list:
        child.on(_e.eod, (e) => {
          this.debug("AAA:130", e)
        })
        break;
      default:
        super.onPartReady(child, pn);
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
    const { pocId, address, addressId } = cmd.model.toJSON();
    this.debug("AAA:169", addressId, phones, pocId)
    this.mset({ pocId, address, addressId })
  }


  /**
   * 
   */
  onUiEvent(cmd, args = {}) {
    let service = args.service || cmd.mget(_a.service);
    this.debug("AAA:107", service, cmd.mget(_a.name), cmd, this)
    switch (service) {
      case _a.create:
        this.createSitePoc(cmd);
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
            let v = new AsYouType('FR').input(cmd.getValue())
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

module.exports = __form_site_poc
