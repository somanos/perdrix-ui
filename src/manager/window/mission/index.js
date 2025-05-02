const __window = require('..');

class __window_mission extends __window {

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
    this.loadMissionHistory();
    this.loadSales()
  }


  /**
    * 
    */
  async promptNote(cmd) {
    const { custId, category, siteId, workId, site, workType, customer } = this.model.toJSON();
    this.loadWidget({
      kind: 'form_note',
      id: `note-form-${this.mget('workId')}`,
      custId,
      siteId,
      workId,
      site,
      category,
      workType,
      category,
      customer,
      uiHandler: [this],
      callbackService: "note-created"
    })
  }

  /**
  * 
  */
  async promptQuote(cmd) {
    const { custId, category, siteId, workId, site, workType, customer, description } = this.model.toJSON();
    this.loadWidget({
      kind: 'form_quote',
      custId,
      siteId,
      workId,
      site,
      category,
      workType,
      category,
      customer,
      description,
      id: `quote-form-${workId}`,
      uiHandler: [this],
      callbackService: "quote-created"
    })
  }

  /**
  * 
  */
  async promptBill(cmd) {
    const { custId, category, siteId, workId, site, workType, customer, description } = this.model.toJSON();
    this.loadWidget({
      kind: 'form_bill',
      custId,
      siteId,
      workId,
      site,
      category,
      workType,
      category,
      customer,
      description,
      id: `bill-form-${workId}`,
      uiHandler: [this],
      callbackService: "bill-created"
    })
  }



  /**
   * 
   */
  loadMissionHistory() {
    this.fetchService("work.summary", { workId: this.mget('workId') }).then(async (data) => {
      let list = await this.ensurePart(_a.list)
      if (!data.id) return;
      this.mset(data);
      list.feed(require("./skeleton/summary")(this, data))
    })
  }

  /**
   * 
   */
  async loadSales() {
    let quotes = [];
    try {
      quotes = await this.fetchService("work.quotations", { workId: this.mget('workId') })
    } catch (e) {
      this.warn("Failed to fetch quotes", e)
      quotes = []
    }
    let bills = [];
    try {
      bills = await this.fetchService("work.bills", { workId: this.mget('workId') })
    } catch (e) {
      this.warn("Failed to fetch quotes", e)
      bills = []
    }
    quotes.map((e) => {
      e.kind = "quote_item";
      e.uiHandler = this;
    })
    bills.map((e) => {
      e.kind = "bill_item";
      e.uiHandler = this;
    })
    let s = _.sortBy(quotes.concat(bills), ['ctime']);
    s = s.reverse();
    let sales = await this.ensurePart("sales")
    sales.feed(s)
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
      case "add-note":
        this.promptNote(cmd);
        break;
      case "add-quote":
        this.promptQuote(cmd);
        break;
      case "add-bill":
        this.promptBill(cmd);
        break;
      case "note-created":
        this.ensurePart('notes').then((p) => { p.restart() })
        break;
      case "bill-created":
      case "quote-created":
        this.loadSales();
        break;
      case "show-doc":
        let { nid, hub_id, filepath, filename, privilege } = cmd.model.toJSON()
        this.viewDoc({ nid, hub_id, filepath, filename, privilege });
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

__window_mission.initClass();

module.exports = __window_mission;

