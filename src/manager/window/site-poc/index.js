const __window = require('..');
const { placeholder } = require("../../widget/skeleton")
const { searchPoc } = require("../../utils");

class __window_site_poc extends __window {

  constructor(...args) {
    super(...args);
    this.searchPoc = searchPoc.bind(this);
  }

  async initialize(opt) {
    require('./skin');
    super.initialize(opt);
    this._filter = {
      date: 0,
      name: 1,
    }
    this.handlePocsList = this.handlePocsList.bind(this);
    RADIO_BROADCAST.on('site-poc-pupdate', this.handlePocsList)
  }


  /**
   * 
   */
  onDomRefresh() {
    super.onDomRefresh();
    this.feed(require('./skeleton')(this));
    this.setupInteract();
    this.raise();
    this.loadPocList();
  }

  /**
   * 
   */
  onBeforeDestroy() {
    RADIO_BROADCAST.on('site-poc-pupdate', this.handlePocsList)
    super.onBeforeDestroy();
  }
  /**
   * 
   */
  handlePocsList(data) {
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
  loadPocList(filter) {
    let api = {
      service: PLUGINS.poc.list,
      args: {
        type: 'site'
      }
    };
    let itemsOpt = {
      kind: 'poc_item',
      uiHandler: [this],
      service: "update-poc",
      mode: "editable"
    }
    if (filter) api.args = { ...api.args, ...filter };
    this.debug("AAA:39", filter)
    this.feedList(api, itemsOpt, (list) => {
      list.model.unset(_a.itemsOpt)
      list.feed(placeholder(this, {
        labels: ["Aucun contact pour le moment"],
      }));
    })
  }


  /**
  * 
  */
  async promptPoc(cmd) {
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
  async updatePocItem(cmd, args) {
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
      case 'poc-created':
        this.loadNotesList(cmd)
        break;
      case "sort":
        this.loadPocList(await this.getSortOptions(null, [_a.lastname, _a.ctime]));
        break;
      case _a.search:
        let lastname = cmd.getValue();
        if (!lastname) {
          this.loadPocList();
          return;
        };
        this.loadPocList({ lastname });
        break;
      case "update-poc":
        let kind = "form_site_poc";
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


module.exports = __window_site_poc;

