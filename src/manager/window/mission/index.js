const __window = require('..');
const { tab } = require("./skeleton/widget")

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
    this.debug("AAA:16", this)
    this.feed(require('./skeleton')(this));
    this.setupInteract();
    this.raise();
    //this.loadContextBar();
    this.loadMissionHistory();
    this.loadSales()
  }

  /**
  * 
  */
  // async loadContextBar() {
  //   let context = await this.ensurePart("context-bar");
  //   context.feed(tab(this));
  // }

  /**
   * 
   */
  loadMissionHistory() {
    this.fetchService("work.summary", { workId: this.mget('workId') }).then(async (data) => {
      let list = await this.ensurePart(_a.list)
      if (!data.id) return;
      list.feed(require("./skeleton/summary")(this, data))
    })
  }

  /**
   * 
   */
  async loadSales(data) {
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
      e.kind = "quote_item"
    })
    bills.map((e) => {
      e.kind = "bill_item"
    })
    let s = quotes.concat(bills);
    let sales = await this.ensurePart("sales")
    this.debug("AAA:70", s, sales)
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

