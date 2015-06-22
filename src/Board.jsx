'use strict';
const Colr = require('colr');
const React = require('react');
let prefixClsFn = require('./utils/prefixClsFn');
let colr = new Colr();
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultColor: props.defaultColor,
      hue: props.hue,
      alpha: props.alpha,
      prefixCls: props.prefixCls,
      x: -999,
      y: -999
    };
    this.prefixClsFn = prefixClsFn.bind(this);
    let events = [
      'handleBoardMouseDown',
      'handleBoardDrag',
      'handleBoardDragEnd',
      'pointMoveTo',
      '_updateBackgroundColor',
      '_onChange',
      '_drawBoard'
    ];
    // bind methods
    events.forEach(m => {
      this[m] = this[m].bind(this);
    });

    this._cacheColors = {};
  }

  componentDidMount() {
    // 在初始化渲染执行之后立刻调用一次，绘制 canvas 图像
    let HSV = this._drawBoard(this.state.defaultColor);
    // 初始化渲染的时候 回调通知其他组件初始化的值
    // 这里很绕, 我还不知道怎么处理
    if (typeof this.props.onRender === 'function') {
      let colorObject = this.getColorsFromHsv(HSV);
      this.props.onRender(colorObject);
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.defaultColor !== this.props.defaultColor) {
      this._drawBoard(nextProps.defaultColor);
    }
    if (nextProps.hue !== this.props.hue) {
      this._updateBackgroundColor(nextProps.hue);
    }
    if (nextProps.alpha !== this.props.alpha) {
      this.setState({
        alpha: nextProps.alpha
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.x !== this.state.x) {
      return true;
    }
    if (nextState.y !== this.state.y) {
      return true;
    }
    if (nextProps.hue !== this.props.hue) {
      return true;
    }
    if (nextProps.alpha !== this.props.alpha) {
      return true;
    }
    if (nextProps.defaultColor !== this.props.defaultColor) {
      return true;
    }
    return false;
  }

  handleBoardMouseDown(e) {
    let x = e.clientX, y = e.clientY;
    this.pointMoveTo({
      x, y
    });
    window.addEventListener('mousemove', this.handleBoardDrag);
    window.addEventListener('mouseup', this.handleBoardDragEnd);
  }

  handleBoardDrag(e) {
    let x = e.clientX, y = e.clientY;
    this.pointMoveTo({
      x, y
    });
  }

  handleBoardDragEnd(e) {
    let x = e.clientX, y = e.clientY;
    this.pointMoveTo({
      x, y
    });
    window.removeEventListener('mousemove', this.handleBoardDrag);
    window.removeEventListener('mouseup', this.handleBoardDragEnd);
  }
  /**
   * 移动光标位置到
   * @param  {object} pos X Y 全局坐标点
   * @return {undefined}
   */
  pointMoveTo(pos) {
    let rect = React.findDOMNode(this).getBoundingClientRect();
    let width = rect.width;
    let height = rect.height;
    let left = pos.x - rect.left;
    let top = pos.y - rect.top;
    left = Math.max(0, left);
    left = Math.min(left, width);
    top = Math.max(0, top);
    top = Math.min(top, height);
    let x = left - 4;
    let y = top - 4;
    this.setState({x, y});
    let hsv = {
      h: this.HSV.h,
      s: parseInt(left / width * 100),
      v: parseInt((1 - top / height) * 100)
    };
    let colorObject = this.getColorsFromHsv(hsv);
    this.HSV = colorObject.hsv;

    this._onChange(colorObject);
  }

  getColorsFromHsv(oHsv) {
    let color = colr.fromHsvObject(oHsv);
    let hex = color.toHex();
    let rgb = color.toRgbObject();
    let hsv = color.toHsvObject();
    let hsl = color.toHslObject();
    let rgba = color.toRgbArray();
    rgba.push(this.state.alpha / 100);
    rgba = 'rbga(' + rgba.join(',') + ')';
    return {
      hex, rgb, hsv, hsl, rgba
    };
  }

  _drawBoard(hex) {
    const canvas = this.refs.canvas.getDOMNode();
    const point = this.refs.point.getDOMNode();
    const width = canvas.width;
    const height = canvas.height;

    let HSV = colr.fromHex(hex).toHsvObject();
    // 计算起始坐标
    this.HSV = HSV;
    this.setState({
      hex: HSV.h
    });
    let x = HSV.s / 100 * width;
    let y = (1 - HSV.v / 100) * height;
    point.style.left = x - 5 + 'px';
    point.style.top = y - 5 + 'px';
    this._rendderCanvas(HSV.h);
    return HSV;
  }

  _rendderCanvas(hex) {
    const canvas = this.refs.canvas.getDOMNode();
    const context = canvas.getContext('2d');
    let imageData;
    let pixels;
    let i = 0;
    let transfromHsv = [];
    const width = canvas.width;
    const height = canvas.height;
    imageData = context.createImageData(width, height);
    pixels = imageData.data;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++, i += 4) {
        transfromHsv[0] = hex;
        transfromHsv[1] = 100 * (x / width);
        transfromHsv[2] = 100 * (1 - y / height);
        transfromHsv = colr.fromHsvArray(transfromHsv).toRgbArray();
        pixels[i] = transfromHsv[0];
        pixels[i + 1] = transfromHsv[1];
        pixels[i + 2] = transfromHsv[2];
        pixels[i + 3] = 255;
      }
    }
    context.putImageData(imageData, 0, 0);
  }

  _updateBackgroundColor(hue) {
    this._rendderCanvas(hue);
    let hsv = {h:hue, s:this.HSV.s, v:this.HSV.v};
    let colorObject = this.getColorsFromHsv(hsv);
    this.HSV = colorObject.hsv;
    if (this.props.onChange) {
      this.props.onChange(colorObject);
    }
  }

  _onChange(colors) {
    if (colors.hex === this._cacheColors.hex) {
      return false;
    }
    this._cacheColors = colors;

    if (this.props.onChange) {
      this.props.onChange(colors);
    }
  }

  render() {
    return (
      <div className={this.props.prefixCls}>
        <canvas ref='canvas' width='200' height='150'></canvas>
        <span ref='point' style={{'left': this.state.x, 'top': this.state.y}}></span>
        <div
          className={this.prefixClsFn('handler')}
          onMouseDown={this.handleBoardMouseDown}
        ></div>
      </div>
    );
  }
}

Board.propTypes = {
  defaultColor: React.PropTypes.string,
  alpha: React.PropTypes.number,
  hue: React.PropTypes.number,
  prefixCls: React.PropTypes.string
};

Board.defaultProps = {
  defaultColor: '#F00',
  alpha: 100,
  hue: 0,
  prefixCls: 'rc-colorpicker-board'
};
module.exports = Board;
