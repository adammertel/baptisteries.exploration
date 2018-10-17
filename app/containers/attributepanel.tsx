import React from 'react'
import { observer } from 'mobx-react'
import TimeBarComponent from './../components/timebar'
import TimeSelectComponent from './../components/timeselect'
import TimeLegendComponent from './../components/timelegend'
import PanelFilterComponent from './../components/panelfilter'
import PanelSettingsComponent from './../components/panelsettings'
import Config from './../helpers/config'
import { featureProp, timeColor } from './../helpers/feature'
import Base from './../helpers/base'

type Props = {
  stores: Array<Object>
}

@observer
export default class TimePanelContainer extends React.Component<
  Props
> {
  props
  positions
  _middleTM // margin of y for the middle components

  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <div className="container panel-container-attributes">
        Attribute
      </div>
    )
  }
}
