'use strict';

const React = require('react');
const Colr = require('colr');
let prefixClsFn = require('./utils/prefixClsFn');

let colr = new Colr();

// @see https://github.com/stayradiated/colr-convert/blob/master/index.js
// convert a charcode to a hex val
function hexVal (c) {
  return (
    c < 58 ? c - 48 : // 0 - 9
    c < 71 ? c - 55 : // A - F
    c - 87            // a - f
  );
}
function validationHex(hex) {
  var i = hex[0] === '#' ? 1 : 0;
  var len = hex.length;

  if (len - i < 3) {
    return false;
  }

  var r, g, b;

  var h1 = hexVal(hex.charCodeAt(0 + i));
  var h2 = hexVal(hex.charCodeAt(1 + i));
  var h3 = hexVal(hex.charCodeAt(2 + i));

  if (len - i >= 6) {
    r = (h1 << 4) + h2;
    g = (h3 << 4) + hexVal(hex.charCodeAt(3 + i));
    b = (hexVal(hex.charCodeAt(4 + i)) << 4) + hexVal(hex.charCodeAt(5 + i));
  } else {
    r = (h1 << 4) + h1;
    g = (h2 << 4) + h2;
    b = (h3 << 4) + h3;
  }

  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    return false;
  }

  return true;
}

class Params extends React.Component{
  constructor(props) {
    super(props);

    var colors = this.formatHex(props.bgColor);

    this.state = {
      mode: props.mode,
      prefixCls: props.prefixCls,
      colors: colors,
      hex: props.bgColor.substr(1),
      alpha: props.alpha
    };

    this.prefixClsFn = prefixClsFn.bind(this);

    let events = [
      'formatHex',
      'handlerHexChange',
      'handlerAlphaChange',
      'getRgbFromKey',
      'handlerKeyPress',
      'handlerRGBChange'
    ];

    events.forEach(e => {
      this[e] = this[e].bind(this);
    });
  }

  componentWillReceiveProps(nextProps) {
    let colors = this.formatHex(nextProps.bgColor);
    this.setState({
      alpha: nextProps.alpha,
      hex: nextProps.bgColor.substr(1),
      colors
    });
  }

  getRgbFromKey(key) {
    var mode = this.state.mode;
    return this.state.colors[mode][key];
  }

  formatHex(hex) {
    let colors = colr.fromHex(hex);

    let rgb = colors.toRgbObject();
    let hsv = colors.toHsvObject();
    let hsl = colors.toHslObject();

    return {rgb, hsv, hsl};
  }

  handlerHexChange(event) {
    let value = event.target.value;
    this.setState({hex: value});
  }

  handlerKeyPress(event) {
    let hex = event.target.value;
    var keycode = event.charCode;

    if (hex.length > 2 && keycode === 13  && validationHex(hex)) {
      this.props.onHexChange('#' + hex);
    }
  }

  handlerAlphaChange(event) {
    this.setState({alpha: event.target.value});
    this.props.onAlphaChange(parseInt(event.target.value));
  }

  handlerRGBChange(type, event) {
    let value = event.target.value;
    var RGB = this.state.colors[this.state.mode];
    RGB[type] = parseInt(value);
    var hex = colr.fromRgbObject(RGB).toHex();
    this._chagneColors(hex);
  }

  _chagneColors(hex) {
    var newColors = this.formatHex(hex);
    this.props.onHexChange(hex);
    this.setState({
      colors: newColors,
      hex: hex.substr(1)
    });
  }

  render() {
    return (
      <div className={this.props.prefixCls}>
        <div className={this.prefixClsFn('input')}>
          <input
            className={this.prefixClsFn('hex')}
            type='text'
            maxLength='6'
            onChange={this.handlerHexChange}
            onKeyPress={this.handlerKeyPress}
            value={this.state.hex}
          />
          <input type='number'
            min={0}
            max={255}
            value={this.getRgbFromKey('r')}
            onChange={this.handlerRGBChange.bind(null, 'r')} />
          <input type='number'
            min={0}
            max={255}
            value={this.getRgbFromKey('g')}
            onChange={this.handlerRGBChange.bind(null, 'g')} />
          <input type='number'

            min={0}
            max={255}
            value={this.getRgbFromKey('b')}
            onChange={this.handlerRGBChange.bind(null, 'b')} />
          <input type='number'
            min={0}
            max={100}
            speed={1}
            value={this.state.alpha}
            onChange={this.handlerAlphaChange} />
        </div>
        <div className={this.prefixClsFn('lable')}>
          <label className={this.prefixClsFn('lable-hex')}>Hex</label>
          <label className={this.prefixClsFn('lable-number')}>R</label>
          <label className={this.prefixClsFn('lable-number')}>G</label>
          <label className={this.prefixClsFn('lable-number')}>B</label>
          <label className={this.prefixClsFn('lable-number')}>A</label>
        </div>
      </div>
    );
  }
}

Params.defaultProps = {
  prefixCls: 'rc-colorpicker-params',
  bgColor: '#ff0000',
  alpha: 100,
  mode: 'rgb',
  onAlphaChange() {},
  onHexChange() {}
};

module.exports = Params;
