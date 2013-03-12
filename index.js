
var range = exports.range = function (obj) {
  return null == obj ? {} : obj
}

var prefix = exports.prefix = function (range, within) {
  var _range = {}
  if(range instanceof RegExp) {
    _range.start = within
    _range.end   = within + '~',
    _range.inner = range
  }
  else if('object' === typeof range) {
    _range.start = within + (range.start || '')
    _range.end = within + (range.end || '~')
  }
  return _range
}


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

var satifies = exports.satisfies = function (key, range) {
  return checker(range)(key)
}


