require('./skin');
const {
  feedList, clearList, loadWidget, changeDataset, loadWorkList,
  promptLocation, searchLocation, throtle, addressSelected, promptSite, loadSitePocs,
  itemMenuSelected, selectWork, updateAmount, loadMissionWindow, getSortOptions,isBlindChar,
  showMessage, viewDoc, promptMission, promptPoc, loadPocsList, loadAddressWindow, searchWithAddress
} = require("./utils")

class __form_core extends DrumeeInteractWindow {
  constructor(...args) {
    super(...args);
    this.feedList = feedList.bind(this);
    this.clearList = clearList.bind(this);
    this.loadWidget = loadWidget.bind(this);
    this.changeDataset = changeDataset.bind(this);
    this.promptLocation = promptLocation.bind(this);
    this.searchLocation = searchLocation.bind(this);
    this.throtle = throtle.bind(this);
    this.addressSelected = addressSelected.bind(this);
    this.itemMenuSelected = itemMenuSelected.bind(this);
    this.loadWorkList = loadWorkList.bind(this);
    this.selectWork = selectWork.bind(this);
    this.updateAmount = updateAmount.bind(this);
    this.promptSite = promptSite.bind(this);
    this.promptMission = promptMission.bind(this)
    this.promptPoc = promptPoc.bind(this)
    this.loadPocsList = loadPocsList.bind(this);
    this.getSortOptions = getSortOptions.bind(this);
    this.loadSitePocs = loadSitePocs.bind(this);
    this.showMessage = showMessage.bind(this);
    this.viewDoc = viewDoc.bind(this);
    this.searchWithAddress = searchWithAddress.bind(this);
    this.isBlindChar = isBlindChar.bind(this);
    this.loadAddressWindow = loadAddressWindow.bind(this)
  }

  /**
   * 
   */
  initialize(opt = {}) {
    super.initialize(opt);
    this.declareHandlers();
    this._timer = {}
    this._data = {}
    this.loadMissionWindow = loadMissionWindow.bind(this);
  }

  /**
   * 
   */
  onPartReady(child, pn) {
    this.raise();
    switch (pn) {
      case "topbar":
        this.raise();
        this.setupInteract();
        break;
      case "wrapper-dialog":
        this._dialogPos = child.$el.offset()
        break;
      case "window-header":
        this.setupInteract();
        break;
    }
  }


  /**
   * 
   */
  hide() {
    this.el.style.display = _a.none;
    setTimeout(() => {
      this.el.style.display = _a.none;
    }, 200);
  }

  /**
   * 
   */
  show() {
    this.el.style.display = 'flex';
    setTimeout(() => {
      this.el.style.display = 'flex';
    }, 200);
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


}
module.exports = __form_core
