
export function px(v){
  return `${v}px`
}

/**
 * 
 * @param {*} name 
 * @returns 
 */
export function modelComparator(name) {
  return function modelComparator (model) {
    let v = model.get(name);
    if(v.toLowerCase){
      return v.toLowerCase();
    }
    return v;
  }
}

/**
 * 
 * @param {*} sortByFunction 
 * @returns 
 */
export function reverseSortBy(sortByFunction) {
  return function (left, right) {
    var l = sortByFunction(left);
    var r = sortByFunction(right);

    if (l === void 0) return -1;
    if (r === void 0) return 1;

    return l < r ? 1 : l > r ? -1 : 0;
  };
}
