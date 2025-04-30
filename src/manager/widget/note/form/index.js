
const Form = require('../../form');
const { placeholder } = require("../../skeleton")

class __form_note extends Form {


  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
    this._data = {}
    this._timer = {}
  }

  /**
   * 
   */
  onPartReady(child, pn) {
    this.raise();
    switch (pn) {
      case "topbar":
        this.setupInteract();
        break;
      case "wrapper-dialog":
        this._dialogPos = child.$el.offset()
        break;
    }
  }

  /**
   * 
   */
  _upload(e) {
    this.debug("AAA:54", e)
  }

  /**
   * 
   */
  fileDragEnter(e) {
    this.debug("AAA:61", e)
  }

  /**
   * 
   */
  fileDragOver(e) {
    this.debug("AAA:68", e)
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
      geometry,
      id,
      location,
      postcode,
    } = this.model.toJSON();

    return {
      city,
      citycode,
      countrycode,
      custId,
      geometry,
      location,
      postcode,
      siteId: id,
      type: 'work'
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
   * @returns 
   */
  createNote() {
    let args = this.getData();
    let error = 0;
    args.workId = this.mget('workId');
    args.siteId = this.mget('siteId');
    args.category = this.mget('category');
    args.custId = this.mget('custId');
    this.debug("AAA:323", args, this, this.mget(_a.service));
    if (!args.description) {
      this.changeDataset('description', _a.error, 1)
      error = 1;
    } else {
      this.changeDataset('description', _a.error, 0)
      error = 0;
    }
    if (error) return;

    this.postService("note.create", { args }).then((data) => {
      let service = this.mget("callbackService") ||  'note-created'
      this.triggerHandlers({ service, data })
      this.goodbye()
    }).catch((e) => {
      this.__wrapperDialog.feed(acknowledge(this, {
        message: LOCALE.ERROR_SERVER,
        failed: 1,
        service: 'close-dialog',
      }))
      this.debug("AAA:377 FAILED", e)
    })
  }



  /**
   * 
   */
  onUiEvent(cmd, args = {}) {
    let service = args.service || cmd.mget(_a.service);
    switch (service) {
      case _a.create:
        this.createNote(cmd);
        break;
      default:
        super.onUiEvent(cmd, args)
    }
  }

}

module.exports = __form_note
