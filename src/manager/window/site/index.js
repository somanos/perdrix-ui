const __window = require('..');
const { placeholder, menuItem } = require("../../widget/skeleton")
const { contextBar } = require("./skeleton/widget")

class __window_site extends __window {

  async initialize(opt) {
    require('./skin');
    super.initialize(opt);
  }

  /**
   * 
   */
  onDomRefresh() {
    super.onDomRefresh();
    this.feed(require('./skeleton')(this));
    this.setupInteract();
    this.raise();
    this.debug("AAA:22", this)
    setTimeout(() => {
      this.loadWorksList()
    }, 500)
  }


  /**
  * 
  */
  loadWorksList(cmd) {
    let api = {
      service: "work.list",
      custId: this.mget('custId'),
      siteId: this.mget('siteId'),
    };
    let itemsOpt = {
      kind: 'work_item',
      uiHandler: [this]
    }
    this.feedList(api, itemsOpt, (list) => {
      list.model.unset(_a.itemsOpt)
      list.feed(placeholder(this, {
        labels: ["Aucun travail en cours.", "Creer un travail"],
        service: 'create-work',
      }
      ));
    })
  }


  /**
   * 
   */
  async loadBillsList(cmd) {
    let status = await this.getSelectedItems("works-selectors", _a.status);
    this.debug("AAA:33", status)
    let api = {
      service: "bill.list",
      custId: this.mget('custId'),
      status
    };
    let itemsOpt = {
      kind: 'bill_item',
      uiHandler: [this]
    }
    this.feedList(api, itemsOpt, (list) => {
      list.model.unset(_a.itemsOpt)
      list.feed(placeholder(this, {
        labels: ["Aucune facture trouvee"],
      }));
    })
  }

  /**
  * 
  */
  async loadPocList(cmd) {
    if (cmd.mget('isTrigger') && !cmd.mget(_a.state)) return;
    let api = {
      service: "poc.list",
      custId: this.mget('custId'),
    };
    let itemsOpt = {
      kind: 'poc_item',
    }
    this.feedList(api, itemsOpt, (list) => {
      list.model.unset(_a.itemsOpt)
      list.feed(placeholder(this, {
        labels: ["Aucun contact trouve", "Creer un contact"],
        service: "add-poc"
      }));
    })
  }

  /**
  * 
  */
  async loadContextBar(cmd) {
    let context = await this.ensurePart("context-bar");
    let name = "works";
    if (cmd) {
      name = cmd.mget(_a.name);
    }
    let buttons;
    let state = 1;
    let service;
    switch (name) {
      case "works":
        service = 'filter-works';
        buttons = [
          menuItem(this, { label: "Par date", filter: 'date', state: 0, service }),
          menuItem(this, { label: "Par ville", filter: 'city', state: 1, service }),
          menuItem(this, { label: "Par Chantier", filter: 'site', state: 1, service }),
          Skeletons.Button.Label({
            className: `${this.fig.family}__button-action`,
            label: "Nouveau travail",
            ico: "editbox_list-plus",
            icons: null, service: "create-work"
          })
        ]
        context.feed(contextBar(this, buttons));
        this.loadWorksList(cmd)
        break;
      case "pocs":
        buttons = [
          Skeletons.Button.Label({
            className: `${this.fig.family}__button-action`,
            label: "Nouveau contact",
            ico: "editbox_list-plus",
            icons: null, service: "add-poc"
          })
        ]
        context.feed(contextBar(this, buttons));
        this.loadPocList(cmd)
        break;
      case "sites":
        service = 'filter-sites';
        buttons = [
          menuItem(this, { label: "Par ville", state, service }),
          menuItem(this, { label: "Par date", state, service }),
          Skeletons.Button.Label({
            className: `${this.fig.family}__button-action`,
            label: "Nouveau chantier",
            ico: "editbox_list-plus",
            icons: null, service: "add-site"
          })
        ]
        context.feed(contextBar(this, buttons));
        this.loadSitesList();
        break;
      case "solde":
        service = 'filter-bill';
        buttons = [
          menuItem(this, { label: "Facture (0)", status: 0, state, service }),
          menuItem(this, { label: "Facture (1)", status: 1, state, service }),
          Skeletons.Button.Label({
            className: `${this.fig.family}__button-action`,
            label: "Nouvelle facture",
            ico: "editbox_list-plus",
            icons: null, service: "add-bill"
          })
        ]
        context.feed(contextBar(this, buttons));
        this.loadBillsList(cmd)
        break;
    }

  }

  /**
    * 
    */
  async promptPoc(cmd) {
    this.loadWidget({
      kind: 'form_poc',
      source: this.source,
      id: `poc-form-${this.mget('custId')}`,
      uiHandler: [this],
      service: "poc-created"
    })
  }

  /**
    * 
    */
  async promptNote(cmd) {
    this.loadWidget({
      kind: 'form_note',
      source: this.source,
      id: `note-form-${this.mget('custId')}`,
      uiHandler: [this],
      service: "note-created"
    })
  }

  /**
    * 
    */
  async promptWork(cmd) {
    this.loadWidget({
      kind: 'form_site',
      source: this.source,
      id: `site-form-${this.mget('custId')}`,
      uiHandler: [this],
      service: "site-created"
    })
  }

  /**
    * 
    */
  async promptBill(cmd) {
    this.loadWidget({
      kind: 'form_bill',
      source: this.source,
      id: `bill-form-${this.mget('custId')}`,
      uiHandler: [this],
      service: "bill-created"
    })
  }

  /**
    * 
    */
  async promptSite() {
    this.loadWidget({
      kind: 'form_site',
      source: this.source,
      id: `site-form-${this.mget('custId')}`,
      uiHandler: [this],
      service: "site-created"
    })
  }

  /**
    * 
    */
  async promptQuote(cmd) {
    this.loadWidget({
      kind: 'form_quote',
      source: this.source,
      work: cmd,
      id: `quote-form-${this.mget('custId')}`,
      uiHandler: [this],
    })
  }

  /**
    * 
    */
  async updateWorkItem(cmd, args) {
    this.debug("AAA:153:", cmd, args)
    this.ensurePart(_a.list).then((p) => {
      let { data } = args;
      let c = p.getItemsByAttr(_a.id, data.id)[0];
      this.debug("AAA:155:", c, args)
      if (c) {
        c.restart(args.data);
      }
    })
  }

  /**
   * 
   * @param {LetcBox}  cmd 
   * @param {object}  args 
   */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.model.get(_a.service);
    this.debug(`AAA:170 onUiEvent=${service}`, cmd, args, this);
    switch (service) {
      case "show-contacts":
        break;
      case 'show-photos':
        break;
      case 'show-notes':
        this.loadNotesList(cmd)
        break;
      case 'create-work':
        this.loadWorkForm(cmd)
        break;
      case 'quote-created':
      case 'bill-created':
        this.updateWorkItem(cmd, args);
        break;
      case 'load-context':
        this.loadContextBar(cmd, args);
        break;
        break;
      case 'poc-created':
        this.loadPocList(cmd)
        break;
      case 'add-poc':
        this.promptPoc(cmd)
        break;
      case 'add-note':
        this.promptNote(cmd)
        break;
      case 'note-created':
        this.loadNotesList(cmd)
        break;
      case 'show-solde':
        break;
      case 'create-quote':
        this.promptQuote(cmd)
        break;
      case 'work-created':
      case 'filter-works':
        this.loadWorksList();
        break;
      case 'filter-bill':
        this.loadBillsList()
        break;
      case 'add-bill':
        this.promptBill()
        break;

      case 'add-site':
        this.promptSite(this)
        break;
      case "site-created":
        this.loadSitesList();
        break;
      default:
        super.onUiEvent(cmd, args);
    }
  }

  /**
   * To start the Meeting 
   * @param {LetcBox}  media 
   */
  showDetails(cmd) {
    return
  }

}

__window_site.initClass();

module.exports = __window_site;

