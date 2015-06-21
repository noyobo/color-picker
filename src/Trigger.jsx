'use strict';

const React = require('react');
let prefixClsFn = require('./utils/prefixClsFn');

class Trigger extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      prefixCls: props.prefixCls,
      bgColor: props.bgColor
    };

    this.prefixClsFn = prefixClsFn.bind(this);
    this.handlerClick = this.handlerClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      bgColor: nextProps.bgColor
    });
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.bgColor !== this.props.bgColor;
  }

  handlerClick() {
    if (typeof this.props.onToggle === 'function') {
      this.props.onToggle();
    }
  }

  render() {
    return (
      <div className={this.props.prefixCls} onClick={this.handlerClick}>
        <span style={{backgroundColor: this.state.bgColor}} />
      </div>
    );
  }
}

Trigger.defaultProps = {
  prefixCls: 'rc-colorpicker-trigger',
  bgColor: '#f00'
};

module.exports = Trigger;
