import test from 'tape';
import  './jquery.test.helper';
import {templateRenderer} from '../src/helpers/misc';

test( 'it add the text to the body', function(assert) {
    templateRenderer( 'body', function() {
        return 'testy test test';
    })();

    assert.equal( document.body.innerHTML, 'testy test test');

    assert.end();
});
