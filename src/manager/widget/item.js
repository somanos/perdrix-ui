require('./form/skin');

const { placeholder } = require("./skeleton")
const { dataTransfer } = require("../utils")

class __item_core extends LetcBox {
  /**
   * 
   */
  initialize(opt = {}) {
    super.initialize(opt);
    this.declareHandlers();
  }

  static initClass() {
    this.prototype.events = {
      drop: 'fileDropped',
      dragenter: 'fileDragEnter',
      dragleave: 'fileDragLeave',
      dragover: 'fileDragOver'
    };
  }

  /**
 *
 * @param {*} e
 */
  fileDropped(e) {
    let { folders, files } = dataTransfer(e);
    if (folders?.length) {
      Wm.alert("Les dossiers ne sont pas accepés comme pièces jointes");
    }
    this.ensurePart("attachment").then((p) => {
      this.debug("AAA:26, fileDropped", this, p)
      p.sendFiles(e, this.mget('parentDir'))
    })
    this.el.dataset.dragover = "0";
    // let { parentDir: ownpath } = this.model.toJSON()
    //this.postService(SERVICE.media.make_dir,{ownpath}).then(())
    // this.uploadFiles(files);
    // this.debug("AAA:26, fileDropped", e)
    // e.stopPropagation();
    // e.stopImmediatePropagation();
    return false;
  }



  /**
   *
   * @param {*} e
   */
  fileDragEnter(e) {
    this.debug("AAA:36, fileDragEnter", e)
  }

  /**
   *
   * @param {*} e
   */
  fileDragLeave(e) {
    this.debug("AAA:36, fileDragLeave", e)
    this.el.dataset.dragover = "0";
  }

  /**
   *
   * @param {*} e
   */
  fileDragOver(e) {
    this.debug("AAA:44, fileDragOver", e)
    this.el.dataset.dragover = "1";
  }


}

__item_core.initClass();
module.exports = __item_core
