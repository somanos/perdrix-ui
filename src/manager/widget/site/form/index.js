
const { placeholder, acknowledge } = require("../../skeleton")
const Form = require('../../form');

class __form_site extends Form {


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
  async loadSitesList(cmd) {
    let api = {
      service: "site.list",
      custId: this.mget('custId'),
    };
    let itemsOpt = {
      kind: 'site_item',
      service: 'set-site'
    }
    let p = await this.ensurePart("entries-manual");
    p.el.dataset.state = 1;

    this.feedList(api, itemsOpt, (list) => {
      list.model.unset(_a.itemsOpt)
      list.feed(placeholder(this));
    })
  }
  /**
   * 
   */
  loadPocForm(data) {
    this.loadWidget({
      ...data,
      kind: "form_site_poc",
    })
  }

  /**
  * 
  */
  createSite(cmd) {
    let args = this.getData();
    if (this._data.properties) {
      args.lat = this._data.properties.x;
      args.lon = this._data.properties.y;
    }
    args.custId = this.mget('custId');
    let fields = ['city', 'postcode']
    let error = 0
    for (let name of fields) {
      if (!args[name]) {
        this.changeDataset(name, _a.error, 1)
        error = 1;
      } else {
        this.changeDataset(name, _a.error, 0)
      }
    }

    delete args.location /** Shall be built by backend */

    if (error) return;
    this.postService(PLUGINS.site.create, { args }).then((data) => {
      this.debug("AAA:123", data)
      let site = { ...data };
      delete site.customer;
      this.promptMission({ ...data, site })
      this.goodbye()
    }).catch((e) => {
      this.__wrapperDialog.feed(acknowledge(this, {
        message: LOCALE.ERROR_SERVER,
        failed: 1,
        service: 'close-dialog',
      }))
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
    this.debug("AAA:212b", service, cmd.mget(_a.name), cmd, this)
    switch (service) {
      case "show-poc":
        this.loadPocsList()
        break;
      case "set-site":
        this.selectSite(cmd);
        break;
      case _a.create:
        this.createSite(cmd);
        break;
      case 'select-address':
        this.addressSelected(cmd, 1);
        break;
      case "prompt-location":
        this.prompLocation(1);
        break;
      case "site-created":
        this.triggerHandlers({ service });
        this.goodbye();
        break;

      case _a.input:
        if (this.isBlindChar(cmd)) return;
        switch (cmd.mget(_a.name)) {
          case _a.location:
            this.changeDataset(_a.footer, _a.state, 1)
            this.throtle(cmd, _a.footer).then(this.searchLocation);
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

      default:
        super.onUiEvent(cmd, args)
    }
  }

}

module.exports = __form_site
