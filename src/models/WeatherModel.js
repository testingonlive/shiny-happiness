import EventEmitterMixin from '../mixins/EventEmitter';
import '../polyfills/Object.assign.js';

function copy( obj ) {
    return Object.assign( {}, obj );
}

var WeatherModel = function() {
    var store = {};

    this.set = function( obj ) {
        Object.keys( obj ).forEach(function( key ) {
            store[key] = obj[key];
        })

        this.trigger( 'update', copy( store ) );
    }

    this.get = function( key ) {
        return store[ key ];
    }
};

EventEmitterMixin(WeatherModel.prototype);

export default WeatherModel;
