'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.dir2json = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  test_01: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/test_01.json');
    var expected = grunt.file.read('test/expected/test_01.json');
    test.equal(actual, expected, 'should create a valid but empty JSON file');

    test.done();
  },
  test_02: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/test_02.json');
    var expected = grunt.file.read('test/expected/test_02.json');
    test.equal(actual, expected, 'should create a JSON file with two properties');

    test.done();
  },
  test_03: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/test_03.json');
    var expected = grunt.file.read('test/expected/test_03.json');
    test.equal(actual, expected, 'should create a JSON file containing an array');

    test.done();
  },
  test_04: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/test_04.json');
    var expected = grunt.file.read('test/expected/test_04.json');
    test.equal(actual, expected, 'should ignore the README file, as specified');

    test.done();
  },
  test_05: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/test_05.json');
    var expected = grunt.file.read('test/expected/test_05.json');
    test.equal(actual, expected, 'should ignore trailing slash on root property');

    test.done();
  }
};
