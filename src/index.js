const min = require('lodash/min');
const max = require('lodash/max');
const mean = require('lodash/mean');
const sum = require('lodash/sum');

module.exports = (fn, config = {}) => {
    const executionTimes = [];
    let executedTimes = 0;
    let disabled = config.disabled || false;

    const getStats = () => ({
        minTime: min(executionTimes),
        maxTime: max(executionTimes),
        meanTime: mean(executionTimes),
        totalTime: sum(executionTimes),
        executedTimes,
    });

    const wrapped = (...args) => {
        if (disabled) {
            return fn(...args);
        }

        const start = Date.now();

        const result = fn(...args);

        const end = Date.now();
        executionTimes.push(end - start);
        executedTimes = executedTimes + 1;

        return result;
    };

    wrapped.getExecStats = getStats;
    wrapped.enableExecStats = () => {
        disabled = false;
    };
    wrapped.disableExecStats = () => {
        disabled = true;
    };

    return wrapped;
};
