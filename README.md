# fn-exec-stats
Get execution stats for javascript functions. This is only intended to debug performance issues, DO NOT USE IN PRODUCTION!

## Install
`npm install fn-exec-stats` or `yarn add fn-exec-stats`

## Usage
```js
const fnWrapper = require('fn-exec-stats'); // or `import fnWrapper from 'fn-exec-stats';`

const wrappedFunction = fnWrapper(Math.random, {
    enabled: false, // defaults to true
});

wrappedFunction.enableExecStats(); // start tracking the executions

// get some random numbers
wrappedFunction();
wrappedFunction();
wrappedFunction();

// log the executions stats
const stats = wrappedFunction.getExecStats();
console.log(stats);

// prints the stats in milliseconds:
// {
//   "executedTimes": 3,
//   "maxTime": 3,
//   "meanTime": 2,
//   "minTime": 1,
//   "totalTime": 6
// }

wrappedFunction.disableExecStats(); // stops tracking the executions

// After disabling the tracking, calling `getExecStats` will return the last stats
// before the tracking was disabled
```
