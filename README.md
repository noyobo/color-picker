# rc-color-picker
---

color-picker ui component for react

[![NPM version][npm-image]][npm-url]
[![SPM version](http://spmjs.io/badge/rc-color-picker)](http://spmjs.io/package/rc-color-picker)
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![Sauce Test Status](https://saucelabs.com/buildstatus/rc-color-picker)](https://saucelabs.com/u/rc-color-picker)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/rc-color-picker.svg)](https://saucelabs.com/u/rc-color-picker)

[npm-image]: http://img.shields.io/npm/v/rc-color-picker.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-color-picker
[travis-image]: https://img.shields.io/travis/react-component/color-picker.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/color-picker
[coveralls-image]: https://img.shields.io/coveralls/react-component/color-picker.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/color-picker?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/color-picker.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/color-picker
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-color-picker.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-color-picker

## Screenshots

<img src=https://cloud.githubusercontent.com/assets/1292082/8275606/8608e8f8-18db-11e5-8d10-703253db2a4f.png width=238 />

## Development

```
npm install
npm start
```

## Example

http://localhost:8000/examples/

online example: http://react-component.github.io/color-picker/build/examples/


## Feature

* support chrome,firefox,safari
* support color mode RGB HSB HSL

### Keyboard


## install

[![rc-color-picker](https://nodei.co/npm/rc-color-picker.png)](https://npmjs.org/package/rc-color-picker)

## Usage

```js
var Rccolor-picker = require('rc-color-picker');
var React = require('react');
React.render(<Rccolor-picker />, container);
```

## API

### ColorPicker

name|type|default|description
---|---|---|---
defaultColor|String|#ff0000|color board default background color
visible| Boolean | false | Picker default is invisible, contrary
align| [left|right] | right | Picker positon base for trigger

### ColorPicker.Picker.props

name|type|default|description
---|---|---|---
defaultColor|String|#ff0000|color board default background color
visible| Boolean | true | root node is visible
style | Object | {} | root node CSS style
onChange|Function| | when select color trigger
onFocus|Function| | when picker visiable trigger
onBlur|Function| | when picker loose focus

## Test Case

http://localhost:8000/tests/runner.html?coverage

## Coverage

http://localhost:8000/node_modules/rc-server/node_modules/node-jscover/lib/front-end/jscoverage.html?w=http://localhost:8000/tests/runner.html?coverage

## License

rc-color-picker is released under the MIT license.
