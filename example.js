"use strict";
var benchmarkjs = require('./benchmarkjs.js');
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



