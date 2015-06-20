/**
 * 触发器
 */

'use strict';

let React = require('react');
let Dom = require('./utils/dom');

let prefixClsFn = require('./utils/prefixClsFn');

function handleTriggerClick() {
  /*jshint validthis:true */
  let offset = this.getOffset();
  this.props.onSwitch(!this.state.open, offset);

  this.setState({
    open: !this.state.open
  });
}

function toggleClassName() {
  /*jshint validthis:true */
  let name = this.state.open ? 'open' : 'close';
  return this.prefixClsFn(name);
}

class Trigger extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prefixCls: props.prefixCls,
      open: props.open,
      bgColor: props.bgColor
    };

    this.prefixClsFn = prefixClsFn.bind(this);
    this.handleTriggerClick = handleTriggerClick.bind(this);
    this.toggleClassName = toggleClassName.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // 当色值发生改变
    if (nextProps.bgColor !== this.props.bgColor) {
      this.setState({
        bgColor: nextProps.bgColor
      });
    }
  }

  getOffset() {
    return Dom.getAlign(React.findDOMNode(this), this.props.align, this.props.offset);
  }

  render() {
    return (
      <span className={this.props.prefixCls}>
      <a
        className={this.toggleClassName()}
        role='button'
        onClick={this.handleTriggerClick}
        title='拾色器'
        style={{backgroundColor: this.state.bgColor}}
      ></a>
      </span>
    );
  }
}

Trigger.propTypes = {
  align: React.PropTypes.string,
  offset: React.PropTypes.array,
  bgColor: React.PropTypes.string,
  open: React.PropTypes.bool,
  prefixCls: React.PropTypes.string,
  onSwitch: React.PropTypes.func
};

Trigger.defaultProps = {
  align: 'tr',
  offset: [5, 0],
  bgColor: '#36c',
  open: false,
  prefixCls: 'rc-color-picker-trigger',
  onSwitch() {}
};

module.exports = Trigger;
