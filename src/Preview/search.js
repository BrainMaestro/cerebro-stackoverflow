const google = require('google');
const request = require('superagent');

const query = {
  filter: 'withbody',
  order: 'desc',
  site: 'stackoverflow',
};

function searchGoogle(term, callback) {
  term = encodeURIComponent(term);
  google(`${term} site:stackoverflow.com`, (err, res) => {
    if (err) {
      callback(err, res);
    }

    console.log(res.links)
    get(res.links, callback);
  });
}

function get(questionId, callback, answers = false) {
  questionId = Array.isArray(questionId) ? parseQuestionId(questionId) : questionId;
  let url = `https://api.stackexchange.com/2.2/questions/${questionId}`;
  if (answers) {
    url += '/answers';
  }

  request
    .get(url)
    .query(query)
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
};
