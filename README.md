# BenchmarkJS

A easy bechmarking framework for Javascript code.

## Installation

It don't have dependencies.

In a browser:

```html
<script src="benchmarkjs.js"></script>
```

For enable Chrome’s or Node V8 native syntax for optimization check:

```
  --allow-natives-syntax
```

Installing with npm:

```bash
$ npm i --save benchmarkjs
```

Use in Node.js:

```js
var Benchmark = require('benchmarkjs');
```


Usage example:

```js
var suite = new Benchmark.Suite;

// add tests
suite.add('RegExp#test', function() {
  /o/.test('Hello World!');
})
.add('String#indexOf', function() {
  'Hello World!'.indexOf('o') > -1;
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
// run async
.run({ 'async': true });

// logs:
// => RegExp#test x 4,161,532 +-0.99% (59 cycles)
// => String#indexOf x 6,139,623 +-1.00% (131 cycles)
// => Fastest is String#indexOf
```


## Contributor

Pablo Almunia 
