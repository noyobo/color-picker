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
      color: props.color
    };

    this.prefixClsFn = prefixClsFn.bind(this);
    this.handleTriggerClick = handleTriggerClick.bind(this);
    this.toggleClassName = toggleClassName.bind(this);
  }

  componentWillReceiveProps(nextProps){
    // 当色值发生改变
    if (nextProps.color !== this.props.color) {
      this.setState({
        color: nextProps.color
      });
    }
  }

  getOffset() {
    return Dom.getAlign(React.findDOMNode(this), this.props.align, this.props.offset);
  }

  render() {
    return (
      <span className={this.prefixClsFn('trigger')}>
      <a
        className={this.toggleClassName()}
        role='button'
        onClick={this.handleTriggerClick}
        title='拾色器'
        style={{backgroundColor: this.state.color}}
      ></a>
      </span>
    );
  }
}

Trigger.propTypes = {
  align: React.PropTypes.string,
  offset: React.PropTypes.array,
  color: React.PropTypes.string,
  open: React.PropTypes.bool,
  prefixCls: React.PropTypes.string,
  onSwitch: React.PropTypes.func
};

Trigger.defaultProps = {
  align: 'tr',
  offset: [5, 0],
  color: '#36c',
  open: false,
  prefixCls: 'rc-color-picker',
  onSwitch() {}
};

module.exports = Trigger;
