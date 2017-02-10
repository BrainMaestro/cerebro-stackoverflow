'use strict';
const React = require('react');
const icon = require('./icon.png');
const google = require('google');
const request = require('superagent');

const Preview = require('./Preview');
const Failed = require('./Preview/failed');
const TryAgain = require('./Preview/tryagain');

google.resultsPerPage = 10;

const stackoverflowPlugin = ({term, display, actions}) => {
  const title = `Search for ${term}`;
  if (term.length < 5) {
    return display({
      icon,
      title,
      getPreview: () => <Failed error={'You need a longer search string (at least 5 chars)'} />
    });
  }

  const encodedTerm = encodeURIComponent(term);
  google(`${encodedTerm} site:stackoverflow.com`, (err, res) => {
    if (!err) {
      return display({
        icon,
        title,
        getPreview: () => <Preview links={res.links} />
      });
    }

    display({
      icon,
      title,
      getPreview: () => <TryAgain error={err} onClick={apiSearch} />
    });
  });

  function apiSearch() {
    const url = `https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=${encodedTerm}&site=stackoverflow`;
    request
      .get(url)
      .end((err, res) => {
        if (err) {
          return display({
            icon,
            title,
            getPreview: () => <Failed error={err} />
          });
        }

        display({
          icon,
          title,
          getPreview: () => <Preview links={res.body.items} />
        });
    });
  }

  display({
    icon,
    title,
  });
};

module.exports = {
  fn: stackoverflowPlugin,
  name: 'Search on stackoverflow.com',
  icon,
}
