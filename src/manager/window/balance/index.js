const __window = require('..');
const { loadSalesList, loadSalesHistory, updateBalance } = require("../../utils");

class __window_balance extends __window {

  constructor(...args) {
    super(...args);
    this.updateBalance = updateBalance.bind(this);
    this.loadSalesList = loadSalesList.bind(this);
    this.loadSalesHistory = loadSalesHistory.bind(this);
  }

  async initialize(opt) {
    require('./skin');
    super.initialize(opt);
    this._filter = {
      date: 0,
      name: 1,
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
    this.loadSalesHistory(this, { type: "bill" })
  }

  /**
   * 
   */
  // async loadBalance(cmd) {
  //   let buttons = await this.fetchService("pdx_utils.fiscal_years");
  //   buttons.unshift({ name: _a.all, content: "Toutes les années" });
  //   let bar = fiscalBox(this, buttons);
  //   let context = await this.ensurePart("context-bar");
  //   context.feed(contextBar(this, bar));
  //   this.loadBillsList(cmd);
  //   this.updateBalance(cmd);
  //   this.ensurePart('current-fyear').then((p) => {
  //     p.set({ content: cmd.mget(_a.content) })
  //   })
  // }

  /**
   * 
   */
  async searchBill(cmd) {
  }

  /**
   * 
   * @param {LetcBox}  cmd 
   * @param {object}  args 
   */
  async onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.model.get(_a.service);
    this.debug(`AAA:52 onUiEvent=${service}`, cmd, args, this);
    switch (service) {
      case 'fiscal-year':
        let name = cmd.mget(_a.name);
        if (!name) break;
        this.loadSalesHistory(cmd, { type: "bill" })
        break;
      case _a.search:
        this.searchBill(cmd);
        break;
      default:
        super.onUiEvent(cmd, args);
    }
  }


}

__window_balance.initClass();

module.exports = __window_balance;

