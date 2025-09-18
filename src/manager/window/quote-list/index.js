const __window = require('..');
const { placeholder } = require("../../widget/skeleton")
const { BLIND_CHARS, CTYPE } = require("../../utils/constants")
class window_quote_list extends __window {


  /**
   * 
   * @param {*} opt 
   */
  initialize(opt) {
    require('./skin');
    super.initialize(opt);
    this._filter = {
      date: 0,
      name: 1,
    }
    this.handleQuotesList = this.handleQuotesList.bind(this);
    RADIO_BROADCAST.on('quote-pupdate', this.handleQuotesList)
  }

  /**
   *
   */
  onPartReady(child, pn) {
    switch (pn) {
      case _a.content:
        child.feed(require('./skeleton/list')(this));
        break;
      case _a.list:
        child.on(_e.data, this._onDataReceived);
        this.list = child;
        break;
      default:
        super.onPartReady(child, pn)
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
    this.loadQuotesList();
  }

  /**
   * 
   */
  onBeforeDestroy() {
    RADIO_BROADCAST.on('quote-pupdate', this.handleQuotesList)
    super.onBeforeDestroy();
  }
  /**
   * 
   */
  handleQuotesList(data) {
    let item = this.__list.getItemsByAttr(_a.id, data.id)[0];
    if (!item) {
      this.__list.prepend({
        ...data, kind: 'poc_item',
        uiHandler: [this],
        service: "update-poc",
        mode: "editable"
      })
    } else {
      item.mset(data);
      item.onDomRefresh();
    }
  }

  /**
  * 
  * @param {*} cmd 
  */
  loadQuotesList(filter) {
    let api = {
      service: PLUGINS.quote.list,
      args: {
        type: 'site'
      }
    };
    let itemsOpt = {
      kind: 'quote_item',
      uiHandler: [this],
      service: "update-quote",
      mode: "editable"
    }
    if (filter) api.args = { ...api.args, ...filter };
    this.feedList(api, itemsOpt, (list) => {
      list.model.unset(_a.itemsOpt)
      list.feed(placeholder(this, {
        labels: ["Aucun devis pour le moment"],
      }));
    })
  }

  /**
   * 
   * @returns 
   */
  getCurrentApi() {
    if (!this._api) {
      this._api = {
        service: PLUGINS.quote.list,
        args: {
          type: "site",
          filter: [{ name: "custName", value: 'asc' }]
        }
      }
    }
    return this._api;
  }

  /**
   * 
   */
  async searchQuote(cmd) {
    let order, name;
    if (cmd) {
      name = cmd.mget(_a.name);
      if (BLIND_CHARS.includes(cmd.status)) return;
      //order = cmd.mget(_a.state) ? "asc" : "desc";
    }
    if (!name) return;
    if (cmd.getValue) {
      this._api.args[name] = cmd.getValue();
    }
    if (/^[0-9]+ /.test(this._api.args[name]) && name == _a.street) {
      let a = this._api.args[name].split(/ +/)
      this._api.args.housenumber = a.shift();
      this._api.args.street = a.join(' ');
    } else {
      let form = await this.ensurePart("search-box")
      let { street } = form.getData();
      if (!street) delete this._api.args.housenumber;
      this.debug("AAA:137", form.getData())
    }
    this
    this.ensurePart(_a.list).then((list) => {
      list.mset({ api: this._api });
      list.restart();
    })
  }

  /**
  * 
  */
  async promptQuote(cmd) {
    let {
      siteId, custId, pocId, phones, email, customer, role, gender, firstname, lastname
    } = cmd.model.toJSON();
    this.loadWidget({
      kind: 'form_poc',
      customer,
      id: `poc-form-${this.mget(_a.id)}`,
      uiHandler: [this],
      pocId,
      custId,
      siteId,
      phones,
      role,
      gender,
      email,
      firstname,
      lastname,
      service: "poc-created"
    })
  }


  /**
    * 
    */
  async updateQuoteItem(cmd, args) {
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
    this.debug(`AAA:97XXX onUiEvent=${service}`, cmd, args, this);
    switch (service) {
      case 'quote-created':
        this.loadNotesList(cmd)
        break;
      case _e.reset:
        this.resetEntries("street-entry", "city-entry", "postcode-entry", "custname-entry");
        this.loadQuotesList();
        break;
      case "sort":
        this.loadQuotesList(await this.getSortOptions(null, [_a.lastname, _a.ctime]));
        break;
      case _a.search:
      case _e.input:
        if (BLIND_CHARS.includes(cmd.status)) return;
        this.throtle(cmd).then(() => {
          this.searchQuote(cmd);
        })
        break;
      case "update-quote":
        let kind = "form_bill";
        if (cmd.mget(_a.category) == 'customer') {
          kind = "form_customer_poc";
        }
        this.loadWidget({
          ...cmd.data(),
          kind,
        })

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


module.exports = window_quote_list;

