const React = require('react');
const ReactMarkdown = require('react-markdown');
const Spinner = require('react-spinkit');
const he = require('he');
const Answer = require('./answer');
const SearchError = require('./search-error');
const { get } = require('./search');

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      error: {
        message: null,
        type: null,
      },
    }
  }

  componentDidMount() {
    get(this.props.question.question_id, true)
      .then(res => this.setState({ answers: res.body.items }))
      .catch(err => this.setState({ error: { message: err, type: 'api' }}));
  }

  renderAnswers() {
    const { answers } = this.state;
    if (! answers.length) {
      return <Spinner spinnerName='double-bounce' noFadeIn />;
    }

    return (
      <div style={{ marginTop: 10 }} className="tile is-vertical box">
        <p className="subtitle is-6">{answers.length} Answers</p>
        {this.state.answers.map((answer, idx) => (<Answer answer={answer} key={idx} />))}
      </div>
    );
  }

  render() {
    const { error } = this.state;
    if (error.message) {
      return <SearchError
        error={error.message}
        type={error.type} />;
    }

    const { question, goBack } = this.props;

    return (
      <div>
        <div className="card">
          <div className="card-header">
            <p className="card-header-title">{he.decode(question.title)}</p>
          </div>

          <div className="card-content">
            <div className="media"  style={{ marginBottom: 0 }}>
              <div className="media-left">
                <figure className="image is-32x32">
                  <img src={question.owner.profile_image} alt="Image" />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">{question.owner.display_name}</p>
                <p className="subtitle is-6">{question.owner.reputation}</p>
              </div>
            </div>

            <div className="content">
              <ReactMarkdown source={question.body} />
            </div>
          </div>
          <footer className="card-footer">
            <a className="card-footer-item" onClick={goBack}>Go Back</a>
          </footer>
        </div>

        {this.renderAnswers()}
      </div>
    )
  }
}

Question.propTypes = {
  question: React.PropTypes.object.isRequired,
  goBack: React.PropTypes.func.isRequired,
}

module.exports = Question;
