'use strict';

function Timer() {
    this.timers = {};
}

Timer.prototype.start = function(id) {
    this.timers[id] = new Date().getTime();
};

Timer.prototype.end = function(id) {
    var timeEnd = new Date().getTime();
    var timeStart = this.timers[id];
    if (!timeStart) {
        throw new Error('Timer does not have id', id);
    }
    this.timers[id] = null;
    return timeEnd - timeStart;
};


module.exports = Timer;
