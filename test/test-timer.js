'use strict';

var should = require('should');
var events = require('events');
var Timer = require('../lib/timer');

describe('Timer', function() {
    var time = 0;
    before(function(done) {
        var timer = new Timer();
        timer.start('test');
        setTimeout(function() {
            time = timer.end('test');
            done();
        }, 20);
    });

    it('should measure difference', function() {
        time.should.be.within(20,22);
    });
});
