const React = require('react');
const ReactMarkdown = require('react-markdown');

class Answer extends React.Component {
  render() {
    const { answer } = this.props;

    return (
      <div className="box">
        <article className="media">
          <div className="media-left">
            <a className="button">
              {answer.score}
            </a>
          </div>

          <div className="media-content">
            <div className="content">
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
