/*jslint node: true */
'use strict';

var should = require('should');
var events = require('events');
var Report = require('../lib/report');

describe('Report', function() {
    var generatedReport;
    before(function() {
        var report = new Report({
            name: 'test',
            iterations: 10,
            timeout: 100
        });
        report.cycles = [
            2,
            1,
            2,
            4,
            4,
            6,
            7,
            7,
            8,
            10
        ];
        generatedReport = report.generate();
    });
    it('should generate report', function() {
        generatedReport.iterationsPlanned.should.be.eql(10);
        generatedReport.iterationsCompleted.should.be.eql(10);
        generatedReport.timeout.should.be.eql(100);
        generatedReport.minTime.should.be.eql(1);
        generatedReport.maxTime.should.be.eql(10);
        generatedReport.totalTime.should.be.eql(51);
        generatedReport.average.should.be.eql(5.1);
        generatedReport.acceleration.should.be.eql(-0.1568627450980392);
    });
});
