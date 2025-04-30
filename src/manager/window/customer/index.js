const __window = require('..');
const { placeholder, menuItem, contextBar} = require("../../widget/skeleton")

class __window_customer extends __window {

  async initialize(opt) {
    require('./skin');
    super.initialize(opt);
    this.source = opt.source;
    this.mset(opt.source.data())
    this._filter = {
      date: 0,
      city: 1,
      site: 1
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
      custName
    } = this.model.toJSON();

    return {
      city,
      id,
      citycode,
      countrycode,
      custId,
      geometry,
      location,
      postcode,
      custName,
      type: 'customer'
    }
  }
  /**
   * 
   */
  onDomRefresh() {
    super.onDomRefresh();
    this.feed(require('./skeleton')(this));
    this.setupInteract();
    this.raise();
    this.mset({ customer: this.data() })
    setTimeout(() => {
      this.loadContextBar()
    }, 500)
  }

  /**
  * 
  */
  async loadNotesList(cmd) {
    let api = {
      service: "note.list",
      custId: this.mget('custId'),
    };
    let itemsOpt = {
      kind: 'note_item',
    }
    this.feedList(api, itemsOpt, (list) => {
      list.model.unset(_a.itemsOpt)
      list.feed(placeholder(this, {
        labels: ["Aucune note trouvee", "Creer une note"],
        service: "add-note"
      }));
    })
  }

  /**
  * 
  */
  async loadSitesList(filter) {
    let api = {
      service: "site.list",
      custId: this.mget('custId'),
    };
    if (filter) api.filter = filter;
    let itemsOpt = {
      kind: 'site_item',
      service: 'show-works',
      uiHandler: [this]
    }
    this.feedList(api, itemsOpt, (list) => {
      list.model.unset(_a.itemsOpt)
      list.feed(placeholder(this, {
        labels: ["Aucun chantier", "Creer un chantier"],
        service: "add-site"
      }));
    })
  }

  /**
   * 
   */
  async loadBillsList(cmd) {
    let status = await this.getSelectedItems("works-selectors", _a.status);
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
          menuItem(this, { sys_pn: "fdate", label: "Par date", name: 'ctime', state: 0, service }),
          menuItem(this, { sys_pn: "fcity", label: "Par ville", name: 'city', state: 1, service }),
          menuItem(this, { sys_pn: "fsite", label: "Par Chantier", name: 'siteId', state: 1, service }),
          Skeletons.Button.Label({
            className: `${this.fig.family}__button-action`,
            label: "Nouvelle mission",
            ico: "editbox_list-plus",
            icons: null, service: "create-work"
          })
        ]
        context.feed(contextBar(this, buttons));
        this.loadWorkList(null, await this.getSortOptions(null, ["fdate", "fcity", "fsite"]));
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
          menuItem(this, { sys_pn: "fdate", label: "Par date", name: 'ctime', state, service }),
          menuItem(this, { sys_pn: "fcity", label: "Par ville", name: 'city', state, service }),
          Skeletons.Button.Label({
            className: `${this.fig.family}__button-action`,
            label: "Nouveau chantier",
            ico: "editbox_list-plus",
            icons: null, service: "add-site"
          })
        ]
        context.feed(contextBar(this, buttons));
        this.loadSitesList(await this.getSortOptions(null, ["fdate", "fcity"]));
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
  async loadSiteWorks(site) {
    this.debug("AAA:294", this, site)
    this.loadWidget({
      kind: 'window_site',
      ...site.data(),
      customer: this.source.data(),
      id: `site-${site.mget(_a.id)}`,
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
  async onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.model.get(_a.service);
    this.debug(`AAA:170 onUiEvent=${service}`, cmd, args, this);
    switch (service) {
      case "show-contacts":
        break;
      case 'show-works':
        this.loadSiteWorks(cmd)
        break;
      case "mission-hitsory":
        this.loadMissionWindow(cmd);
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
        this.loadWorkList();
        break;
      case 'filter-works':
        this.loadWorkList(null, await this.getSortOptions(cmd, ["fdate", "fcity", "fsite"]));
        break;
      case 'filter-sites':
        this.loadSitesList(await this.getSortOptions(cmd, ["fdate", "fcity"]));
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

__window_customer.initClass();

module.exports = __window_customer;

