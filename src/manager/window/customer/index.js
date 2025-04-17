const __window = require('..');
const { placeholder, menuItem } = require("../../widget/skeleton")
const { contextBar } = require("./skeleton/widget")

class __window_customer extends __window {

  async initialize(opt) {
    require('./skin');
    super.initialize(opt);
    this.source = opt.source;
    this.mset(opt.source.data())
  }

  /**
   * 
   */
  onDomRefresh() {
    super.onDomRefresh();
    this.feed(require('./skeleton')(this));
    this.setupInteract();
    this.raise();
    setTimeout(() => {
      this.loadContextBar()
    }, 500)
  }


  /**
  * 
  */
  async loadWorkList(cmd) {
    let filters = await this.getSelectedItems("works-selectors", _a.status);
    let api = {
      service: "work.list",
      custId: this.mget('custId'),
      status: filters
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
        service = 'filter-work';
        buttons = [
          menuItem(this, { label: "Travaux (0)", status: 0, state, service }),
          menuItem(this, { label: "Travaux (1)", status: 1, state, service }),
          menuItem(this, { label: "Travaux (2)", status: 2, state, service }),
          menuItem(this, { label: "Travaux (3)", status: 3, state, service }),
          menuItem(this, { label: "Travaux (4)", status: 4, state, service }),
          Skeletons.Button.Label({
            className: `${this.fig.family}__button-action`,
            label: "Nouveau travail",
            ico: "editbox_list-plus",
            icons: null, service: "create-work"
          })
        ]
        context.feed(contextBar(this, buttons));
        this.loadWorkList(cmd)
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
      case "notes":
        buttons = [
          Skeletons.Button.Label({
            className: `${this.fig.family}__button-action`,
            label: "Nouvelle note",
            ico: "editbox_list-plus",
            icons: null, service: "add-note"
          })
        ]
        context.feed(contextBar(this, buttons));
        this.loadNotesList(cmd)
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
        this.updateWorkItem(cmd, args);
        break;
      case 'load-context':
        this.loadContextBar(cmd, args);
        break;
      case 'work-created':
        this.loadWorkList(cmd)
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
      case 'filter-work':
        this.loadWorkList();
        break;
      case 'filter-bill':
        this.loadBillsList()
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

