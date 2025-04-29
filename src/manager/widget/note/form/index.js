
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
    this.model.atLeast({
      type: 'work',
      category: 0
    })
    this._data = {}
    this._timer = {}
    this.mset(opt.source.data())
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
    this.debug("AAA:323", args, this);
    if (!args.description) {
      this.changeDataset('description', _a.error, 1)
    } else {
      this.changeDataset('description', _a.error, 0)
    }
    if (error) return;

    this.postService("note.create", { args }).then((data) => {
      this.triggerHandlers({ service: 'note-created', data })
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
  async loadWorkList(cmd) {
    super.loadWorkList({
      format: _a.small,
      service: "select-work"
    })
    // let api = {
    //   service: "work.list",
    //   custId: this.mget('custId'),
    // };
    // let itemsOpt = {
    //   kind: 'work_item',
    //   uiHandler: [this],
    //   format: _a.small,
    //   service: "select-work"
    // }
    // this.changeDataset("entries-manual", _a.state, 1)
    // this.feedList(api, itemsOpt, (list) => {
    //   list.model.unset(_a.itemsOpt)
    //   list.feed(placeholder(this, {
    //     labels: ["Aucun travail en cours.", "Creer un travail"],
    //     service: 'create-work',
    //   }
    //   ));
    // })
  }


  /**
   * 
   */
  onUiEvent(cmd, args = {}) {
    let service = args.service || cmd.mget(_a.service);
    this.debug("AAA:213", service, cmd, this)
    switch (service) {
      case _a.create:
        this.createNote(cmd);
        break;
      case "prompt-location":
        this.promptSite(cmd);
        break;
      case "site-created":
        this.loadSitesList(cmd);
        setTimeout(() => {
          this.raise();
        }, 1000)
        break;
      case "list-works":
        this.loadWorkList(cmd);
        setTimeout(() => {
          this.raise();
        }, 1000)
        break;
      case "select-work":
        this.mset({
          siteId: cmd.mget('siteId'),
          category: cmd.mget(_a.type),
          workId: cmd.mget(_a.id),
        })
        this.changeDataset("entries-manual", _a.state, 0)
        this.changeDataset("go-btn", _a.state, 1)
        break;
      case "set-site":
        this.mset({ siteId: cmd.mget(_a.id), siteType: 'site' })
        this.selectSite(cmd);
        break;
      default:
        super.onUiEvent(cmd, args)
    }
  }

}

module.exports = __form_note
