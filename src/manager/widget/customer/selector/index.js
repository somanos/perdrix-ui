
const { placeholder, acknowledge } = require("../../skeleton")
const Form = require('../../form');
class __site_selector extends Form {


  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
    this.model.atLeast({
      type: 'site',
      category: 0
    })
  }

  /**
* 
*/
  data() {
    const {
      city,
      citycode,
      countrycode,
      custId,
      custName,
      geometry,
      id,
      location,
      postcode,
      customer
    } = this.model.toJSON();

    return {
      city,
      citycode,
      countrycode,
      custId,
      custName,
      geometry,
      location,
      postcode,
      customer,
      siteId: id,
      type: 'site'
    }
  }

  /**
   * 
   * @returns 
   */
  getCurrentApi() {
    if (!this._api) {
      this._api = {
        service: PLUGINS.customer.list,
        args: {
          sort_by: _a.ctime,
          order: "desc"
        }
      }
    }
    return this._api;
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
  async onDomRefresh() {
    this.feed(require('./skeleton')(this));
  }

  /**
   * 
   */
  onUiEvent(cmd, args = {}) {
    let service = args.service || cmd.mget(_a.service);
    this.debug("AAA:212b", service, cmd.mget(_a.name), cmd, this)
    switch (service) {
      case "create-customer":
        this.loadWidget({ kind: "form_customer" });
        this.goodbye();
        break;

      case 'select-address':
        this.addressSelected(cmd, 1);
        break;

      case "create-from-selected":
        if (!this._selected) return;
        this.promptSite(this._selected);
        this.goodbye();
        break;

      case "select-customer":
        this._selected = cmd.data();
        this.debug("AAA:124", this._selected)
        this.ensurePart("create-from-selected").then((p) => {
          this.debug("AAA:126", this._selected, p)
          p.el.dataset.state = 1;
        })
        break;

      case _e.search:
        this.throtle(cmd).then(() => {
          this.searchWithAddress(cmd);
        })
        break;

      default:
        super.onUiEvent(cmd, args)
    }
  }

}

module.exports = __site_selector
