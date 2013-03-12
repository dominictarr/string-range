
//force to a valid range
var range = exports.range = function (obj) {
  return null == obj ? {} : 'string' === typeof range ? {
      start: range, end: range + '\xFF'
    } :  obj
}

//turn into a sub range.
var prefix = exports.prefix = function (range, within, term) {
  range = exports.range(range)
  var _range = {}
  if(range instanceof RegExp) {
    _range.start = within
    _range.end   = within + '~',
    _range.inner = range
  }
  else if('object' === typeof range) {
    _range.start = within + (range.start || '')
    _range.end = within + (range.end || (term || '~'))
  }
  return _range
}

//return a function that checks a range
var checker = exports.checker = function (range) {
  if(!range) range = {}

  if ('string' === typeof range)
    return function (key) {
      return key.indexOf(range) == 0
    }
  else if(range instanceof RegExp)
    return function (key) {
      return range.test(key)
    }
  else if('object' === typeof range)
    return function (key) {
      return (
        !range.start || key >= range.start
      ) && (
        key <= range.end || !range.end
      ) && (
        !range.inner || (
          range.inner.test 
            ? range.inner.test(key)
            : range.inner(key)
        )
      )
    }
  else if('function' === typeof range)
    return range
}
//check if a key is within a range.
var satifies = exports.satisfies = function (key, range) {
  return checker(range)(key)
}


