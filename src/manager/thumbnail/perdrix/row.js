// ==================================================================== *
//   Copyright Xialia.com  2011-2019
//   FILE : desk/media/core
//   TYPE : 
// ==================================================================== *


const OPEN_NODE = "open-node";
//require('./skin');
const media_core = require('../row');
class __thumbnail_perdrix extends media_core {

  initialize(opt = {}) {
    let filename = opt.domain || opt.filename || "no name";
    this.model.set({
      filename,
      filetype: 'perdrix'
    })
    super.initialize(opt);
  }

  
  /**
* 
* @param {*} cmd 
* @param {*} args 
*/
  onUiEvent(cmd, args = {}) {

  }

}

module.exports = __thumbnail_perdrix;

