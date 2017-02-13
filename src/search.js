const google = require('google');
const request = require('superagent');
const { memoize } = require('cerebro-tools');
google.resultsPerPage = 10;

const defaultQuery = {
  order: 'desc',
  site: 'stackoverflow',
};

const baseUrl = 'https://api.stackexchange.com/2.2';

const searchGoogle = memoize(term => {
  return new Promise((resolve, reject) => {
    google(`${term} site:stackoverflow.com`, (err, res) => {
      err ? reject(err) : resolve(get(res.links));
    });
  });
});

const searchApi = term => {
  const url = `${baseUrl}/search`;

  return request
    .get(url)
    .query(defaultQuery)
    .query({
      sort: 'activity',
      intitle: term,
    });
};

const get = (questionId, answers = false) => {
  questionId = Array.isArray(questionId) ? parseQuestionId(questionId) : questionId;
  let url = `${baseUrl}/questions/${questionId}`;
  if (answers) {
    url += '/answers';
  }

  return request
    .get(url)
    .query(defaultQuery)
    .query({
      filter: 'withbody',
      sort: 'votes',
    });
};

function parseQuestionId(links) {
  const re = /.*stackoverflow.com\/questions\/(\d+)\//;

  return links
    .map(({ link }) => {
      if (link.indexOf('stackoverflow.com') !== -1) {
        const matches = re.exec(link);

        if (matches && matches.length == 2) {
          return matches[1];
        }
      }
    })
    .filter(Boolean)
    .join(';');
}

module.exports = {
  get,
  searchApi,
  searchGoogle,
};
