'use strict';

require('rc-color-picker/assets/index.css');
const React = require('react');
const Picker = require('rc-color-picker').Picker;

function onChange(obj) {
  // console.log(obj);
}

React.render(
  <div style={{padding: 20}}>
    <Picker onChange={onChange} />
  </div>, 
  document.getElementById('__react-content')
);
