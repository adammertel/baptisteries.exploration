var sizeValues = {
  panel: {
    attributeWidth: 400,
    timeHeight: 500
  },
  time: {
    bars: {
      width: 6,
      stroke: 8,
      margin: 2
    }
  }
}

class Sizes {
  values

  constructor(sizeValues) {
    this.values = sizeValues
  }
  get timeBarSpace() {
    return this.values.time.bars.stroke + this.values.time.bars.margin
  }
}

var sizes = new Sizes(sizeValues)
export default sizes
