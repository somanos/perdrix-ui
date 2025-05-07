require('./skin');
const {
  feedList, clearList, loadWidget, changeDataset, loadWorkList,
  prompLocation, searchLocation, throtle, addressSelected, promptSite, loadSitePocs,
  itemMenuSelected, selectWork, updateAmount, loadMissionWindow, getSortOptions,
  showMessage, viewDoc
} = require("./utils")

class __form_core extends DrumeeInteractWindow {
  constructor(...args) {
    super(...args);
    this.feedList = feedList.bind(this);
    this.clearList = clearList.bind(this);
    this.loadWidget = loadWidget.bind(this);
    this.changeDataset = changeDataset.bind(this);
    this.prompLocation = prompLocation.bind(this);
    this.searchLocation = searchLocation.bind(this);
    this.throtle = throtle.bind(this);
    this.addressSelected = addressSelected.bind(this);
    this.itemMenuSelected = itemMenuSelected.bind(this);
    this.loadWorkList = loadWorkList.bind(this);
    this.selectWork = selectWork.bind(this);
    this.updateAmount = updateAmount.bind(this);
    this.promptSite = promptSite.bind(this);
    this.loadMissionWindow = loadMissionWindow.bind(this);
    this.getSortOptions = getSortOptions.bind(this);
    this.loadSitePocs = loadSitePocs.bind(this);
    this.showMessage = showMessage.bind(this);
    this.viewDoc = viewDoc.bind(this);
  }

  /**
   * 
   */
  initialize(opt = {}) {
    super.initialize(opt);
    this.declareHandlers();
    this._timer = {}
    this._data = {}
  }

  /**
   * 
   */
  onPartReady(child, pn) {
    switch (pn) {
      case "topbar":
        this.raise();
        this.setupInteract();
        break;
      case "wrapper-dialog":
        this._dialogPos = child.$el.offset()
        break;
    }
  }

  /**
   * 
   */
  onDomRefresh() {
    this.feed(require('./skeleton/loading')(this));
    let pos = this.$el.position();
    if (this.anti_overlap(pos)) {
      this.$el.css(pos)
    }
  }

  /**
   * 
   */
  itemMenuSelected(cmd) {
    this.ensurePart("menu-trigger").then((p) => {
      p.setLabel(cmd.mget(_a.label));
      this._data[cmd.mget(_a.name)] = cmd.mget(_a.value)
    })
  }


  /**
   * 
   */
  // async changeDataset(name, attr, val) {
  //   let p = await this.ensurePart(name);
  //   p.el.dataset[attr] = val;
  // }


  /**
   * 
   */
  // async feedList(api, itemsOpt, onEmpty) {
  //   let list = await this.ensurePart(_a.list);
  //   list.model.unset(_a.itemsOpt)
  //   list.mset({ api, itemsOpt });
  //   list.restart();

  //   list.once(_e.data, async (data) => {
  //     if (_.isEmpty(data)) {
  //       return onEmpty(list);
  //     }
  //   })
  //   list.once(_e.eod, async (e) => {
  //     if (list.isNaturalyEmpty()) {
  //       onEmpty(list);
  //     }
  //   });
  //   list.once(_e.error, async () => {
  //     onEmpty(list);
  //   });
  // }


  /**
   * 
   */
  // async clearList() {
  //   let p = await this.ensurePart(_a.list);
  //   p.clear();
  //   p = await this.ensurePart(_a.footer);
  //   p.el.dataset.state = 0;
  // }

  /**
  * 
  */
  // async prompLocation(extendex = 0) {
  //   await this.clearList();
  //   let p = await this.ensurePart("entries-manual");
  //   p.feed(address(this, { extendex }));
  // }

  /**
   * 
   */
  // async searchLocation(cmd, wrapper) {
  //   let words = cmd.getValue() || "";
  //   let { length } = words.split(/[ ,]+/)
  //   let api = {
  //     service: "perdrix.search_location",
  //     words,
  //   };
  //   let itemsOpt = {
  //     kind: 'location_item',
  //     service: 'select-address'
  //   }
  //   this.debug("AAA:126", { words, length }, cmd, this)

  //   return new Promise(async (will, wont) => {
  //     if (length <= 2 && words.length < 5) return will(null);
  //     this.feedList(api, itemsOpt, (list) => {
  //       list.model.unset(_a.itemsOpt)
  //       list.feed(placeholder(this));
  //     })
  //   })
  // }


  /**
    * 
    */
  // throtle(cmd, wrapper) {
  //   return new Promise((will, wont) => {
  //     if (!cmd || !cmd.getValue) return;
  //     if (this._timer[cmd.cid]) {
  //       clearTimeout(this._timer[cmd.cid])
  //     }
  //     this._timer[cmd.cid] = setTimeout(async () => {
  //       await will(cmd, wrapper);
  //       this._timer[cmd.cid] = null;
  //     }, 1000)
  //   })
  // }

  /**
  * 
  */
  // async addressSelected(cmd, extended = 0) {
  //   await this.clearList();
  //   let p = await this.ensurePart("entries-manual");
  //   this._data['properties'] = cmd.mget('properties');
  //   const {
  //     street, city, housenumber, postcode, label
  //   } = this._data['properties'] || {};
  //   this._locationCompleted = 1;
  //   let addr = await this.ensurePart("address-entry");
  //   addr.setValue(label)
  //   p.feed(address(this, { street, city, housenumber, postcode, extended }));
  // }

  /**
   * 
   */
  // loadWidget(opt, hide = 0) {
  //   Wm.windowsLayer.append(opt);
  //   let w = Wm.windowsLayer.children.last();
  //   setTimeout(() => {
  //     if (w && w.raise) w.raise();
  //     if (hide) this.hide();
  //   }, 500)
  //   return w;
  // }
}
module.exports = __form_core
