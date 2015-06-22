'use strict';

var expect = require('expect.js');
var ColorPicker = require('../index.js');
var Picker = ColorPicker.Picker;
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Simulate = TestUtils.Simulate;


describe('rc-color-picker', function() {
  this.timeout(5000);
  var div = document.createElement('div');
  document.body.appendChild(div);

  afterEach(function() {
    React.unmountComponentAtNode(div);
    document.body.removeChild(div);
  });

  it('work', function() {
    var picker = React.render(<Picker />, div);
    expect(picker.state.visible).to.be.ok();
  });
});
