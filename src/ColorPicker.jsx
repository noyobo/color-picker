'use strict';

let React = require('react');

// 面板
let Panel = require('./Panel');
// 色板
let Board = require('./Board');
let prefixClsFn = require('./utils/prefixClsFn');


function toggleClassName() {
  // jshint validthis:true
  let name = this.state.visible ? 'open' : 'close';
  return this.prefixClsFn(name);
}

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
      prefixCls: props.prefixCls,
      style: props.style
    };

    this.prefixClsFn = prefixClsFn.bind(this);
    this.toggleClassName = toggleClassName.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.state.style) {
      this.setState({
        style: props.style
      });
    }

    if (this.state.visible !== props.visible) {
      this.toggleVisiable(props.visible);
    }
  }

  toggleVisiable(val) {
    this.setState({
      visible: val
    });
  }

  render() {
    return (
      <div
        className={this.props.prefixCls + ' ' + this.toggleClassName()}
        style={this.state.style}
      >
        <Panel prefixCls={this.props.prefixCls}>
          <Board prefixCls={this.props.prefixCls} />
        </Panel>
      </div>
    );
  }
}

ColorPicker.propTypes = {
  visible: React.PropTypes.bool,
  prefixCls: React.PropTypes.string,
  style: React.PropTypes.object
};

ColorPicker.defaultProps = {
  visible: false,
  prefixCls: 'rc-color-picker',
  style: {}
};

module.exports = ColorPicker;
