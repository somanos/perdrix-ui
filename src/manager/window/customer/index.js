const __window = require('..');
// const { placeholder } = require("./skeleton/widget")
const { placeholder } = require("../../widget/skeleton")

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
      this.loadWorkList()
    }, 500)
  }


  /**
  * 
  */
  async loadWorkList(cmd) {
    let filters = await this.getSelectedItems("menu-items", _a.status);
    if (cmd && cmd.mget('isTrigger') && !cmd.mget(_a.state)) return;
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
    if (cmd.mget('isTrigger') && !cmd.mget(_a.state)) return;
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
        labels: ["Aucune note trouve", "Creer une note"],
        service: "add-note"
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
      source:this.source,
      work: cmd,
      id: `quote-form-${this.mget('custId')}`,
      uiHandler: [this],
      service: "site-created"
    })
  }



  /**
   * 
   * @param {LetcBox}  cmd 
   * @param {object}  args 
   */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.service || cmd.model.get(_a.service);
    this.debug(`AAA:86 onUiEvent=${service}`, cmd, args, this);
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
      case 'show-works':
      case 'work-created':
        this.loadWorkList(cmd)
        break;
      case 'show-pocs':
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

