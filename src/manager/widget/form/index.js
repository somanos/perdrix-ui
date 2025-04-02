require('./skin');

const Core = require('../../core');
const { workSite, placeholder } = require("../skeleton")

class __form_core extends Core {
  /**
   * 
   */
  initialize(opt = {}) {
    super.initialize(opt);
    this.declareHandlers();
  }

  /**
 * 
 */
  async loadSitesList(cmd) {
    let api = {
      service: "perdrix.site_list",
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
  selectSite(cmd) {
    this._locationCompleted = 0;
    this.ensurePart("site-address").then((p) => {
        p.feed({
          ...cmd.data(),
          kind:'location_view',
        })
      // p.feed(workSite(this, cmd))
    })
    this.ensurePart("entries-manual").then((p) => {
      p.el.hide()
    })
  }

  /**
     * 
     */
  async promptSite(cmd) {
    this.loadWidget({
      kind: 'site_form',
      source: this,
      id: `site-form-${this.mget('custId')}`,
      uiHandler: [this],
      service: "site-created"
    })
    this.ensurePart("entries-manual").then((p) => {
      p.el.dataset.state = 0;
    });
  }

  /**
  * 
  */
  async addressSelected(cmd) {
    await this.clearList();
    let p = await this.ensurePart("entries-manual");
    const {
      street, city, housenumber, postcode, label
    } = cmd.mget('properties') || {};
    this._locationCompleted = 1;
    p.feed(address(this, { street, city, housenumber, postcode }));
    let addr = await this.ensurePart("address-entry");
    addr.setValue(label)
  }



}
module.exports = __form_core
