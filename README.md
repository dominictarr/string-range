# string-range

Check whether a string is within a range.

## Example

``` js
var ranges = require('string-range')

ranges.satisfies('hello', {start: 'a', end: 'z'})
=> true
ranges.satisfies('Hello', {start: 'a', end: 'z'})
=> false

//force a range inside a prefix!

ranges.satisfies('TYPE~key', ranges.prefix({start:'a', end:'z'}, 'TYPE')
=> true
```

## License

MIT
