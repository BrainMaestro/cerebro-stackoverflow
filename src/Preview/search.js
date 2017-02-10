const google = require('google');
const request = require('superagent');

const query = {
  filter: 'withbody',
  order: 'desc',
  site: 'stackoverflow',
};

function get(questionId, callback, answers = false) {
  let url = `https://api.stackexchange.com/2.2/questions/${questionId}`;
  if (answers) {
    url += '/answers';
  }

  request
    .get(url)
    .query(query)
    .end(callback);
}

function parseQuestionId({ question_id, link }) {
  if (question_id) {
    return question_id;
  }

  if (link.indexOf('stackoverflow.com') !== -1) {
    const re = /.*stackoverflow.com\/questions\/(\d+)\//;
    const matches = re.exec(link);

    if (matches.length == 2) {
      return matches[1];
    }
  }

  return null;
}

module.exports = {
  get,
};
