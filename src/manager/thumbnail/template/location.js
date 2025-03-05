
module.exports = function(l={}, id){
  for(let k in l){
    if(l[k] == null){
      l[k] = '';
    }
  }
  let {street_type, street_name, district, postal_code, lon, lat} = l;
  let html = '';
  if( lon && lat){
    html = `<div class="location-wrapper map">
      <div id="map-container">
    </div>`;
    // html = `<div ${style} id="location-wrapper" class="location-wrapper">
    // <div class="drumee-loading drumee-loading-wrapper"> 
    //   <div class="loader-wrapper"> 
    //     <div class="loader small"></div> 
    //     <div class="loader small"></div> 
    //     <div class="loader small"></div> 
    //     <div class="loader small"></div> 
    //     <div class="loader small"></div> 
    //     </div> 
    //   </div>
    // </div>`
  }else{
    let line1 = `${street_type} ${street_name}`;
    if(/^ +$/.test(line1)){
      html = `<div class="location-wrapper single-line">
      <div class="location-line-2">${postal_code} ${district}</div>
    </div>`;
    }else{
      html = `<div class="location-wrapper">
      <div class="location-line-1">${street_type} ${street_name}</div>
      <div class="location-line-2">${postal_code} ${district}</div>
    </div>`;
    }
  }
  return html;
};;

