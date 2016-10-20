import test from 'tape';
import  './jquery.test.helper';
import sinon from 'sinon';

import getWeatherData from '../src/services/getWeatherData';

test( 'getWeatherDate should resolve with the data', function(assert) {
    assert.plan(1);
    var callback = sinon.spy();
    var xhr = sinon.useFakeXMLHttpRequest();
    window.XMLHttpRequest = xhr;

    var requests = [];

    xhr.onCreate = function (req) {
        requests.push(req);
        req.respond(
            200,
            { "Content-Type": "application/json" },
            JSON.stringify([{hello: 'world'}])
        );
    };

    var test = getWeatherData()
    test.always(( data ) => {
        assert.equal(requests.length, 1);
        xhr.restore();
    })



});
