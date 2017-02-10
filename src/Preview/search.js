const google = require('google');
const request = require('superagent');

function getQuestion(link, callback) {
  const questionId = parseQuestionId(link);

  request
    .get(`https://api.stackexchange.com/2.2/questions/${questionId}`)
    .query({
      filter: 'withbody',
      order: 'desc',
      site: 'stackoverflow',
    })
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
  getQuestion,
};
