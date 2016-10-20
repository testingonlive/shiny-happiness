import $ from 'jquery';

/**
 * function to return value at give path
 *
 * @function get
 * @param {Object} obj - the object to search through
 * @param {Array} pathArr - the path to the property
 * @return {*} deaults of undefined
 **/
/* eslint-disable no-nested-ternary */
function get(obj, pathArr) {
    return !obj ? void 0 :
        pathArr.length === 1 ? obj[pathArr[0]] :
        get(obj[pathArr[0]], pathArr.slice(1));
}
/* eslint-enable no-nested-ternary */

/**
 * Convert Celsius to Fahrenheit and visa versa
 *
 * @function tempConvert
 * @param {Object} temp - info about the temp to be converted
 * @param {Number} temp.temp - the actual temperature
 * @param {String} temp.format - the format
 * @return {Object|undefined} the converted object or undefined
 **/
/* eslint-disable no-nested-ternary */
function tempConvert(temp) {
    return temp.format === 'celsius' ? {format: 'fahrenheit', temp: (temp.temp * 9 / 5) + 32 } :
        temp.format === 'fahrenheit' ? {format: 'celsius', temp: (temp.temp - 32) * 5 / 9} :
        void 0;
}
/* eslint-enable no-nested-ternary */

/**
 * genterate a function  to render a template into the DOM
 *
 * @function templateRenderer
 * @param {String} selector - CSS selector for where the template is to be injected
 * @param {Function} viewFunc - a function returns HMTL
 * @return {Function} a function that takes a data obect as a param
**/
function templateRenderer( selector, viewFunc ) {
    return function( data ) {
        return $( selector ).html( viewFunc( data ) );
    }
}

export {
    get,
    tempConvert,
    templateRenderer
};
