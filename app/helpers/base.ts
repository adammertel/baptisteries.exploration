import L from 'leaflet'
import { SizeModel } from './models'

var timer
var Base = {
  sum: (a: number, b: number): number => a + b,

  doRequest: (url: string, next: Function, parse: boolean = true) => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    // xhr.withCredentials = true;

    xhr.onload = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          parse
            ? next(JSON.parse(xhr.responseText))
            : next(xhr.responseText)
        } else {
          next({})
        }
      } else {
        next({})
      }
    }
    xhr.send()
  },

  debounce: func => {
    return function(event) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(func, 100, event)
    }
  },

  screenWidth: () =>
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth,

  screenHeight: () =>
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight,

  intRangeArray: (from: number, to: number): Array<number> => {
    var a = []

    while (to-- && to >= from) {
      a[to - from] = to
    }
    return a
  },

  arrayIntersection: (a, b) => {
    return a.filter(a1 => b.includes(a1))
  },

  cloneArray: a => JSON.parse(JSON.stringify(a)),

  average: a => {
    var total = 0
    for (var i = 0; i < a.length; i++) {
      total += a[i]
    }
    return total / a.length
  },

  clamp: (num, min, max) =>
    num <= min ? min : num >= max ? max : num,

  unique: arr => arr.filter((v, i, a) => a.indexOf(v) === i),

  pointInBounds: (
    point: Array<number>,
    extent: Array<number>
  ): boolean => {
    const x = point[1]
    const y = point[0]
    return (
      extent[0][1] < x &&
      extent[1][1] > x &&
      extent[0][0] < y &&
      extent[1][0] > y
    )
  },

  applySizeStyle(sizes: SizeModel, otherStyles: {}) {
    return { ...sizes, ...otherStyles }
  },

  cssStripes: (color, w, ratio) => {
    const color2 = '#ffffffff'

    return (
      'background: repeating-linear-gradient(135deg, ' +
      color +
      ', ' +
      color +
      ' ' +
      w * ratio +
      'px, ' +
      color2 +
      ' 0px, ' +
      color2 +
      ' ' +
      w +
      'px)'
    )
  },

  konvaStripes: (color, w, wp, ratio) => {
    const color2 = '#ffffffff'
    const ws = wp * ratio // white part
    const d = 0.0001

    let usedW = 0
    let times = 1
    let parts = 0
    const values = []

    while (usedW < w) {
      let thisW = 0
      let thisC = color
      const baseW = parts * wp

      if (times % 4 === 1) {
        thisW = baseW + d
        thisC = color
      } else if (times % 4 === 2) {
        thisW = baseW + ws
        thisC = color
      } else if (times % 4 === 3) {
        thisW = baseW + ws + d
        thisC = color2
      } else if (times % 4 === 0) {
        thisW = baseW + wp
        thisC = color2
      }

      if (times % 4 === 0) {
        parts = parts + 1
      }
      times = times + 1

      if (thisW < w) {
        values.push(thisW / w)
        values.push(thisC)
      }
      usedW = thisW
    }

    return values
  }
}

export default Base
