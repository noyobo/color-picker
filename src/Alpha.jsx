'use strict';

const React = require('react');
const Colr = require('colr');
let prefixClsFn = require('./utils/prefixClsFn');

let colr = new Colr();

function rgbaColor(r, g, b, a) {
    return 'rgba(' + [r, g, b, a / 100].join(',') + ')';
  }

class Alpha extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      alpha: props.alpha,
      prefixCls: props.prefixCls,
      bgColor: props.bgColor
    };

    this.prefixClsFn = prefixClsFn.bind(this);

    var events = [
      'handleMouseDown',
      'handledDrag',
      'handledDragEnd',
      'pointMoveTo',
      'getBackground'
    ];
    events.forEach(e => {
      this[e] = this[e].bind(this);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      bgColor: nextProps.bgColor,
      alpha: nextProps.alpha
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.bgColor !== this.props.bgColor) {
      return true;
    }

    if (nextState.alpha !== this.state.alpha) {
      return true;
    }

    return false;
  }

  getBackground() {
    let {r, g, b} = colr.fromHex(this.state.bgColor).toRgbObject();
    let opacityGradient = 'linear-gradient(to right, ' +
      rgbaColor(r, g, b, 0) + ', ' +
      rgbaColor(r, g, b, 100) + ')';
    return opacityGradient;
  }

  pointMoveTo(coords) {
    let rect = React.findDOMNode(this).getBoundingClientRect();
    let width = rect.width;
    let left = coords.x - rect.left;

    left = Math.max(0, left);
    left = Math.min(left, width);

    let alpha = Math.floor(left / width * 100);

    this.setState({
      alpha: alpha
    });

    this.props.onAlphaChange(alpha);
  }

  handleMouseDown(e) {
    let x = e.clientX, y = e.clientY;

    this.pointMoveTo({
      x, y
    });

    window.addEventListener('mousemove', this.handledDrag);
    window.addEventListener('mouseup', this.handledDragEnd);
  }

  handledDrag(e) {
    let x = e.clientX, y = e.clientY;
    this.pointMoveTo({
      x, y
    });
  }

  handledDragEnd(e) {
    let x = e.clientX, y = e.clientY;
    this.pointMoveTo({
      x, y
    });
    window.removeEventListener('mousemove', this.handledDrag);
    window.removeEventListener('mouseup', this.handledDragEnd);
  }

  render() {
    return (
      <div className={this.props.prefixCls}>
        <div
          ref="bg"
          className={this.prefixClsFn('bg')}
          style={{background: this.getBackground()}}
        />
        <span ref="point" style={{left: this.state.alpha + '%'}} />
        <div
          className={this.prefixClsFn('handler')}
          onMouseDown={this.handleMouseDown}
        />
      </div>
    );
  }
}

Alpha.defaultProps = {
  alpha: 100,
  prefixCls: 'rc-colorpicker-alpha',
  bgColor: '#f00',
  onAlphaChange: function() {}
};

module.exports = Alpha;
