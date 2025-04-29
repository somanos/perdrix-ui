const __window = require('..');

class __window_mission extends __window {

  async initialize(opt) {
    require('./skin');
    super.initialize(opt);
  }

  // /**
  //  * 
  //  * @param {*} child 
  //  * @param {*} pn 
  //  */
  // onPartReady(child, pn) {
  //   switch (pn) {
  //     case "notes":
  //       //child.feed(require("./skeleton/content/grid")(this));
  //       break;
  //     case "bills":
  //       //child.feed(require("./skeleton/content/grid")(this));
  //       break;
  //     default:
  //       super.onPartReady(child, pn)
  //   }
  // }

  /**
   * 
   */
  onDomRefresh() {
    super.onDomRefresh();
    this.debug("AAA:15", this)
    this.feed(require('./skeleton')(this));
    this.setupInteract();
    this.raise();
    this.fetchService("work.summary", { workId: this.mget('workId') }).then((data) => {
      this.debug("AAA:20", data);
      setTimeout(() => {
        this.loadMissionHistory(data);
      }, 500)
    })
  }

  /**
   * 
   */
  async loadMissionHistory(data) {
    this.debug("AAA:48", data);
    let list = await this.ensurePart(_a.list)
    if(!data.id) return;
    list.feed(require("./skeleton/summary")(this, data))
    let notesList = await this.ensurePart('notes');
    let billsList = await this.ensurePart('bills');
    let quotesList = await this.ensurePart('quotes');
    this.debug("AAA:69", list, this, notesList, billsList, quotesList);
  //   notesList.feed(note)
  //   bill.map((e) => {
  //     e.kind = "bill_item"
  //   })
  //   quote.map((e) => {
  //     e.kind = "quote_item"
  //   })
  //   let sales = quote.concat(bill).filter(function name(e) {
  //     return (e && e.ttc)
  //  })
   
    // billsList.feed(sales)
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
    }

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

