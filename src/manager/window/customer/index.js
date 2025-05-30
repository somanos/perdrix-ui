const __window = require('..');
const {
  searchbox, placeholder, menuItem, contextBar
} = require("../../widget/skeleton")

const { updateBalance, loadSalesHistory, loadSalesList } = require("../../utils")

const CUST_ID = 'custId';

class __window_customer extends __window {
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
      city: 1,
      site: 1
    }
    this.loadSitesList = this.loadSitesList.bind(this);
    RADIO_BROADCAST.on('site-transfered', this.loadSitesList)
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
  onBeforeDestroy() {
    RADIO_BROADCAST.off('site-transfered', this.loadSitesList)
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
  async loadSitesList(filter) {
    let api = {
      service: "site.list",
      custId: this.mget(CUST_ID),
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
  searchWorks(cmd) {
    let api = {
      service: "work.search",
      words: cmd.getValue(),
      custId: this.mget(CUST_ID)
    };
    let itemsOpt = {
      kind: 'work_item',
      uiHandler: [this],
      service: "mission-hitsory"
    }
    this.feedList(api, itemsOpt, (list) => {
      list.model.unset(_a.itemsOpt)
      list.feed(placeholder(this, {
        labels: ["Aucune mission trouvée"],
      }));
    })
  }

  /**
   * 
   * @param {*} cmd 
   */
  searchSites(cmd) {
    let api = {
      service: "site.search",
      words: cmd.getValue(),
      custId: this.mget(CUST_ID)
    };
    let itemsOpt = {
      kind: 'site_item',
      uiHandler: [this]
    }
    this.feedList(api, itemsOpt, (list) => {
      list.model.unset(_a.itemsOpt)
      list.feed(placeholder(this, {
        labels: ["Aucune mission trouvée"],
      }));
    })
  }

  /**
  * 
  */
  async loadContextBar(cmd) {
    let context = await this.ensurePart("context-bar");
    let name = "work";
    if (cmd) {
      name = cmd.mget(_a.name);
    }
    let buttons;
    let state = 1;
    let service;
    let format = "normal";
    this._currentTab = name;
    switch (name) {
      case "work":
        service = 'filter-works';
        buttons = [
          menuItem(this, { sys_pn: "fdate", label: "Par date", name: 'ctime', state: 0, service }),
          menuItem(this, { sys_pn: "fcity", label: "Par ville", name: 'city', state: 1, service }),
          menuItem(this, { sys_pn: "fsite", label: "Par Chantier", name: 'siteId', state: 1, service }),
          searchbox(this, { service: "search-works" }),
          Skeletons.Button.Label({
            className: `${this.fig.family}__button-action`,
            label: "Nouvelle mission",
            ico: "editbox_list-plus",
            icons: null, service: "create-mission"
          })
        ]
        context.feed(contextBar(this, buttons));
        this.loadWorkList({ format: _a.extra }, await this.getSortOptions(null, ["fdate", "fcity", "fsite"]));
        break;
      case "site":
        service = 'filter-sites';
        buttons = [
          menuItem(this, { sys_pn: "fcity", label: "Par ville", name: 'city', state, service }),
          menuItem(this, { sys_pn: "fstreet", label: "Par rue", name: 'street', state, service }),
          menuItem(this, { sys_pn: "fhouse", label: "Par numéro", name: 'housenumber', state, service }),
          searchbox(this, { service: "search-sites" }),
          Skeletons.Button.Label({
            className: `${this.fig.family}__button-action`,
            label: "Nouveau chantier",
            ico: "editbox_list-plus",
            icons: null, service: "add-site"
          })
        ]
        context.feed(contextBar(this, buttons));
        this.loadSitesList(await this.getSortOptions(null, ["fcity", "fstreet", "fhouse"], 0));
        break;
      case "bill":
      case "quote":
        format = "auto";
        this.loadSalesHistory(cmd, { type: name, custId: this.mget(CUST_ID) })
        break;
    }
    this.ensurePart('context-bar').then((p) => {
      p.el.dataset.format = format;
    })
  }



  /**
     * 
     */
  async loadSiteWindow(site) {
    let args = site.data();
    args.customer = args.customer || this.data();
    this.loadWidget({
      kind: 'window_site',
      ...args,
      format: 'big',
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
      let c = p.getItemsByAttr('workId', data.workId)[0];
      if (c) {
        this.debug("AAAA:292", c, data)
        c.restart(data);
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
        this.loadSiteWindow(cmd)
        break;
      case "mission-hitsory":
        this.loadMissionWindow(cmd);
        break;
      case 'create-mission':
        this.loadMissionForm(cmd)
        break;
      case 'quote-created':
      case 'note-created':
      case 'bill-created':
        this.updateWorkItem(cmd, args);
        break;
      case 'load-context':
        this.loadContextBar(cmd, args);
        break;
        break;
      case 'work-created':
        this.loadWorkList({ format: _a.extra });
        break;
      case 'filter-works':
        this.loadWorkList({ format: _a.extra }, await this.getSortOptions(cmd, ["fdate", "fcity", "fsite"]));
        break;
      case 'filter-sites':
        this.loadSitesList(await this.getSortOptions(cmd, ["fcity", "fstreet", "fhouse"], 0));
        break;
      case 'filter-bill':
        this.loadBillsList()
        break;
      case 'add-site':
        this.promptSite(this)
        break;
      case "site-created":
        this.loadSitesList();
        break;
      case "search-works":
        this.searchWorks(cmd);
        break;
      case "search-sites":
        this.searchSites(cmd);
        break;
      case 'fiscal-year':
        let name = cmd.mget(_a.name);
        if (!name) break;
        this.loadSalesHistory(cmd, { type: this._currentTab, custId: this.mget(CUST_ID) })
        // this.loadBillsHistory(cmd, { custId: this.mget(CUST_ID) })
        break;
      default:
        super.onUiEvent(cmd, args);
    }
  }

}

__window_customer.initClass();

module.exports = __window_customer;

