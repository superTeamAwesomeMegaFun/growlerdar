var React = require('react');
var Locations = require('./locations.jsx');

React.render(
    React.createElement(Locations, null),
    document.getElementById('locationTable')
);