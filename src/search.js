import google from 'google';
import request from 'superagent';
import { memoize } from 'cerebro-tools';
google.resultsPerPage = 10;

const defaultQuery = {
  order: 'desc',
  site: 'stackoverflow',
  sort: 'votes',
};

const baseUrl = 'https://api.stackexchange.com/2.2';

export const searchGoogle = memoize(term => {
  return new Promise((resolve, reject) => {
    google(`${term} site:stackoverflow.com`, (err, res) => {
      err ? reject(err) : resolve(get(res.links));
    });
  });
});

export const searchApi = term => {
  const url = `${baseUrl}/search`;

  return request
    .get(url)
    .query(defaultQuery)
    .query({
      intitle: term,
    });
};

export const get = (questionId, answers = false) => {
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
    });
};

function parseQuestionId(links) {
  const re = /.*stackoverflow.com\/questions\/(\d+)\//;

  return links
    .map(({ link }) => {
      if (!link) return

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
