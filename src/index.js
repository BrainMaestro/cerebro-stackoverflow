'use strict';
const React = require('react');
const icon = require('./icon.png');
const google = require('google');

const Preview = require('./Preview');
const Failed = require('./Preview/failed');

google.resultsPerPage = 10;

const stackoverflowPlugin = ({term, display, actions}) => {

  if (term.length < 5) {
    return display({
      icon,
      title: `Search for ${term}`,
      getPreview: () => <Failed error={'You need a longer search string (5 chars)'} />
    });
  }

  term = encodeURIComponent(term);
  google(`${term} site:stackoverflow.com`, (err, res) => {
    if (!err) {
      return display({
        icon,
        title: `Search for ${term}`,
        getPreview: () => <Preview links={res.links} />
      });
    }

    return display({
      icon,
      title: `Search for ${term}`,
      getPreview: () => <Failed error={err} />
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
