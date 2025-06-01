

const Form = require('../../form');
const { vat } = require('../../../utils');
class __form_bill extends Form {


  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
    this.model.atLeast({
      type: 'bill',
      category: 0
    })
    this._data = {}
    this._timer = {}
    if (opt.source && opt.source.data) {
      this.mset(opt.source.data())
    }
  }


  /**
  * 
  */
  data() {
    let {
      city,
      citycode,
      countrycode,
      custId,
      workId,
      geometry,
      siteId,
      location,
      postcode,
      description,
      workType,
      site,
      billId
    } = this.model.toJSON();

    return {
      city,
      citycode,
      countrycode,
      workId,
      custId,
      geometry,
      location,
      postcode,
      siteId,
      workType,
      description,
      site,
      id: workId,
      billId
    }
  }

  /**
   * 
   */
  createBill() {
    let args = this.getData();
    let { custId, siteId, workId, billId } = this.data();
    args = { ...args, custId, siteId, billId, workId }
    let error = 0;
    if (!args.description) {
      error = 1
      this.changeDataset('description', _a.error, 1)
    } else {
      this.changeDataset('description', _a.error, 0)
    }

    this.debug("AAA:105", args)
    if (error) {
      this.changeDataset("go-btn", _a.state, 1);
      return;
    }
    this.changeDataset("btn-create", _a.state, 0)
    this.postService(PLUGINS.bill.create, { args }).then((data) => {
      let service = this.mget("callbackService") || 'bill-created'
      this.triggerHandlers({ service, data });
      this.goodbye()
    }).catch((e) => {
      this.changeDataset("btn-create", _a.state, 1)
      this.message(LOCALE.ERROR_SERVER);
      this.debug("AAA:377 FAILED", e)
    })
  }

  /**
   * 
   * @param {*} source 
   */
  async reuseBill(source) {
    if (!source) return
    let { ht, ttc, tva, billId } = source.model.toJSON();
    let el_ht = await this.ensurePart('ht');
    let el_ttc = await this.ensurePart('ttc');
    let el_tva = await this.ensurePart('tva');
    el_ht.setValue(ht);
    el_ttc.setValue(ttc);
    el_tva.setValue(vat(tva));
    this.mset({ billId })
  }

  /**
   * 
   */
  onDomRefresh() {
    this.postService(PLUGINS.bill.orphanedNumbers).then((data) => {
      this._orphanedNumber = {}
      this.debug("AAA:100", data)
      for (let row of data) {
        this._orphanedNumber[row.chrono] = row;
      }
      this.feed(require('./skeleton')(this, data));
    }).catch((e) => {
      this.feed(require('./skeleton')(this));
    })
  }

  /**
   * 
   */
  onUiEvent(cmd, args = {}) {
    let service = args.service || cmd.mget(_a.service);
    this.debug("AAA:213", service, cmd, this)
    switch (service) {
      case "prompt-location":
        this.promptSite(cmd);
        break;
      case "site-created":
        this.loadSitesList(cmd);
        setTimeout(() => {
          this.raise();
        }, 1000)
        break;
      case "set-site":
        this.selectSite(cmd);
        break;
      case "create-bill":
        this.createBill(cmd);
        break;
      case "list-works":
        this.loadWorkList({
          format: _a.small,
          service: "select-work"
        });
        setTimeout(() => {
          this.raise();
        }, 1000)
        break;
      case "select-work":
        this.selectWork(cmd);
        break;
      case _a.input:
        this.updateAmount();
        break;
      case "reuse-old-bill":
        this.reuseBill(args.source);
        break;

      default:
        super.onUiEvent(cmd, args)
    }
  }

}

module.exports = __form_bill
