
class __location_item extends LetcBox {

  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();

  }

  /**
   * 
   * @param {View} child
   * @param {String} pn
   */
  onPartReady(child, pn) {
    //this.debug("onPartReady", child, pn);
    switch (pn) {
      case "my-part-name":
        /** Do something **/
        break;
      default:
      /** Delegate to parent if any **/
      //if(super.onPartReady) super.onPartReady(child, pn);
    }
  }

  /**
   * Upon DOM refresh, after element actually insterted into DOM
   */
  onDomRefresh() {
    this.debug("AAA:35", this)
    this.feed(require('./skeleton')(this));
  }

  /**
   * User Interaction Evant Handler
   * @param {View} trigger
   * @param {Object} args
   */
  onUiEvent(trigger, args = {}) {
    const service = this.mget(_a.service) || "open-viewer";
    this.triggerHandlers({
      service,
    })
  }


  /** Optional. 
   * uncomment and call this.bindEvent to subscribe to websocket events
   **/
  /** 
   * Websocket Service Endpoint
   * @param {String} service
   * @param {Object} options
   */
  //onWsMessage(svc, data, options={}){
  //  const {service} = options || svc;
  //  switch(service){
  //  case  "my-service":
  //      this.debug("AAA:94",service, data)
  //    break;
  //    default:
  //      /** Delegate to parent if any **/
  //      if(super.onWsMessage) super.onWsMessage(service, data, options)
  //  }
  //}
}

module.exports = __location_item