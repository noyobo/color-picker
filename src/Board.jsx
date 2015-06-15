'use strict';

const Colr = require('colr');
const React = require('react');
let prefixClsFn = require('./utils/prefixClsFn');

let colr = new Colr();

class Board extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      bgColor: props.bgColor,
      prefixCls: props.prefixCls,
      x: props.x,
      y: props.y
    };

    this.prefixClsFn = prefixClsFn.bind(this);

    let events = [
      'handleBoardMouseDown',
      'handleBoardDrag',
      'handleBoardDragEnd',
      'pointMoveTo'
    ];
    // bind methods
    events.forEach(m => {
      this[m] = this[m].bind(this);
    });
  }

  componentDidMount() {
    // 在初始化渲染执行之后立刻调用一次，绘制 canvas 图像
    const point = this.refs.point.getDOMNode();
    const canvas = this.refs.canvas.getDOMNode();
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    let imageData;
    let pixels;
    let i = 0;

    let HSV = colr.fromHex(this.state.bgColor).toHsvArray();
    // 计算起始坐标
    
    this.HSV = HSV;

    let x = HSV[1] / 100 * width;
    let y = (1 - HSV[2] / 100) * height;

    point.style.left = x - 4 + 'px';
    point.style.top = y - 4 + 'px';

    let transfromHsv = [];

    imageData = context.createImageData(width, height);
    pixels = imageData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++, i += 4) {
        transfromHsv[0] = HSV[0];
        transfromHsv[1] = 100 * (x / width);
        transfromHsv[2] = 100 * (1 - y / height);

        // console.log(transfromHsv, HSV);

        transfromHsv = colr.fromHsvArray(transfromHsv).toRgbArray();

        pixels[i] = transfromHsv[0];
        pixels[i + 1] = transfromHsv[1];
        pixels[i + 2] = transfromHsv[2];
        pixels[i + 3] = 255;
      }
    }

    context.putImageData(imageData, 0, 0);
  }

  handleBoardMouseDown(e) {
    let x = e.clientX, y = e.clientY;

    this.pointMoveTo({
      x, y
    });

    window.addEventListener('mousemove', this.handleBoardDrag);
    window.addEventListener('mouseup', this.handleBoardDragEnd);
  }

  handleBoardDrag(e){
    let x = e.clientX, y = e.clientY;
    this.pointMoveTo({
      x, y
    });
  }

  handleBoardDragEnd(e){
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
  pointMoveTo(pos){
    let rect = React.findDOMNode(this).getBoundingClientRect();
    let width = rect.width;
    let height = rect.height;
    let left = pos.x - rect.left;
    let top = pos.y - rect.top;

    if (left < 0) left = 0;
    if (left > width) left = width;
    if (top < 0) top = 0;
    if (top > height) top = height;

    let x = left - 4;
    let y = top - 4;

    this.setState({x, y});

    let [H, S, V] = [this.HSV[0], left / width * 100, (1 - top / height) * 100];

    let color = colr.fromHsvArray([H, S, V]);
    let hex = color.toHex();
    let rgb = color.toRgbObject();
    let hsv = color.toHsvObject();
    if (this.props.onChange) {
      this.props.onChange({
        hex, rgb, hsv
      });
    }
  }

  render() {
    return (
      <div className={this.prefixClsFn('board')}>
        <canvas ref='canvas' width='200' height='150'
          onMouseDown={this.handleBoardMouseDown}
        ></canvas>
        <span ref='point' style={{'left': this.state.x, 'top': this.state.y}}></span>
      </div>
    );
  }
}

Board.propTypes = {
  bgColor: React.PropTypes.string,
  prefixCls: React.PropTypes.string,
  x: React.PropTypes.number,
  y: React.PropTypes.number
};

Board.defaultProps = {
  bgColor: '#F00',
  prefixCls: 'rc-color-picker',
  x: -999,
  y: -999
};

module.exports = Board;
