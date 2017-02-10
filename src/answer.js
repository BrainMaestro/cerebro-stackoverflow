const React = require('react');
const ReactMarkdown = require('react-markdown');
const styles = require('./styles');

class Answer extends React.Component {
  render() {
    const { answer } = this.props;

    return (
      <div className={styles('box')}>
        <article className={styles('media')}>
          <div className={styles('media-left')}>
            <a className={styles('button')}>
              {answer.score}
            </a>
          </div>

          <div className={styles('media-content')}>
            <div className={styles('content')}>
              <ReactMarkdown source={answer.body} />
            </div>
          </div>
        </article>
      </div>
    );
  }
}

Answer.propTypes = {
  answer: React.PropTypes.object.isRequired,
}

module.exports = Answer;
