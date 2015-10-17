// isOptimizeNative function
// 1 - "optimized"
// 2 - "not optimized"
// 3 - "always optimized"
// 4 - "never optimized"
// 6 - "maybe deoptimized"
// 7 - "turbofan optimized"
module.exports = function (fn) {
    fn();
    fn();
    %OptimizeFunctionOnNextCall(fn);
    fn();
    var result = %GetOptimizationStatus(fn);
    %CollectGarbage(null);
    return result;
};
