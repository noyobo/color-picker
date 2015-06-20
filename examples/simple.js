'use strict';

require('rc-color-picker/assets/index.css');
const React = require('react');
const ColorPicker = require('rc-color-picker');

const Trigger = ColorPicker.Trigger;
class AppColorPicker extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      style: {}
    };
  }

  handleTriggerSwitch(visible, style) {
    this.setState({visible, style});
  }

  onColorChange(obj){
    console.log(obj);
    this.setState({
      bgColor: obj.hex
    });
  }

  render() {

    return (<div>
      <Trigger
        ref="trigger"
        bgColor={this.state.bgColor}
        open={this.state.visible}
        onSwitch={this.handleTriggerSwitch.bind(this)}
      />
      <ColorPicker
        bgColor={this.props.bgColor}
        visible={this.state.visible} 
        style={this.state.style} 
        onColorChange={this.onColorChange.bind(this)}
      />
     </div> 
    );
  }
}

React.render(
  <div style={{margin:20}}>
    <h1>拾色器</h1>
    <AppColorPicker bgColor={'#36c'}/>
  </div>,
  document.getElementById('__react-content')
);
