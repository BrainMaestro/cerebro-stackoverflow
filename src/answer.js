import React, { Component, PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';
import Owner from './owner';

export default class Answer extends Component {
  render() {
    const { answer } = this.props;
    const answered = answer.is_accepted ? 'is-success' : '';

    return (
      <div className="box is-small" tabIndex="1">
        <article className="media">
          <div className="media-left">
            <a className={`button ${answered} is-disabled`}>
              {answer.score}
            </a>
          </div>

          <div className="media-content">
            <div className="content">
              <ReactMarkdown source={answer.body} />
              <Owner owner={answer.owner} />
            </div>
          </div>
        </article>
      </div>
    );
  }
}

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
};
