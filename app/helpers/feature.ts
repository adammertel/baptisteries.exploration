import Config from "./config";
import Colors from "./colors";
import chroma from "chroma-js";
import Base from "./base";

export var featureProp = (feature, propName): any => {
  if (propName in Config.props) {
    return feature.props[Config.props[propName]];
  } else {
    return feature.props[propName];
  }
};

export var featureSelection = (feature, selection) => {
  return {
    time: featureSelectionTime(feature, selection),
    space: featureSelectionSpace(feature, selection),
    attributes: featureSelectionAttributes(feature, selection)
  };
};

var featureSelectionTime = (feature, selection) => {
  const dateMin = featureProp(feature, "dateMin");
  const dateMax = featureProp(feature, "dateMax");
  const duration = Base.intRangeArray(dateMin, dateMax);

  const selectedDuration = Base.intRangeArray(
    selection.time[0],
    selection.time[1]
  );

  const intersection = Base.arrayIntersection(duration, selectedDuration);
  const ratio = intersection.length / duration.length;
  // console.log(intersection.length, duration.length, ratio)
  return ratio;
};
var featureSelectionSpace = (feature, selection) => 1;
var featureSelectionAttributes = (feature, selection) => 1;

var timeScale = chroma.scale([Colors.unselected, Colors.temporal]);

var markerBorder = chroma.scale([Colors.unselected, Colors.temporal]);
export var markerBorderColor = certainty => {
  return markerBorder(certainty).hex();
};
export var timeColor = certainty => {
  return timeScale(certainty).hex();
};
