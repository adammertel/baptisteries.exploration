import Config from './config'

export var featureProp = (feature, propName): any => {
  if (propName in Config.props) {
    return feature.props[Config.props[propName]]
  } else {
    return feature.props[propName]
  }
}
