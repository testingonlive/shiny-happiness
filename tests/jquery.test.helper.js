import jsdom from 'jsdom';

var doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
var win = doc.defaultView;

global.document = doc;
global.window = win;

global.$ = global.jQuery = require('jquery')(win);

Object.keys(window).forEach(function(key) {
    if (!(key in global)) {
        global[key] = window[key];
    }
});
