
const __form = require('..');
class __form_customer extends __form {
  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
    this.model.atLeast({
      type: 'company'
    })
    this._api = {
      service: "perdrix.customer_search",
    }
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
    }
  }

  /**
   * 
   */
  searchCustomer(cmd) {
    if (this._waitingWords) return;
    if (!cmd || !cmd.getValue) return;
    let words = cmd.getValue();
    if (!words || !words.length) return;
    if (this._lastWords == words) return;
    this._waitingWords = words;
    this._api = {
      service: "perdrix.customer_search",
      words,
      type: this.mget(_a.type)
    };
    this.ensurePart(_a.list).then((list) => {
      let itemsOpt = list.mget(_a.itemsOpt);
      itemsOpt.kind = 'customer_item';
      list.mset({ api: this._api, itemsOpt });
      list.restart();
      list.once(_e.data, async (data) => {
        this._waitingWords = null;
        let footer = await this.ensurePart(_a.footer);
        if (data.length) {
          footer.el.dataset.state = 1;
        } else {
          footer.el.dataset.state = 0;
        }
      })
      list.once(_e.eod, async () => {
        this._waitingWords = null;
        let footer = await this.ensurePart(_a.footer);
        this.debug("AAA:474", list.isEmpty(), list, footer)
        if (list.isEmpty()) {
          footer.el.dataset.state = 0;
        }
      });
    })
  }

  /**
   * 
   */
  async searchLocation(cmd) {
    if (this._waitingWords) return;
    if (!cmd || !cmd.getValue) return;
    let words = cmd.getValue();
    if (!words || words.length < 10) return;
    if (this._lastWords == words) return;
    this._api = {
      service: "perdrix.search_location",
      words,
    };
    this._waitingWords = words;

    this.ensurePart(_a.list).then((list) => {
      let itemsOpt = list.mget(_a.itemsOpt);
      itemsOpt.kind = 'location_item';
      list.mset({ api: this._api, itemsOpt });
      list.restart();
      list.once(_e.data, async (data) => {
        this._waitingWords = null;
        let footer = await this.ensurePart(_a.footer);
        if (data.length) {
          footer.el.dataset.state = 1;
        } else {
          footer.el.dataset.state = 0;
        }
      })
      list.once(_e.eod, async () => {
        this._waitingWords = null;
        let footer = await this.ensurePart(_a.footer);
        this.debug("AAA:474", list.isEmpty(), list, footer)
        if (list.isEmpty()) {
          footer.el.dataset.state = 0;
        }
      });
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
    this.debug("AAA:64", { service, args }, cmd)
    switch (service) {
      case "select-category":
        const { namebox } = require("./skeleton/entries")
        this.ensurePart("namebox").then((p) => {
          this.mset({ type: cmd.mget(_a.type) })
          p.feed(namebox(this))
        })
        break;
      case _a.input:
        switch (cmd.mget(_a.name)) {
          case _a.name:
            this.searchCustomer(cmd);
            break;
          case _a.location:
            this.searchLocation(cmd);
            break;
        }
        break;

      default:
        super.onUiEvent(cmd, args)
    }
  }

}

module.exports = __form_customer
