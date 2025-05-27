const {
  loadWidget
} = require("../../../utils")

class __bill_item extends LetcBox {
  constructor(...args) {
    super(...args);
    this.loadWidget = loadWidget.bind(this);
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
  data() {
    const {
      custId,
      siteId,
      billId,
      description,
      site,
      customer,
      status,
      workId,
      workType,
      service,
    } = this.model.toJSON();
    let {
      city,
      citycode,
      countrycode,
      geometry,
      location,
      postcode,
    } = this.mget('site') || {};
    return {
      custId,
      siteId,
      billId,
      description,
      site,
      status,
      workId,
      workType,
      city,
      citycode,
      countrycode,
      geometry,
      location,
      postcode,
      customer,
      service,
    }
  }

  /**
   * 
   */
  restart(data) {
    if (data) {
      this.mset(data);
    }
    this.feed(require('./skeleton')(this));
  }

  /**
   * Upon DOM refresh, after element actually insterted into DOM
   */
  onDomRefresh() {
    this.restart()
  }



  /**
   * Prompt the user to confirm the removal of the bill
   */
  removeItem() {
    let msg = `Voulez-vous vraiment retirer cette facture?<br>
    Elle sera réaffectée client système puis pourra être réutilisée ultérieurement.`;
    this.getHandlers(_a.ui)[0].confirm(msg).then(() => {
      this.debug("AAA:144", this, this.model.toJSON());
      this.postService(PLUGINS.bill.unassign, {
        id: this.mget(_a.id),
      }).then((data) => {
        //this.parent.restart();
        this.debug("Bill deleted", data);
        this.goodbye();
      })
    });
  }

  /**
  * 
  */
  saveItem() {
    let args = this.getData()
    this.debug("AAA:144", this.getData(), this, this.model.toJSON());
    args.id = this.mget(_a.id);
    this.debug("AAA:144", args);
    this.postService(PLUGINS.bill.update, { args }).then((data) => {
      this.debug("Bill updated", data);
    })
  }

  /**
   * 
   * @param {*} trigger 
   * @param {*} args 
   */
  onUiEvent(trigger, args = {}) {
    const service = trigger.mget(_a.service)
    this.debug("AAA:121", service, this.mget(_a.service), trigger)
    switch (service) {
      case _a.save:
        this.saveItem();
        break;
      case _a.remove:
        this.removeItem();
        break;
      default:
        this.triggerHandlers({
          service: this.mget(_a.service),
        })
    }
  }

}

module.exports = __bill_item