// const { placeholder} = require("../widget/skeleton/widgets")
const { fiscalBox, placeholder, contextBar, address, pocsList } = require("../widget/skeleton")
let FISCAL_YEARS;
const { BLIND_CHARS, SITE_ID, CUST_ID } = require("./constants")
const commaNumber = require('comma-number')
/**
 * 
 * @param {*} v 
 * @returns 
 */
export function px(v) {
  return `${v}px`
}

export function normalizelLocation(location) {
  let place = '';
  if (_.isArray(location)) {
    if (location[1]) {
      location[1] = location[1].toLocaleLowerCase()
    }
    place = location.join(' ');
  } else if (_.isString(location)) {
    place = location;
  }
  return place;
}

/**
 * 
 * @param {*} location 
 * @returns 
 */
export function getLocationFields(location) {
  let res = {
    streettype: "",
    streetname: "",
    //additional: ""
  };
  if (_.isArray(location)) {
    res.housenumber = location[0];
    res.streettype = location[1];
    res.streetname = location[2];
    res.additional = location[3];
  }
  return res;
}

/**
 * 
 * @param {*} location 
 * @returns 
 */
export function getLocationText(a) {
  if (_.isArray(a)) {
    return a.join(' ')
  } else if (_.isObject(a)) {
    return [a.housenumber, a.streettype, a.streetname, a.additional].join(' ')
  }
  return a;
}

/**
 * 
 * @param {*} v 
 * @returns 
 */
export function fromUnixtime(time) {
  return new Date(time * 1000).toLocaleDateString(Visitor.language())
}

/**
 * 
 * @param {*} v 
 * @returns 
 */
export function devise(v) {
  return `${v} €`
}

/**
 * 
 * @param {*} v 
 * @returns 
 */
export function vat(v) {
  v = parseFloat(v)
  if (v <= 1) {
    v = v * 100
  }
  return `${v.toFixed(2, 2)}`
}

/**
 * 
 * @param {*} v 
 * @returns 
 */
export function phoneNumbersObject(phones) {
  let i = 0;
  let r = {};
  if (!phones || !phones.length) return r;
  for (let key of ['office', _a.home, _a.mobile, 'fax']) {
    r[key] = phones[i];
    i++;
  }
  return r;
}

/**
 * 
 * @param {*} name 
 * @returns 
 */
export function modelComparator(name) {
  return function modelComparator(model) {
    let v = model.get(name);
    if (v.toLowerCase) {
      return v.toLowerCase();
    }
    return v;
  }
}

/**
 * 
 * @param {*} sortByFunction 
 * @returns 
 */
export function reverseSortBy(sortByFunction) {
  return function (left, right) {
    var l = sortByFunction(left);
    var r = sortByFunction(right);

    if (l === void 0) return -1;
    if (r === void 0) return 1;

    return l < r ? 1 : l > r ? -1 : 0;
  };
}


/**
 * 
 */
export async function feedList(api, itemsOpt, onEmpty, onData) {
  let list = await this.ensurePart(_a.list);
  list.model.unset(_a.itemsOpt)
  list.mset({
    api,
    itemsOpt,
    spinner: true,
  });
  list.restart();
  list.once(_e.data, async (data) => {
    if (_.isEmpty(data) && _.isFunction(onEmpty)) {
      return onEmpty(list);
    }
    if (_.isFunction(onData)) {
      return onData(data)
    }
  })
  list.once(_e.eod, async (e) => {
    if (list.isNaturalyEmpty() && _.isFunction(onEmpty)) {
      onEmpty(list);
    }
  });

  list.once(_e.error, async () => {
    if (_.isFunction(onEmpty)) {
      onEmpty(list);
    }
  });

  this.changeDataset(_a.footer, _a.state, 1);

}


/**
 * 
 */
export async function clearList(part = _a.footer) {
  let p = await this.ensurePart(_a.list);
  p.clear();
  p = await this.ensurePart(part);
  p.el.dataset.state = 0;
}

/**
 * 
 */
export function loadWidget(opt, hide = 0) {
  Wm.addWindow(opt);
  let w = Wm.windowsLayer.children.last();
  setTimeout(() => {
    if (w && w.raise) w.raise();
    if (hide) this.hide();
  }, 500)
  return w;
}

/**
 * 
 */
export async function changeDataset(name, attr, val) {
  let p = await this.ensurePart(name);
  p.el.dataset[attr] = val;
  return p;
}

/**
* 
*/
export async function promptLocation(extendex = 0) {
  await this.clearList();
  let p = await this.ensurePart("entries-manual");
  p.feed(address(this, { extendex }));
}

/**
  * 
  */
export async function promptPoc(cmd) {
  let { siteId, custId } = this.model.toJSON();
  this.loadWidget({
    kind: 'form_poc',
    customer: this.mget('customer'),
    id: `poc-form-${this.mget(_a.id)}`,
    uiHandler: [this],
    custId,
    siteId,
    service: "poc-created"
  })
}

/**
 * 
 */
export async function loadPocsList() {
  let p = await this.ensurePart("entries-manual");
  p.el.dataset.state = 1;
  let list = await this.ensurePart(_a.list);
  list.model.unset(_a.itemsOpt)
  list.feed(pocsList(this))
}

/**
 * 
 */
export async function searchLocation(cmd, wrapper) {
  let words = cmd.getValue() || "";
  let { length } = words.split(/[ ,]+/)
  let api = {
    service: "pdx_utils.search_location",
    words,
  };
  let itemsOpt = {
    kind: 'location_item',
    service: 'select-address',
    uiHandler: [this]
  }

  return new Promise(async (will, wont) => {
    if (length <= 2 && words.length < 5) return will(null);
    this.feedList(api, itemsOpt, (list) => {
      list.model.unset(_a.itemsOpt)
      list.feed(placeholder(this));
    })
  })
}


/**
  * 
  */
export function throtle(cmd, wrapper) {
  return new Promise((will, wont) => {
    if (typeof this._timer !== 'object') this._timer = {}
    if (!cmd || !cmd.getValue) return;
    if (this._timer[cmd.cid]) {
      clearTimeout(this._timer[cmd.cid])
    }
    this._timer[cmd.cid] = setTimeout(async () => {
      await will(cmd, wrapper);
      this._timer[cmd.cid] = null;
    }, 500)
  })
}

/**
* 
*/
export async function addressSelected(cmd, extended = 0) {
  await this.clearList();
  let p = await this.ensurePart("entries-manual");
  this._data['properties'] = cmd.mget('properties');
  const {
    street, city, housenumber, postcode, label
  } = this._data['properties'] || {};
  this._locationCompleted = 1;
  let addr = await this.ensurePart("address-entry");
  addr.setValue(label)
  let isUpdate = this.mget('isUpdate');
  let serviceLabel;
  let service = _e.create;
  if (isUpdate) {
    serviceLabel = LOCALE.UPDATE;
    service = _e.update;
  }
  p.feed(address(this, {
    street, city, housenumber,
    postcode, extended,
    isUpdate, serviceLabel,
    service
  }));
}

/**
 * 
 */
export function itemMenuSelected(cmd) {
  this.ensurePart("menu-trigger").then((p) => {
    p.setLabel(cmd.mget(_a.label));
    this._data[cmd.mget(_a.name)] = cmd.mget(_a.value)
  })
}

/**
 * 
 * @param {*} opt 
 */
export async function loadWorkList(opt, filter) {
  let api = {
    service: PLUGINS.work.list,
    args: {
      custId: this.mget(CUST_ID),
      siteId: this.mget(SITE_ID),
      sort_by: _a.ctime,
      order: "desc"
    }
  };
  if (filter) api.filter = filter;
  let itemsOpt = {
    ...opt,
    service: "mission-hitsory",
    kind: 'mission_item',
    uiHandler: [this],
  }
  this.changeDataset("entries-manual", _a.state, 1)
  this.feedList(api, itemsOpt, (list) => {
    list.model.unset(_a.itemsOpt)
    list.feed(placeholder(this, {
      labels: ["Pas encore de mission à cette adress", "Créer une mission"],
      service: "create-mission"
    }));
  })
}

/**
 * 
 */
export async function loadMissionWindow(data) {
  await Kind.waitFor('window_mission')
  this.loadWidget({
    ...data,
    kind: 'window_mission',
    id: `mission-${data.custId}`,
    uiHandler: [this],
  })
}

/**
 * 
 * @param {*} opt 
 */
export async function selectWork(cmd) {
  this.mset({
    siteId: cmd.mget(SITE_ID),
    category: cmd.mget(_a.type),
    workId: cmd.mget(_a.id),
  })

  this.ensurePart("entries-manual").then((p) => {
    let args = {
      ...cmd.data(),
      format: _a.small,
      kind: 'mission_item',
      uiHandler: [this],
    }
    p.feed(args)
  })
  this.changeDataset("go-btn", _a.state, 1)
}



/**
 * 
 */
export function loadCustomerWindow(cmd) {
  const { custId } = cmd.model.toJSON();
  Wm.windowsLayer.append({
    kind: 'window_customer',
    id: `customer-${custId}`,
    ...cmd.data(),
  });
  setTimeout(() => {
    let w = Wm.windowsLayer.children.last();
    if (w && w.raise) w.raise()
  }, 1000)
}


/**
 * 
 */
export function loadAddressWindow(address) {
  let id = `address-${address.addressId}`;
  let existing = Wm.getItemsByAttr(_a.id, id)[0];
  if (existing) {
    setTimeout(() => {
      existing.raise();
    }, 500)
    return
  }
  Wm.windowsLayer.append({
    kind: 'window_address_browser',
    ...address,
    id,
  });
  setTimeout(() => {
    let w = Wm.windowsLayer.children.last();
    if (w && w.raise) w.raise()
  }, 500)
}

/**
  * 
  */
export function updateAmount() {
  let data = this.getData()
  let ht = parseFloat(data.ht) || 0;
  let tva = parseFloat(data.tva) || 0;
  let discount = parseFloat(data.discount) || 0;
  let ttc = (ht + ht / 100 * tva - discount).toFixed(2);
  if (ttc != null) {
    this.ensurePart('ttc').then((p) => {
      p.setValue(ttc.toString())
    })
  }
}

/**
  * 
  */
export async function promptSite(data) {
  this.loadWidget({
    ...data,
    id: `site-form-${data.custId}`,
    uiHandler: [this],
    callbackService: "site-created",
    kind: 'form_site',
  })
}

/**
  * 
  */
export async function promptMission(data) {
  this.loadWidget({
    ...data,
    kind: 'form_mission',
    id: `mission-form-${data.custId}`,
    uiHandler: [this]
  })
}


/**
* 
*/
export async function getSortOptions(cmd, parts, reorder = 1) {
  if (!parts) return null;
  let source = []
  let f = []
  for (let p of parts) {
    let el = await this.ensurePart(p);
    source.push(el);
    if (!reorder) {
      f.push({ name: el.mget(_a.name), value: el.getState() ? "asc" : "desc" })
    }
  }
  if (f.length) return f;
  let filers = [];
  if (cmd) filers = [cmd];
  for (let w of source) {
    if (w === cmd) {
      continue
    }
    filers.push(w)
  }
  for (let el of filers) {
    f.push({ name: el.mget(_a.name), value: el.getState() ? "asc" : "desc" })
  }
  return f
}

/**
* 
*/
export function searchPoc(cmd, k) {
  let lastname = cmd.getValue();
  let key = cmd.mget(_a.name) || k;
  let api = {
    service: PLUGINS.poc.list,
    args: {
      lastname,
      key,
    }
  };
  let itemsOpt = {
    kind: 'poc_item',
    origin: 'searchbox',
    service: "select-poc",
    uiHandler: [this]
  }

  return new Promise((will, wont) => {
    if (!lastname || !lastname.length) return will();
    this.feedList(api, itemsOpt, (data) => {
    })
  })
}

/**
* 
*/
export function searchSitePoc(cmd, k) {
  let words = cmd.getValue();
  let key = cmd.mget(_a.name) || k;
  let api = {
    service: PLUGINS.poc.search,
    type: 'site',
    words,
    key
  };
  let itemsOpt = {
    kind: 'poc_item',
    origin: 'searchbox',
    service: "select-poc",
    uiHandler: [this]
  }

  return new Promise((will, wont) => {
    if (!words || !words.length) return will();
    this.feedList(api, itemsOpt, (data) => {
    })
  })
}

/**
 * 
 */
export function isBlindChar(cmd) {
  return BLIND_CHARS.includes(cmd.status)
}

/**
 * 
 */
export async function searchWithAddress(cmd) {
  let name;
  if (cmd) {
    name = cmd.mget(_a.name);
    if (BLIND_CHARS.includes(cmd.status)) return;
  }
  if (!name) return;
  if (cmd.getValue) {
    this._api.args[name] = cmd.getValue().trim();
    this._api.args[name] = this._api.args[name].replace(/\*/g, '')
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
  this.ensurePart(_a.list).then((list) => {
    list.mset({ api: this._api });
    list.restart();
  })
}

/**
* 
*/
export async function loadSitePocs(cmd) {
  let api = {
    service: PLUGINS.poc.list,
    args: { addressId: this.mget('addressId') },
  };
  let itemsOpt = {
    kind: 'poc_item',
    uiHandler: [this]
  }
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
export function showMessage(m, timeout = 3000) {
  this.ensurePart("message-block").then((p) => {
    p.feed(Skeletons.Note(m))
    setTimeout(() => {
      p.clear()
    }, timeout)
  })
}

/**
 * 
 */
export async function viewDoc(data = {}) {
  if (!data.nid || !data.hub_id) {
    this.warn("Missing nid or hub_id", data);
    return
  }
  let Media = await Kind.waitFor('media_pseudo');
  if (!data.filename && data.filepath) {
    let a = data.filepath.split(/\/+/);
    let fname = a.pop();
    let n = fname.split('.');
    if (n.length > 1) {
      data.ext = n.pop();
      data.filename = n.join('') + '.' + data.ext;
    } else {
      data.filename = n.join('');
    }
  }
  let media = new Media(data);
  let args = { kind: "document_reader", media }
  this.loadWidget(args)
}


/**
 * Duplicated from Drumee/core/utils
 * @param {*} e 
 * @returns 
 */
export function dataTransfer(e) {
  let item;
  let res = { folders: [], files: [] };
  switch (e.type) {
    case _e.drop:
      var dt = e.originalEvent.dataTransfer;
      if (dt == null) {
        return res;
      }
      var items = dt.items || dt.files || [];

      var folders = [];
      var entries = [];
      var files = [];

      for (item of Array.from(items)) {
        if (_.isFunction(item.getAsEntry)) {
          entries.push(item.getAsEntry());
        } else if (_.isFunction(item.webkitGetAsEntry)) {
          entries.push(item.webkitGetAsEntry());
        }
      }

      for (let entry of Array.from(entries)) {
        if (entry && entry.isDirectory) {
          folders.push(entry);
        } else if (entry && entry.isFile) {
          files.push(entry);
        }
      }
      res = { folders, files };
      break;
    case _e.change:
      items = e.target.items || [];
      files = e.target.files || [];
      folders = [];
      for (item of Array.from(items)) {
        if (_.isFunction(item.getAsEntry)) {
          folders.push(item.getAsEntry());
        } else if (_.isFunction(item.webkitGetAsEntry)) {
          folders.push(item.webkitGetAsEntry());
        }
      }
      res = { folders, files };
      break;
    default:
      console.warn("Got wrong type", e);
  }
  return res;
}

/**
* 
* @param {*} cmd 
*/
export function updateBalance(cmd, opt) {
  let fiscalYear = cmd.mget(_a.name);
  let { type, custId, siteId } = opt;
  custId = custId || this.mget(CUST_ID);
  siteId = siteId || this.mget(SITE_ID);
  let api = {
    service: `${type}.balance`,
  };
  if (/[0-9]{4,4}/.test(fiscalYear)) {
    api.fiscalYear = fiscalYear;
  } else if (/^(status)$/.test(fiscalYear)) {
    api.status = 1;
  }
  if (custId) {
    api.custId = custId;
  }
  if (siteId) {
    api.siteId = siteId;
  }
  this.postService(`${type}.balance`, api).then((data) => {
    let { ht, ttc } = data || {}
    this.ensurePart('amount_ht').then((p) => {
      p.set({ content: commaNumber(ht, ' ', '.') })
    })
    this.ensurePart('amount_ttc').then((p) => {
      p.set({ content: commaNumber(ttc, ' ', '.') })
    })
  })
}

/**
 * 
 */
export async function loadSalesList(cmd, opt = {}) {
  let fiscalYear = cmd.mget(_a.name);
  let { type, custId, siteId } = opt;
  custId = custId || this.mget(CUST_ID);
  siteId = siteId || this.mget(SITE_ID);
  if (!/^(quote|bill)$/.test(type)) {
    this.warn(`Requires type to be quote or bill`)
    return;
  }
  let api = {
    service: `${type}.list`,
  };
  let args = {};
  if (/[0-9]{4,4}/.test(fiscalYear)) {
    args.fiscalYear = fiscalYear;
  } else if (/^(status)$/.test(fiscalYear)) {
    args.status = 1;
  }
  if (custId) {
    args.custId = custId;
  }
  if (siteId) {
    args.siteId = siteId;
  }
  api.args = args;

  let itemsOpt = {
    kind: `${type}_item`,
    uiHandler: [this]
  }
  this.feedList(api, itemsOpt, (list) => {
    list.model.unset(_a.itemsOpt)
    list.feed(placeholder(this, {
      labels: ["Aucun élément trouvé"],
    }));
  })
}

/**
 * 
 * @param {*} cmd 
 */
export async function loadSalesHistory(cmd, opt = {}) {
  if (!FISCAL_YEARS) {
    FISCAL_YEARS = await this.fetchService("pdx_utils.fiscal_years");
    FISCAL_YEARS.unshift({ name: _a.all, content: "Toutes les années" });
    FISCAL_YEARS.unshift({ name: _a.status, content: "Non soldées" });
  }
  let context = opt.salesbox || await this.ensurePart("context-bar");
  context.feed(contextBar(this, fiscalBox(this, FISCAL_YEARS)));
  this.loadSalesList(cmd, opt);
  this.updateBalance(cmd, opt);
  const content = cmd.mget(_a.content);
  if (!content) return;
  this.ensurePart('current-fyear').then((p) => {
    p.set({ content })
  })
}
