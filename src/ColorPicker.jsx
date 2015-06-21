'use strict';

const React = require('react');
const Trigger = require('./Trigger');
const Picker = require('./Picker');
const DOM = require('./utils/dom');

let prefixClsFn = require('./utils/prefixClsFn');

const extend = function (target, source) {
  for (var i in source) {
    if (!target.hasOwnProperty(i)) {
      target[i] = source[i];
    }
  }
  return target;
};

class ColorPicker extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      rootPrefixCls: props.rootPrefixCls,
      defaultColor: props.defaultColor,
      visible: props.visible,
      style: props.style
    };

    this.prefixClsFn = prefixClsFn.bind(this);
    var events = [
      'triggerClickHandler',
      'handlerChange',
      'handlerBlur'
    ];

    events.forEach(e => {
      this[e] = this[e].bind(this);
    });
  }

  triggerClickHandler() {
    let offest = DOM.getAlign(
        React.findDOMNode(this.refs.trigger), 'tr', [5, 0]
    );

    extend(this.state.style, offest);

    this.refs.picker.toggle();
  }

  handlerChange(colors) {
    this.setState({
      defaultColor: colors.hex
    });
  }

  handlerBlur() {
    this.refs.picker.hide();
  }

  render() {
    return (
      <div>
        <Trigger
          ref='trigger'
          defaultColor={this.state.defaultColor}
          onToggle={this.triggerClickHandler}
        />
        <Picker
          ref='picker'
          defaultColor={this.state.defaultColor}
          style={this.state.style}
          visible={this.state.visible}
          onChange={this.handlerChange}
          onBlur={this.handlerBlur}
        />
      </div>
    );
  }
}

ColorPicker.defaultProps = {
  rootPrefixCls: 'rc-colorpicker',
  visible: false,
  defaultColor: '#F00',
  style: {
    position: 'absolute',
    zIndex: 100
  }
};

module.exports = ColorPicker;
