var path = require('path');
var simplelua = require('simplelua');
var scriptPath = path.join(__dirname + '/../lua-scripts');
var opts = {scriptPath: scriptPath};
var assert = require('assert');

describe('Client tests', function () {
  var client;

  before(function(done) {
    client = simplelua.createClient(6379, '127.0.0.1', opts);
    client.set('foo:1', 1);
    client.set('foo:2', 2);
    done();
  });

  after(function(done) {
    client.end();
    done();
  });

  it('should del keys with pattern', function(done) {
    client.patternop('foo*', 'del', function(err) {
      assert(!err);
      client.keys('foo*', function(err, keys) {
        assert(keys.length === 0);
        done();
      });
    });
  });

  it('should fetch keys with after_id', function (done) {
    client.del('testset');
    client.zadd('testset', 1, 'a');
    client.zadd('testset', 2, 'b');
    client.zadd('testset', 3, 'c');
    client.zadd('testset', 4, 'd');
    client.zrangewrank(1, 'testset', 'b', function(err, results) {
      console.log(err, results);
      done();
    });
  });
});

