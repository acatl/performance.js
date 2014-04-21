'use strict';

var events = require('events');
var util = require('util');

var Timer = require('./timer');
var Report = require('./report');

function Test(name) {
    this.name = name;
    this.iterations = 100;
    this.iterationCount = 0;
    this.testCase = null;
    this.timeout = 100;

    this.timer = new Timer();
    this.report = new Report(this);

    events.EventEmitter.call(this);
    this.on('iteration', this.onIteration);
}

util.inherits(Test, events.EventEmitter);

Test.prototype.add = function(testCase) {
    this.testCase = testCase;
    return this;
};

Test.prototype.onIteration = function() {
    clearTimeout(this.timoutId);
    this.cycle();
};

Test.prototype.iterationDone = function() {
    var timeEnd = this.timer.end('cycle' + this.iterationCount);
    this.report.cycles.push(timeEnd);
    this.emit('iteration');
};

Test.prototype.iterate = function() {
    this.iterationCount++;
    this.timer.start('cycle' + this.iterationCount);
    var testResult = this.testCase(this.iterationDone.bind(this));
    if (typeof testResult !== 'undefined') {
        this.iterationDone();
    }
};

Test.prototype.run = function() {
    this.iterationCount = 0;
    this.emit('start');
    this.cycle();
};

Test.prototype.done = function() {
    this.emit('done', this.report.generate());
};

Test.prototype.onTestTimeOut = function() {
    // console.log('timeout on cycle no:', this.iterationCount);
    this.emit('timeout');
    this.done();
};

Test.prototype.cycle = function() {
    if (this.iterationCount >= this.iterations) {
        this.done();
        return;
    }
    this.timoutId = setTimeout(this.onTestTimeOut.bind(this), this.timeout);
    this.iterate();
};

module.exports = Test;

