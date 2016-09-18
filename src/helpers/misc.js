/**
* function to return value at give path
*
* @function get
* @param {Object} obj - the object to search through
* @param {Array} pathArr - the path to the property
* @return {*} deaults of undefined
**/
/* eslint-disable no-nested-ternary */
function get( obj, pathArr ) {
  return !obj ? void 0 :
         pathArr.length === 1 ? obj[ pathArr[ 0 ] ] :
         get(obj[pathArr[0]], pathArr.slice(1));
}
/* eslint-enable no-nested-ternary */

/**
* Convert Celsius to Fahrenheit and visa versa
*
* @function tempConvert
* @param {Object} temp - single key is either 'celsius' or 'fahrenheit'
* @return {Number|undefined} result of the conversion or undefined
**/
/* eslint-disable no-nested-ternary */
function tempConvert( temp ) {
  return temp.celsius ? (temp.celsius * 9 / 5) + 32 :
         temp.fahrenheit ? (temp.fahrenheit - 32) * 5 / 9 :
         void 0;
}
/* eslint-enable no-nested-ternary */

export {get, tempConvert};
