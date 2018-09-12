import Config from './config'
import chroma from 'chroma-js'

export var featureProp = (feature, propName): any => {
  if (propName in Config.props) {
    return feature.props[Config.props[propName]]
  } else {
    return feature.props[propName]
  }
}

var timeScale = chroma.scale(['grey', 'red'])
export var timeColor = certainty => {
  return timeScale(certainty).hex()
}
