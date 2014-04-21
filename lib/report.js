'use strict';

function Report(timer) {
    this.timer = timer;
    this.cycles = [];
}

Report.prototype.generate = function() {
    var totalTime = this.cycles.reduce(function(pv, cv) {
        return pv + cv;
    }, 0);
    var cyclesLength = this.cycles.length;
    var average = totalTime / cyclesLength;
    var acceleration = (this.cycles[0] - this.cycles[cyclesLength - 1]) / totalTime;
    var averageAcceleration = (this.cycles[cyclesLength - 1] / this.cycles[0]) / totalTime;

    var report = {
        name: this.timer.name,
        iterationsPlanned: this.timer.iterations,
        iterationsCompleted: cyclesLength,
        timeout: this.timer.timeout,
        minTime: Math.min.apply(Math, this.cycles),
        maxTime: Math.max.apply(Math, this.cycles),
        totalTime: totalTime,
        average: average,
        acceleration: acceleration,
        cycles: this.cycles
    };
    return report;
};

module.exports = Report;
