require('./skin');
const { placeholder } = require("./widget/skeleton/widgets")
const { address } = require("./widget/skeleton/entries")

class __form_core extends DrumeeInteractWindow {
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
  async feedList(api, itemsOpt, onEmpty) {
    let list = await this.ensurePart(_a.list);
    list.model.unset(_a.itemsOpt)
    list.mset({ api, itemsOpt });
    list.restart();

    list.once(_e.data, async (data) => {
      if (_.isEmpty(data)) {
        return onEmpty(list);
      }
    })
    list.once(_e.eod, async (e) => {
      if (list.isNaturalyEmpty()) {
        onEmpty(list);
      }
    });
    list.once(_e.error, async () => {
      onEmpty(list);
    });
  }


  /**
   * 
   */
  async clearList() {
    let p = await this.ensurePart(_a.list);
    p.clear();

    p = await this.ensurePart(_a.footer);
    p.el.dataset.state = 0;
  }

  /**
  * 
  */
  async prompLocation(cmd) {
    await this.clearList();
    let p = await this.ensurePart("entries-manual");
    p.feed(address(this, {}));
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
