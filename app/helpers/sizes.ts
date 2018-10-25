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
    },
    lines: {
      topHeight: 80,
      middleHeight: false,
      bottomHeight: 100
    },
    components: {
      histogramWidth: 200,
      selectorWidth: 100,
      legendWidth: 30,
      barchartWidth: 'derived'
    },
    margins: 10
  }
}

class Sizes {
  values

  constructor(sizeValues) {
    this.values = sizeValues

    this.values.time.lines.middleHeight =
      this.values.panel.timeHeight -
      (this.values.time.lines.topHeight +
        this.values.time.lines.bottomHeight)

    this.values.time.bars.space =
      this.values.time.bars.stroke + this.values.time.bars.margin
  }
}

var sizes = new Sizes(sizeValues)
export default sizes
