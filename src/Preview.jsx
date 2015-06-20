'use strict';

const React = require('react');
let prefixClsFn = require('./utils/prefixClsFn');

class Preview extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      prefixCls: props.prefixCls,
      alpha: props.alpha,
      bgColor: props.bgColor
    };

    this.prefixClsFn = prefixClsFn.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.bgColor !== this.props.bgColor) {
      this.setState({
        bgColor: nextProps.bgColor
      });
    }
    if (nextProps.alpha !== this.props.alpha) {
      this.setState({
        alpha: nextProps.alpha
      });
    }
  }

  render() {
    return (
      <div className={this.props.prefixCls}>
        <span style={{backgroundColor:this.state.bgColor, opacity: this.state.alpha / 100}}></span>
      </div>
    );
  }
}

Preview.propTypes = {
  prefixCls: React.PropTypes.string,
  alpha: React.PropTypes.number,
  bgColor: React.PropTypes.string
};

Preview.defaultProps = {
  prefixCls: 'rc-color-picker-preview',
  alpha: 100,
  bgColor: '' // 背景颜色
};

module.exports = Preview;
