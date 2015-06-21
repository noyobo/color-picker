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

    var colors = this.formatHex(props.defaultColor);

    this.state = {
      modes: ['rgb', 'hsv', 'hsl'],
      index: 0,
      mode: 'rgb',
      prefixCls: props.prefixCls,
      colors: colors,
      hex: props.defaultColor.substr(1),
      alpha: props.alpha
    };

    this.prefixClsFn = prefixClsFn.bind(this);

    let events = [
      'formatHex',
      'handlerHexChange',
      'handlerAlphaChange',
      'getRgbFromKey',
      'getHsvFromKey',
      'getHslFromKey',
      'handlerKeyPress',
      'handlerRGBChange',
      'handlerHSVChange',
      'handlerHSLChange',
      'handlerModeChange'
    ];

    events.forEach(e => {
      this[e] = this[e].bind(this);
    });
  }

  componentWillReceiveProps(nextProps) {
    // 此方法需要对详细的属性做过滤, 不能单一的统一处理
    // 父级元素的任意属性关联都可以触发, 曾经我以为是单个独自触发的
    if (nextProps.defaultColor !== this.props.defaultColor) {
      let colors = this.formatHex(nextProps.defaultColor);
      this.setState({
        hex: nextProps.defaultColor.substr(1),
        colors
      });
    }

    if (nextProps.alpha !== this.props.alpha) {
      this.setState({
        alpha: nextProps.alpha
      });
    }
  }

  getRgbFromKey(key) {
    var mode = this.state.mode;
    return this.state.colors[mode][key];
  }

  getHsvFromKey(key) {
    var mode = this.state.mode;
    return this.state.colors[mode][key];
  }

  getHslFromKey(key) {
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

  handlerHSVChange(type, event) {
    let value = event.target.value;
    var HSV = this.state.colors[this.state.mode];
    HSV[type] = parseInt(value);
    var hex = colr.fromHsvObject(HSV).toHex();
    this._chagneColors(hex);
  }

  handlerHSLChange(type, event) {
    let value = event.target.value;
    var HSL = this.state.colors[this.state.mode];
    HSL[type] = parseInt(value);
    var hex = colr.fromHslObject(HSL).toHex();
    this._chagneColors(hex);
  }

  handlerModeChange() {
    var index = this.state.index;
    index = (index + 1) % 3;
    var mode = this.state.modes[index];
    this.setState({
      index,
      mode
    })
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
        {this.state.mode === 'rgb' &&
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
        }
        {this.state.mode === 'rgb' &&
        <div className={this.prefixClsFn('lable')}>
          <label className={this.prefixClsFn('lable-hex')}>Hex</label>
          <label className={this.prefixClsFn('lable-number')}
            onClick={this.handlerModeChange}>R</label>
          <label className={this.prefixClsFn('lable-number')}
            onClick={this.handlerModeChange}>G</label>
          <label className={this.prefixClsFn('lable-number')}
            onClick={this.handlerModeChange}>B</label>
          <label className={this.prefixClsFn('lable-alpha')}>A</label>
        </div>
        }
        {this.state.mode === 'hsv' &&
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
            max={360}
            value={this.getHsvFromKey('h')}
            onChange={this.handlerHSVChange.bind(null, 'h')} />
          <input type='number'
            min={0}
            max={100}
            value={this.getHsvFromKey('s')}
            onChange={this.handlerHSVChange.bind(null, 's')} />
          <input type='number'
            min={0}
            max={100}
            value={this.getHsvFromKey('v')}
            onChange={this.handlerHSVChange.bind(null, 'v')} />
          <input type='number'
            min={0}
            max={100}
            speed={1}
            value={this.state.alpha}
            onChange={this.handlerAlphaChange} />
        </div>
        }
        {this.state.mode === 'hsv' &&
        <div className={this.prefixClsFn('lable')}>
          <label className={this.prefixClsFn('lable-hex')}>Hex</label>
          <label className={this.prefixClsFn('lable-number')}
            onClick={this.handlerModeChange}>H</label>
          <label className={this.prefixClsFn('lable-number')}
            onClick={this.handlerModeChange}>S</label>
          <label className={this.prefixClsFn('lable-number')}
            onClick={this.handlerModeChange}>B</label>
          <label className={this.prefixClsFn('lable-alpha')}>A</label>
        </div>
        }
        {this.state.mode === 'hsl' &&
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
            max={360}
            value={this.getHslFromKey('h')}
            onChange={this.handlerHSLChange.bind(null, 'h')} />
          <input type='number'
            min={0}
            max={100}
            value={this.getHslFromKey('s')}
            onChange={this.handlerHSLChange.bind(null, 's')} />
          <input type='number'
            min={0}
            max={100}
            value={this.getHslFromKey('l')}
            onChange={this.handlerHSLChange.bind(null, 'l')} />
          <input type='number'
            min={0}
            max={100}
            speed={1}
            value={this.state.alpha}
            onChange={this.handlerAlphaChange} />
        </div>
        }
        {this.state.mode === 'hsl' &&
        <div className={this.prefixClsFn('lable')}>
          <label className={this.prefixClsFn('lable-hex')}>Hex</label>
          <label className={this.prefixClsFn('lable-number')}
            onClick={this.handlerModeChange}>H</label>
          <label className={this.prefixClsFn('lable-number')}
            onClick={this.handlerModeChange}>S</label>
          <label className={this.prefixClsFn('lable-number')}
            onClick={this.handlerModeChange}>L</label>
          <label className={this.prefixClsFn('lable-alpha')}>A</label>
        </div>
        }
      </div>
    );
  }
}

Params.defaultProps = {
  prefixCls: 'rc-colorpicker-params',
  defaultColor: '#ff0000',
  alpha: 100,
  onAlphaChange() {},
  onHexChange() {}
};

module.exports = Params;
