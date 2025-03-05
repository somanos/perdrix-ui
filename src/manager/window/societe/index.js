const __window = require('..');
class __window_company extends __window {
  
  // ===========================================================
  //
  // ===========================================================
  async initialize(opt) {
    require('./skin');
    this.size = {
      width: 600,
      height: 450
    }
    super.initialize(opt);
    this.model.atLeast({
      widgetId   : this._id, 
      filename   : 'company',
      itemsOpt   :{
        kind : opt.currentView || 'thumbnail_perdrix_grid',
        type : 'company',
        filetype : 'company'
      }
    });
  }

  /**
   * 
   */
  onDomRefresh() {
    super.onDomRefresh();
    this.feed(require('./skeleton')(this));
    this.setupInteract();
  }

  /**
   * 
   */
  getCurrentApi(){
    return {
      service   : _SVC.enterprise.list
    }
  }

  // /**
  //  * 
  //  */
  // onPartReady(child, pn) {
  //   this.raise();
  //   switch(pn){
  //     case _a.content:
  //       child.feed(require("../skeleton/content/grid")(this));
  //       break;
  //   }
  //   //this.debug("AAA:44 55AAAAAAAAAREADY ", pn, this);
  // }


  /**
   * 
   * @param {*} args 
   */
  _acknowledge(args){
  }


 
  /**
   * 
   * @param {LetcBox}  cmd 
   * @param {object}  args 
   */
  onUiEvent(cmd, args={}) {
    const service = args.service || cmd.service || cmd.model.get(_a.service);
    this.debug(`AAA:84 company onUiEvent=${service}`, cmd, args, cmd.get(_a.state),  this);
    if(cmd.wait){
      cmd.wait(0);
    }
    switch (service) {
      case "open-node":
        Wm.launch({
          kind:'viewer_perdrix',
          domain : cmd.mget(_a.domain),
          date : cmd.mget(_a.date),
          key : cmd.mget(_a.key),
          media:cmd,
          uiHandler: this
        }, {
          explicit: 1
        });
      break;
    
      case 'create-company':
        this.debug('AAA:104: create form', this)
        this.__wrapperDialog.feed(require("./skeleton/form").default(this))

        break;

      case null:
      case undefined:
        break;
        
      default:
        super.onUiEvent(cmd, args);
    }
  }

  /**
   * To start the Meeting 
   * @param {LetcBox}  media 
   */
  showLicence(media) {
    let md = media.mget(_a.metadata);
    if(_.isString(md)){
      md = JSON.parse(md);
    }
    let meetingInfo;
    if(_.isString(md.content)){
      meetingInfo =  JSON.parse(md.content)
    }else{
      meetingInfo =  md.content;
    }


    //const md =  JSON.parse(media.mget(_a.metadata));
    //const meetingInfo =  JSON.parse(md.content)

    let opt = {
      kind: "perdrix_viewer",
    }
    this.debug('AAAAA 104', opt);
    Wm.launch(opt);
    return
  }

  /**
   * to copy  URL
   * @param {LetcBox}  media 
   */
  copyURL(media) {
    this.postService(_SVC.room.public_link, {
      hub_id: media.mget(_a.hub_id),
      nid: media.mget(_a.nid)
    }).then((data) => {
      Utils.copyToClipboard(data.link);
      this.acknowledge()
    })
    return;
  }

 


  

}

__window_company.initClass();

module.exports = __window_company;

