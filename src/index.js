'use strict';
const React = require('react');
const icon = require('./icon.png');
const Preview = require('./Preview');

const stackoverflowPlugin = ({term, display, actions}) => {
  display({
    icon,
    title: `Search for ${term}`,
    getPreview: () => <Preview term={term} />
  });
};

module.exports = {
  fn: stackoverflowPlugin,
  name: 'Search on stackoverflow',
  order: 10,
  icon,
};
