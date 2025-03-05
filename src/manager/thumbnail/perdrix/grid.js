// ==================================================================== *
//   Copyright Xialia.com  2011-2019
//   FILE : desk/media/core
//   TYPE : 
// ==================================================================== *


//require('./skin');
const __thumbnail = require('../grid');
class __thumbnail_perdrix_grid extends __thumbnail {


  /**
   * @param {Letc} cmd
   * @param {Object} args
  */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.service || cmd.mget(_a.service);
    this.debug(`AAA:19 service=${service}`, cmd, args)
  }



}

module.exports = __thumbnail_perdrix_grid;

