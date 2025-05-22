const ItemCore = require('../../item');

class __note_item extends ItemCore {
  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    let { custId, siteId, workId, id } = opt;
    this.mset({
      parentDir: `/.attachment/${custId}/${siteId}/${workId}/${id}`,
    })
  }

  /**
   * Upon DOM refresh, after element actually insterted into DOM
   */
  onDomRefresh() {
    this.debug("AAA:17", this)
    this.feed(require('./skeleton')(this));
  }

  /**
   * User Interaction Evant Handler
   * @param {View} trigger
   * @param {Object} args
   */
  onUiEvent(trigger, args = {}) {
    const service = trigger.mget(_a.service) || "open-viewer";
    this.debug("AAA:32", trigger, this, service)
    switch (service) {
      case _a.save:
        this.saveItem();
        break;
      case _a.remove:
        this.removeItem();
        break;
      default:
        this.triggerHandlers({
          service,
        })
    }
  }

  /**
  * 
  */
  removeItem() {
    let msg = `Voulez-vous vraiment supprimer cette note ?`;
    this.getHandlers(_a.ui)[0].confirm(msg).then(() => {
      this.debug("AAA:144", this, this.model.toJSON());
      this.postService(PLUGINS.note.remove, {
        id: this.mget(_a.id),
      }).then((data) => {
        this.parent.restart();
        this.debug("Note deleted", data);
      })
    });
  }

  /**
  * 
  */
  saveItem() {
    let { description } = this.getData()
    this.debug("AAA:144", this, this.model.toJSON());
    let args = {
      id: this.mget(_a.id),
      description
    }
    this.debug("AAA:144", args);
    this.postService(PLUGINS.note.update, { args }).then((data) => {
      this.debug("Note updated", data);
    })
    this.debug("removeItem", this.model.toJSON(), this);
  }


}
__note_item.initClass();

module.exports = __note_item