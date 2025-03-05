/* ==================================================================== *
 *   Copyright Xialia.com  2011-2020
 *   FILE : /home/somanos/devel/ui/letc/template/index.coffee
 *   TYPE : Component
 * ==================================================================== */

/**
 * Class representing a ___widget_dock_minifier
 * @class
 * @extends LetcBox
 */
class ___widget_dock_minifier extends LetcBox {


  static initClass() {
    this.prototype.fig = 1;
    this.prototype.bhv_socket = 1;
  }


  /**
   * Create a ___widget_dock_minifier.
   * @param {object} opt - parameters 
   */
  initialize(opt = {}) {
    // @ts-ignore
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
    // this.onMinify = this.onMinify.bind(this)
    Wm.$el.on(_e.minimize, this.onMinify.bind(this));
    //Wm.$el.on(_e.minimize, () => {console.log('called')});
    this.minimizedCount = 0;
  }

  /* ===========================================================
   *
   * ===========================================================*/
  onPartReady(child, pn) {
    switch (pn) {
      case _a.none:
        this.debug("Created by kind builder", child);
      case _a.list: 
        // this.__list.collection.on('change reset add remove', () => this.updateDockMinifier.bind(this));
        break;
        // default:
        // super.onPartReady(child, pn, section);
    }
  }

  /* ===========================================================
   *
   * ===========================================================*/
  onDomRefresh() {
    this.feed(require('./skeleton').default(this));
  }

  /* ===========================================================
   *
   * ===========================================================*/
  onUiEvent(cmd, args = {}) {
    const service = cmd.get(_a.service) || cmd.get(_a.name);
    this.debug(`onUiEvent service = ${service}`, cmd, this);

    switch (service) {
      case 'wake-node':
        cmd.mget(_a.source).wake(cmd);
        return cmd.selfDestroy({
          now: true,
          callback: this.updateDockMinifier.bind(this),
        });
        
      case 'remove-minifyer':
        cmd.mget(_a.source).goodbye();
        return cmd.selfDestroy({
          now: true,
          callback: this.updateDockMinifier.bind(this),
        });
      
      default:
        this.debug("Created by kind builder");
    }
  }

  /**
   * @param  {} instance
   */
  onMinify(event ,winInstance) {
    this.debug('onMinify',winInstance,this.__list);
    const itemsOpt = this.__list.mget(_a.itemsOpt);
    if(!winInstance.mget(_a.media)) return;
    let data = winInstance.mget(_a.media).model.toJSON()
    if (winInstance.mget(_a.filetype) == _a.image) {
      data = winInstance.media.model.toJSON()
    }
    delete data.uiHandler;
    const newMinWindow = {
        source: winInstance,
      ...data,
      ...itemsOpt
    }

    this.__list.prepend(newMinWindow)
    this.updateDockMinifier();
  }

  /**
   * 
   * @param {*} a 
   * @param {*} b 
   */
  updateDockMinifier(a,b) {
    let length = this.__list.collection.length; 
    this.minimizedCount = length;
    this.__counter.set('content',length)
    if(length){
      this.getPart('dock-minifier-wrapper').el.dataset.state = _a.open;
    }else{
      this.getPart('dock-minifier-wrapper').el.dataset.state = _a.closed;
      this.$el.click()
    }
  }

  /* ===========================================================
   *
   * ===========================================================*/
  __dispatchPush(service, data, socket) {
    switch (service) {
      case _SVC.no_service:
        this.debug("Created by kind builder", service, data)
    }
  }

  /* ===========================================================
   *
   * ===========================================================*/
  __dispatchRest(service, data, socket) {
    switch (service) {
      case _SVC.no_service:
        this.debug("Created by kind builder", service, data)
    }
  }
}


___widget_dock_minifier.initClass()

module.exports = ___widget_dock_minifier
