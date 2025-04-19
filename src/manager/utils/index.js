const { placeholder } = require("../widget/skeleton/widgets")
const { address } = require("../widget/skeleton/entries")

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
      location[1] = location[1].ucFirst()
    }
    place = location.join(' ');
  } else if (_.isString(location)) {
    place = location;
  }
  return place;
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
  return `${(v * 100).toFixed(2, 2)}%`
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
export async function feedList(api, itemsOpt, onEmpty) {
  let list = await this.ensurePart(_a.list);
  list.model.unset(_a.itemsOpt)
  list.mset({
    api,
    itemsOpt,
    spinnerWait: 1000,
    spinner: true,
  });
  list.trigger(_e.eod); //** Flush old listeningxs */
  list.restart();
  list.once(_e.data, async (data) => {
    if (_.isEmpty(data)) {
      return onEmpty(list);
    }
  })
  list.once(_e.eod, async (e) => {
    if (list.isNaturalyEmpty()) {
      onEmpty(list);
    }
  });

  list.once(_e.error, async () => {
    onEmpty(list);
  });

  this.changeDataset(_a.footer, _a.state, 1);

}


/**
 * 
 */
export async function clearList() {
  let p = await this.ensurePart(_a.list);
  p.clear();
  p = await this.ensurePart(_a.footer);
  p.el.dataset.state = 0;
}

/**
 * 
 */
export function loadWidget(opt, hide = 0) {
  Wm.windowsLayer.append(opt);
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
}

/**
* 
*/
export async function prompLocation(extendex = 0) {
  await this.clearList();
  let p = await this.ensurePart("entries-manual");
  p.feed(address(this, { extendex }));
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
    if (!cmd || !cmd.getValue) return;
    if (this._timer[cmd.cid]) {
      clearTimeout(this._timer[cmd.cid])
    }
    this._timer[cmd.cid] = setTimeout(async () => {
      await will(cmd, wrapper);
      this._timer[cmd.cid] = null;
    }, 1000)
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
  p.feed(address(this, { street, city, housenumber, postcode, extended }));
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
export async function loadWorkList(opt) {
  let api = {
    service: "work.list",
    custId: this.mget('custId'),
  };
  let itemsOpt = {
    ...opt,
    kind: 'work_item',
    uiHandler: [this],
  }
  this.changeDataset("entries-manual", _a.state, 1)
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
 * @param {*} opt 
 */
export async function selectWork(cmd) {
  this.mset({
    siteId: cmd.mget('siteId'),
    category: cmd.mget(_a.type),
    workId: cmd.mget(_a.id),
  })

  this.ensurePart("entries-manual").then((p) => {
    let args = {
      ...cmd.data(),
      format: _a.small,
      kind: 'work_item',
      uiHandler: [this],
    }
    p.feed(args)
  })
  this.changeDataset("go-btn", _a.state, 1)
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

