'use strict';
const React = require('react');
const icon = require('./icon.png');
const google = require('google');

const Preview = require('./Preview');
const Failed = require('./Preview/failed');
const styles = require('material.css');

google.resultsPerPage = 10;

const stackoverflowPlugin = ({term, display, actions}) => {

  google(`${term} site:stackoverflow.com`, (err, res) => {
    if (err) {
      return display({
        icon,
        title: `Search for ${term}`,
        getPreview: () => <Failed error={err} />
      });
    }

    display({
      icon,
      title: `Search for ${term}`,
      getPreview: () => <Preview links={res.links} />
    });
  });

  display({
    icon,
    title: `Search for ${term}`,
  });
};

module.exports = {
  fn: stackoverflowPlugin,
  name: 'Search on stackoverflow.com',
  icon,
}
