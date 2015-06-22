'use strict';

let utils = require('dom-align/lib/utils');

function getRegion(node) {
  let offset, w, h;
  if (!utils.isWindow(node) && node.nodeType !== 9) {
    offset = utils.offset(node);
    w = utils.outerWidth(node);
    h = utils.outerHeight(node);
  } else {
    let win = utils.getWindow(node);
    offset = {
      left: utils.getWindowScrollLeft(win),
      top: utils.getWindowScrollTop(win)
    };
    w = utils.viewportWidth(win);
    h = utils.viewportHeight(win);
  }
  offset.width = w;
  offset.height = h;
  return offset;
}

function getAlignOffset(region, align, offset) {
  let V = align.charAt(0),
    H = align.charAt(1),
    w = region.width,
    h = region.height,
    x, y;

  x = region.left;
  y = region.top;

  if (V === 'c') {
    y += h / 2;
  } else if (V === 'b') {
    y += h;
  }

  if (H === 'c') {
    x += w / 2;
  } else if (H === 'r') {
    x += w;
  }
  return {
    left: x + offset[0],
    top: y + offset[1]
  };
}

function getAlign(node, align, offset = [0, 0]) {
  let region = getRegion(node);
  return getAlignOffset(region, align, offset);
}

module.exports = {
  getRegion, getAlign
};
