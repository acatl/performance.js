/*jslint node: true */
/*jslint expr: true*/
'use strict';

var should = require('should');
var events = require('events');
var Test = require('../lib/test');

describe('Test', function() {
    it('should inherit Event.Emitter', function() {
        var test = new Test();
        test.should.be.instanceof(events.EventEmitter);
    });

    it('should add test', function() {
        var test = new Test();

        var testCase = function() {
            'Hello World!'.indexOf('o') > -1;
        };

        test.add(testCase);
        test.testCase.should.be.equal(testCase);
    });

    it('should add test', function() {
        var test = new Test();

        var testCase = function() {
            'Hello World!'.indexOf('o') > -1;
        };

        test.add(testCase);
        test.testCase.should.be.equal(testCase);
    });

    it('should execute test', function(done) {
        this.timeout(50000);

        var test = new Test();
        test.iterations = 10;

        var acceleration = 0;

        var testCase = function(finish) {
            setTimeout(finish, acceleration++);
        };

        test.add(testCase);
        test.on('done', function(report) {
            // console.log(JSON.stringify(report, null, '  '));
            done();
        });
        test.run();
    });

    describe('events', function() {
        var eventStarted = false;
        var eventIteration = false;
        var eventDone = false;

        before(function(done) {
            this.timeout(50000);

            var test = new Test();
            test.iterations = 10;

            var acceleration = 0;
            var testCase = function(finish) {
                acceleration+=25;
                setTimeout(finish, acceleration);
            };

            test.add(testCase);
            test.on('start', function() {
                eventStarted = true;
            });

            test.on('iteration', function() {
                eventIteration = true;
            });

            test.on('done', function(report) {
                eventDone = true;
                done();
            });
            test.run();
        });

        it('should execute start event', function() {
            eventStarted.should.be.ok;
        });
        it('should execute iteration event', function() {
            eventIteration.should.be.ok;
        });
        it('should execute done event', function() {
            eventDone.should.be.ok;
        });
    });

});
