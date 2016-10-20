function EventEmitter() {
    var callbacks = {};

    this.on = function( event, cb ) {
        if ( !callbacks[event] ) callbacks[event] = [];

        callbacks[event].push( cb );
    }

    this.trigger = function( event, data ) {

        if ( !callbacks[event] ) return;

        callbacks[event].forEach(function( callback ) {
            callback.call(this, data)
        });
    }
}

export default function( proto ) {
    return EventEmitter.call( proto );
}
