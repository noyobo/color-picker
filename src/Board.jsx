'use strict';

const Colr = require('colr');
const React = require('react');
let prefixClsFn = require('./utils/prefixClsFn');

let colr = new Colr();

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      color: props.color,
      prefixCls: props.prefixCls
    };

    this.prefixClsFn = prefixClsFn.bind(this);
  }

  handleBoardMouseDown(event) {
    console.log(event);
  }

  componentDidUpdate() {
    // 组件更新之后渲染 canvas 图像
    const canvas = this.refs.canvas.getDOMNode();
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    let imageData;
    let pixels;
    let i = 0;

    let HSV = colr.fromHex(this.state.color).toHsvArray();
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

  render() {
    return (
      <div className={this.prefixClsFn('board')}>
        <canvas ref='canvas' width='200' height='150'
          onMouseDown={this.handleBoardMouseDown}
        ></canvas>
        <span ref='point'></span>
      </div>
    );
  }
}

Board.propTypes = {
  color: React.PropTypes.string
};

Board.defaultProps = {
  color: '#F00',
  prefixCls: 'rc-color-picker'
};

module.exports = Board;
