
class __quote_item extends LetcBox {

  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
    this.debug("AAA:27", this, opt)
  }

  /**
   * Upon DOM refresh, after element actually insterted into DOM
   */
  onDomRefresh() {
    this.feed(require('./skeleton')(this));
  }

  /**
   * Prompt the user to confirm the removal of the bill
   */
  removeItem() {
    let msg = `Voulez-vous vraiment supprimer ce devis ?`;
    this.getHandlers(_a.ui)[0].confirm(msg).then(() => {
      this.debug("AAA:144", this, this.model.toJSON());
      this.postService(PLUGINS.quote.remove, {
        id: this.mget(_a.id),
      }).then((data) => {
        //this.parent.restart();
        this.debug("Quote deleted", data);
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
    this.postService(PLUGINS.quote.update, { args }).then((data) => {
      this.debug("Quote updated", data);
    })
  }

  onUiEvent(trigger, args = {}) {
    const service = trigger.mget(_a.service)
    this.debug("AAA:27", service, this, trigger)
    switch (service) {
      case _a.save:
        this.saveItem();
        break;
      case _a.remove:
        this.removeItem();
        break;
      case "show-doc":
        this.triggerHandlers({
          service,
        })
        break;
      default:
        this.debug("AAA:28", "Unknown service", service, trigger);
        break;
    }
  }

}

module.exports = __quote_item