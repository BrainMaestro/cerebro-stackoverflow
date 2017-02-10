const React = require('react');
const ReactMarkdown = require('react-markdown');
const Answer = require('./answer');
const styles = require('./styles');
const { get } = require('./search');

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
    }
  }

  componentDidMount() {
    get(this.props.question.question_id, (err, res) => {
      this.setState({ answers: res.body.items });
    }, true);
  }

  renderAnswers() {
    const { answers } = this.state;
    if (! answers.length) {
      return '';
    }

    return (
      <div style={{ marginTop: 10 }} className={styles('tile', 'is-vertical', 'box')}>
        <span className={styles('subtitle')}>{answers.length} Answers</span>
        {this.state.answers.map((answer, idx) => (<Answer answer={answer} key={idx} />))}
      </div>
    );
  }

  render() {
    const { question, goBack } = this.props;

    return (
      <div>
        <div className={styles('card')}>
          <div className={styles('card-header')}>
            <p className={styles('card-header-title')}>{question.title}</p>
          </div>

          <div className={styles('card-content')}>
            <div className={styles('media')}  style={{ marginBottom: 0 }}>
              <div className={styles('media-left')}>
                <figure className={styles('image', 'is-32x32')}>
                  <img src={question.owner.profile_image} alt="Image" />
                </figure>
              </div>
              <div className={styles('media-content')}>
                <p className={styles('title', 'is-4')}>{question.owner.display_name}</p>
                <p className={styles('subtitle', 'is-6')}>{question.owner.reputation}</p>
              </div>
            </div>

            <div className={styles('content')}>
              <ReactMarkdown source={question.body} />
            </div>
          </div>
          <footer className={styles('card-footer')}>
            <a className={styles('card-footer-item')} onClick={goBack}>Go Back</a>
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
