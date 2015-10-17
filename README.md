# BenchmarkJS

A easy bechmarking framework for Javascript code.

## Installation

Installing with npm:

```bash
$ npm i --save benchmarkjs
```

This module don't have dependencies.

Use in a browser:

```html
<script src="benchmarkjs.js"></script>
```

Use in Node.js:

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
    verbose: true,
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


### Contributor

Pablo Almunia 
