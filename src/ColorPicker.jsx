'use strict';

let React = require('react');
// 色板
let Board = require('./Board');
let Preview = require('./Preview');
let Ribbon = require('./Ribbon');
let Alpha = require('./Alpha');
let prefixClsFn = require('./utils/prefixClsFn');

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bgColor: props.bgColor,
      visible: props.visible,
      prefixCls: props.prefixCls,
      style: props.style
    };

    this.prefixClsFn = prefixClsFn.bind(this);

    let events = [
      'toggleClassName',
      'toggleVisiable',
      'onColorChange',
      '_onRender',
      '_onHueChange',
      '_onAlphaChange'
    ];
    // bind methods
    events.forEach(m => {
      this[m] = this[m].bind(this);
    });
  }

  componentWillReceiveProps(props) {
    if (this.state.style) {
      this.setState({
        style: props.style
      });
    }

    if (this.state.visible !== props.visible) {
      this.toggleVisiable(props.visible);
    }
  }
  /**
   * 颜色选取发生改变的回调
   * @param {object} colorObj 回调的返回值
   * @param {string} colorObj.hex 颜色的16进制 eg: #FFFFFF
   * @param {object} colorObj.rgb RGB对应的数值
   * @param {object} colorObj.hsv HSV对应的数值
   * @param {object} colorObj.hsl HSL对应的数值
   * @return {undefined}
   */
  onColorChange(colorObj) {
    this.setState({
      bgColor: colorObj.hex
    });
    if (typeof this.props.onColorChange === 'function') {
      this.props.onColorChange(colorObj);
    }
  }

  _onRender(colorObj) {
    this.setState({
      colorObj
    });
  }

  _onHueChange(hue) {
    this.setState({hue});
  }

  _onAlphaChange(alpha) {
    this.setState({
      alpha
    });
  }
  /**
   * 切换显示状态
   * @param  {boolean} val 是否战士
   * @return {undefined}
   */
  toggleVisiable(val) {
    this.setState({
      visible: val
    });
  }

 toggleClassName() {
    let name = this.state.visible ? 'open' : 'close';
    return this.prefixClsFn(name);
  }

  render() {
    return (
      <div
        className={this.props.prefixCls + ' ' + this.toggleClassName()}
        style={this.state.style}
      >
        <div className={this.prefixClsFn('panel')}>
          <Board
            alpha={this.state.alpha}
            hue={this.state.hue}
            bgColor={this.props.bgColor}
            onColorChange={this.onColorChange}
            onRender={this._onRender}
          />
          <div className={this.prefixClsFn('row')}>
            <div className={this.prefixClsFn('row-ribbon')}>
              <Ribbon
                bgColor={this.props.bgColor}
                onHexChange={this._onHueChange}
              />
            </div>
            <div className={this.prefixClsFn('row-alpha')}>
              <Alpha
                bgColor={this.state.bgColor}
                onAlphaChange={this._onAlphaChange}
              />
            </div>
            <div className={this.prefixClsFn('row-preview')}>
              <Preview
                alpha={this.state.alpha}
                bgColor={this.state.bgColor}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ColorPicker.propTypes = {
  visible: React.PropTypes.bool,
  prefixCls: React.PropTypes.string,
  bgColor: React.PropTypes.string,
  style: React.PropTypes.object,
  onColorChange: React.PropTypes.func
};

ColorPicker.defaultProps = {
  visible: false,
  prefixCls: 'rc-color-picker',
  bgColor: '#F00',
  style: {},
  onColorChange: function() {}
};

module.exports = ColorPicker;
