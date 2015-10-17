# BenchmarkJS

A easy benchmark framework for Javascript code.

## Installation

Installing with npm:

```bash
$ npm install benchmarkjs --save-dev
```

This module don't have dependencies.

## Usage

In a browser:

```html
<script src="benchmarkjs.js"></script>
```

In Node.js:

```js
var Benchmark = require('benchmarkjs');
```

Enable Node.js V8 native syntax for optimization check with this parameter:

```
node --allow-natives-syntax
```

Usage example:

```js
var benchmarkjs = require('benchmarkjs');

benchmarkjs.options({
    testTime: 4000
});

var bigArray1 = new Array(1000);
benchmarkjs('n < max', function () {
    for (var n = 0, max = bigArray1.length; n < max; n++) {
        bigArray1[n] = 0 | Math.random() * 1000;
    }
});

var bigArray2 = new Array(1000);
benchmarkjs('n < hugeArray2.length', function () {
    for (var n = 0; n < bigArray2.length; n++) {
        bigArray2[n] = 0 | Math.random() * 1000;
    }
});

console.log(benchmarkjs.results);

```

The result is similar to this:

```js
[ { name: 'n < max',				// test name
    elapsed: 4395,					// total time to test
    checks: 2,						// internal time checks
    totalIterations: 484811,		// total executions
    persecondIterations: 110309,	// execution per second
    isOptimized: null,				// have value only with node and the paramenter --allow-natives-syntax
    diff: '0%' },					// difference with the best case
  { name: 'n < hugeArray2.length',	// test name
    elapsed: 4325,					// total time to test
    checks: 2,						// internal time checks
    totalIterations: 475535,		// total executions
    persecondIterations: 109950,	// execution per second
    isOptimized: null,				// have value only with node and the paramenter --allow-natives-syntax
    diff: '0.33%' } ]				// difference with the best case
```

isOptimized can have these values:

```js
1 - "optimized"
2 - "not optimized"
3 - "always optimized"
4 - "never optimized"
6 - "maybe deoptimized"
7 - "turbofan optimized"
```

### Contributor

* Pablo Almunia ([github:pabloalmunia](https://github.com/pabloalmunia) or [@pabloalmunia](https://twitter.com/pabloalmunia))

