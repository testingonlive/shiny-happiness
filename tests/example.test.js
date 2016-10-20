import test from 'tape';
import {
    get
} from '../src/helpers/misc';

test('it gets a value when the path is good', function(assert) {
    var obj = {
        one: {
            two: [false, false, false, true]
        }
    };
    assert.ok(get(obj, ['one', 'two', 3]));

    assert.end();
});

test('it returns undefined when the path doesn\'t go anywhere', function(assert) {
    var obj = {
        one: {
            two: [false, false, false, true]
        }
    };

    assert.strictEqual(get(obj, ['hello', 'world']), void 0);

    assert.end();
});

test('it return undefined when the object is undefined', function(assert) {
    assert.strictEqual(get(void 0, [1, 2, 3]), void 0);

    assert.end();
});
