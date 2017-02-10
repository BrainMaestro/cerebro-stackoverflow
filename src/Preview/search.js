const google = require('google');
const request = require('superagent');
google.resultsPerPage = 10;

const defaultQuery = {
  order: 'desc',
  site: 'stackoverflow',
};

const baseUrl = 'https://api.stackexchange.com/2.2';

function searchGoogle(term, callback) {
  term = encodeURIComponent(term);
  google(`${term} site:stackoverflow.com`, (err, res) => {
    if (err) {
      callback(err, res);
    }

    get(res.links, callback);
  });
}

function searchApi(term, callback) {
  term = encodeURIComponent(term);
  const url = `${baseUrl}/search`;
  request
    .get(url)
    .query(defaultQuery)
    .query({
      sort: 'activity',
      intitle: term,
    })
    .end(callback);
}

function get(questionId, callback, answers = false) {
  questionId = Array.isArray(questionId) ? parseQuestionId(questionId) : questionId;
  let url = `${baseUrl}/questions/${questionId}`;
  if (answers) {
    url += '/answers';
  }

  request
    .get(url)
    .query(defaultQuery)
    .query({
      filter: 'withbody',
    })
    .end(callback);
}

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
  searchGoogle,
  searchApi,
};
