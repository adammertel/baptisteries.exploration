import Config from './config'
import Colors from './colors'
import chroma from 'chroma-js'

export var featureProp = (feature, propName): any => {
  if (propName in Config.props) {
    return feature.props[Config.props[propName]]
  } else {
    return feature.props[propName]
  }
}

var timeScale = chroma.scale([
  Colors.unSelectedSpatial,
  Colors.feature
])
export var timeColor = certainty => {
  return timeScale(certainty).hex()
}
