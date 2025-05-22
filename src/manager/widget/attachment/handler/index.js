const { dataTransfer } = require("../../../utils")

class __attachment_handler extends LetcBox {
  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.mset({ flow: _a.x })
  }


  /**
  * Upon DOM refresh, after element actually insterted into DOM
  */
  // onPartReady(child, pn) {
  //   switch (pn) {
  //     case "main":
  //       break;
  //   }
  // }


  /**
   * Upon DOM refresh, after element actually insterted into DOM
   */
  onDomRefresh() {
    this.feed(require('./skeleton')(this));
  }


  /**
   * 
   */
  sameFilename() {
    return false;
  }
  /**
   * 
   * @returns 
   */
  getViewMode() {
    return 'icon';
  }

  /**
   * 
   */
  syncOrder() {
    /** DO NOT REMOVE */
  }

  /**
*
* @param {*} e
*/
  async sendFiles(e, ownpath) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    let { folders, files } = dataTransfer(e);
    if (folders?.length) {
      Wm.alert("Les dossiers ne sont pas accepés comme pièces jointes");
    }
    let container = await this.ensurePart('main');
    let f;
    this.mset({ ownpath })
    for (f of Array.from(files)) {
      let item = {
        file: f,
        filename: f.name,
        phase: _a.upload,
        kind: "media_grid",
        logicalParent: this,
        ownpath: `${ownpath}/${f.name}`,
        destination: {
          hub_id: this.mget(_a.hub_id),
          nid: this.mget(_a.home_id),
        }
      };
      container.prepend(item);
    }
    return false;
  }

  /**
   * User Interaction Evant Handler
   * @param {View} trigger
   * @param {Object} args
   */
  onUiEvent(trigger, args = {}) {
    const service = trigger.mget(_a.service) || "open-viewer";
    trigger.wait(0)
    Wm.openContent(trigger)
  }

}

module.exports = __attachment_handler