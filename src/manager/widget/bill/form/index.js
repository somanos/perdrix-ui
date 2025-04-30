
const Form = require('../../form');

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
    this.debug("AAA:23", this)
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
      site
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
      id: workId
    }
  }

  /**
   * 
   */
  createBill() {
    let args = this.getData();
    let { custId, siteId, workId } = this.data();
    args = { ...args, custId, siteId, workId }
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
    this.postService("bill.create", { args }).then((data) => {
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
   */
  onDomRefresh() {
    this.feed(require('./skeleton')(this));
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
        let { name } = cmd.getData();
        this.debug("AAA:238", name, service, cmd)
        this.updateAmount();
        break;

      default:
        super.onUiEvent(cmd, args)
    }
  }

}

module.exports = __form_bill
