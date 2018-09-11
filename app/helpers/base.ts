import L from 'leaflet'
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

    while (to-- && to > from) {
      a[to - from] = to
    }
    return a
  },

  arrayIntersection: (a, b) => {
    return a.filter(a1 => b.includes(a1))
  },

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
  }
}

export default Base
