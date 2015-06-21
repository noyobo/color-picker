'use strict';

const React = require('react');
let prefixClsFn = require('./utils/prefixClsFn');

class Trigger extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      prefixCls: props.prefixCls,
      defaultColor: props.defaultColor
    };

    this.prefixClsFn = prefixClsFn.bind(this);
    this.handlerClick = this.handlerClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      defaultColor: nextProps.defaultColor
    });
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.defaultColor !== this.props.defaultColor;
  }

  handlerClick() {
    if (typeof this.props.onToggle === 'function') {
      this.props.onToggle();
    }
  }

  render() {
    return (
      <div className={this.props.prefixCls} onClick={this.handlerClick}>
        <span style={{backgroundColor: this.state.defaultColor}} />
      </div>
    );
  }
}

Trigger.propTypes = {
  prefixCls: React.PropTypes.string,
  defaultColor: React.PropTypes.string
};

Trigger.defaultProps = {
  prefixCls: 'rc-colorpicker-trigger',
  defaultColor: '#f00'
};

module.exports = Trigger;
