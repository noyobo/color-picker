'use strict';

const React = require('react');
const Colr = require('colr');
let prefixClsFn = require('./utils/prefixClsFn');

let colr = new Colr();

class Ribbon extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      prefixCls: props.prefixCls,
      defaultColor: props.defaultColor
    };

    this.prefixClsFn = prefixClsFn.bind(this);

    var events = [
      'handleMouseDown',
      'handledDrag',
      'handledDragEnd',
      'pointMoveTo'
    ];
    events.forEach(e => {
      this[e] = this[e].bind(this);
    });
  }

  componentDidMount() {
    let HSV = colr.fromHex(this.state.defaultColor).toHsvObject();
    let hue = HSV.h;
    let per = hue / 360 * 100;
    this.setState({
      huePercent: per
    });
  }

  componentWillReceiveProps(nextProps) {
    let HSV = colr.fromHex(nextProps.defaultColor).toHsvObject();
    let hue = HSV.h;
    let per = hue / 360 * 100;
    this.setState({
      huePercent: per
    });
  }

  pointMoveTo(coords) {
    let rect = React.findDOMNode(this).getBoundingClientRect();
    let width = rect.width;
    let left = coords.x - rect.left;

    left = Math.max(0, left);
    left = Math.min(left, width);

    let huePercent = left / width;
    let hue = huePercent * 360;

    huePercent = huePercent * 100;

    this.setState({
      huePercent: huePercent
    });

    this.props.onHexChange(hue);
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
        <span ref="point" style={{left: this.state.huePercent + '%'}}></span>
        <div
          className={this.prefixClsFn('handler')}
          onMouseDown={this.handleMouseDown}
        ></div>
      </div>
    );
  }
}

Ribbon.defaultProps = {
  prefixCls: 'rc-colorpicker-ribbon',
  defaultColor: '#f00',
  onHexChange: function() {}
};

module.exports = Ribbon;
