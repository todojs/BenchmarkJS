"use strict";
(function (root) {

    // Global variables
    var verbose = true;
    var maxIterations = 0x3FFFFFFF;
    var testTime = 3000;
    var preTestIterations = 1000;
    var checkOptimization = true;

    // Allow Native Syntax
    var isOptimized;
    if (typeof process !== 'undefined' &&
        typeof process.execArgv !== 'undefined' &&
        process.execArgv.indexOf('--allow-natives-syntax') >= 0)
    {
        isOptimized = require('./isOptimizedNative');
    } else {
        isOptimized = function () {
            return null;
        };
    }

    // Benchmark function
    var benchmark = function benchmark(name, fn) {

        // Prepare innerloop function
        var innerLoop = eval(
            "(function(f) {" +
            "   return function innerLoop4" + fn.name + "(n) {" +
            "       for (var i = 0; i < n; i++) f()" +
            "   };" +
            "})")(fn);

        // Pre test
        var timeExcess = testTime * 1.1;
        var init = Date.now();
        innerLoop(preTestIterations, fn);
        var elapsed = Date.now() - init + 1;
        var iterations = 0 | Math.min(maxIterations, timeExcess / elapsed * 1000);

        // Test
        var checks = 0;
        var totalIterations = 0;
        init = Date.now();
        do {
            innerLoop(iterations);
            totalIterations += iterations;
            checks++;
            elapsed = Date.now() - init;
            if (elapsed >= testTime) break;
            iterations = 0 | Math.min(maxIterations, (timeExcess - elapsed) / (elapsed + 1) * totalIterations);
        } while (elapsed < testTime);

        // Stats
        var secs = elapsed / 1000;
        var persecondIterations = 0 | totalIterations / secs;
        if (verbose) {
            console.log('Function %s running for %d second: %s checks, %s total iterations, %s iterations per second',
                name,
                Math.round(secs * 100) / 100,
                checks,
                totalIterations.toLocaleString(),
                persecondIterations.toLocaleString()
            );
        }

        // Global stats
        benchmark.results.push({
            name: name,
            elapsed: elapsed,
            checks: checks,
            totalIterations: totalIterations,
            persecondIterations: persecondIterations,
            isOptimized: checkOptimization ? isOptimized(fn) : null
        });
        benchmark.results.sort(function (a, b) {
            return b.persecondIterations - a.persecondIterations;}
        );
        var max = benchmark.results[0].persecondIterations;
        benchmark.results.forEach(function (a) {
            return a.diff = Math.round((max - a.persecondIterations) / max * 10000) / 100 + "%";
        });

    };

    // Results property
    benchmark.results = [];

    // Options method
    benchmark.options = function (opt) {
        if (typeof opt.verbose === 'boolean') verbose = opt.verbose;
        if (typeof opt.checkOptimization === 'boolean') checkOptimization = opt.checkOptimization;
        if (typeof opt.maxIterations === 'number') maxIterations = opt.maxIterations;
        if (typeof opt.testTime === 'number') testTime = opt.testTime;
        if (typeof opt.preTestIterations === 'number') preTestIterations = opt.preTestIterations;
        return {
            verbose: verbose,
            maxIterations: maxIterations,
            testTime: testTime,
            preTestIterations: preTestIterations
        };
    };

    // Export for node and browser
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = benchmark;
        }
        exports.benchmark = benchmark;
    } else {
        root.benchmark = benchmark;
    }

})(this);