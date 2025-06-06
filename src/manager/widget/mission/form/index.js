
const Form = require('../../form');

class __form_mission extends Form {


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
      case 'companyname':
      case _a.lastname:
        child.on(_e.blur, (e) => {
          this.clearList();
        })
        break;
    }
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
      customer,
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
      customer,
      type: 'work'
    }
  }

  /**
   * 
   */
  async loadPocsList() {
    let p = await this.ensurePart("entries-manual");
    this.debug("AAAA:130", p)
    p.el.dataset.state = 1;
    let list = await this.ensurePart(_a.list);
    list.el.dataset.mode = 'context';
    list.model.unset(_a.itemsOpt)
    list.feed(require('./skeleton/pocs-list')(this))
  }

  /**
   * 
   */
  createWork() {
    let args = this.getData();
    let error = 0;
    if (!args.description) {
      error = 1
    }
    this.changeDataset('description', _a.error, error)
    args.custId = this.mget('custId');
    if (error) return;
    this.postService("work.create", { args }).then((data) => {
      let { id } = data;
      this.showMessage(`Le travail a bien ete cree sous le numero ${id}`)
      this.ensurePart("button-work").then((p) => {
        p.setState(1)
        this.goodbye();
      })
      if (id) this.mset({ siteId: id })
      this.triggerHandlers({ service: 'work-created', data });
    }).catch((e) => {
      this.showMessage(LOCALE.ERROR_SERVER);
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
      case "show-pocs":
        this.loadPocsList()
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
      case "set-site":
        this.selectSite(cmd);
        break;
      case "create-mission":
        this.createWork(cmd);
        break;
      default:
        super.onUiEvent(cmd, args)
    }
  }

}

module.exports = __form_mission
