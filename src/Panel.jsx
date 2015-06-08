'use strict';

const React = require('react');
let prefixClsFn = require('./utils/prefixClsFn');

class Panel extends React.Component{
  constructor(props) {
    super(props);
    let prefixCls = props.prefixCls;

    this.state = {
      prefixCls: prefixCls
    };

    this.prefixClsFn = prefixClsFn.bind(this);
  }

  render() {
    return (
      <div className={this.prefixClsFn('panel')}>
        {this.props.children}
      </div>
    );
  }
}

Panel.defaultProps = {
  prefixCls: 'rc-color-picker'
};

module.exports = Panel;
