'use strict'

require('rc-color-picker/assets/index.css')
const React = require('react')
const ColorPicker = require('rc-color-picker')

const Trigger = ColorPicker.Trigger
class AppColorPicker extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      color: '#36c',
      style: {}
    }
  }

  handleTriggerSwitch(visible, style) {
    this.setState({visible, style})
  }

  render() {

    return (<div>
      <Trigger
        color={this.state.color}
        open={this.state.visible}
        onSwitch={this.handleTriggerSwitch.bind(this)}
      />
      <ColorPicker
        color={this.state.color}
        visible={this.state.visible} 
        style={this.state.style} 
      />
     </div> 
    )
  }
}

React.render(
  <div style={{margin:20}}>
    <h1>拾色器</h1>
    <AppColorPicker />
  </div>,
  document.getElementById('__react-content')
)
