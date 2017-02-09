const React = require('react');
const ReactMarkdown = require('react-markdown');
const styles = require('../bulma.css');

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
    }
  }

  render() {
    const question = this.props.question.items[0];

    return (
      <div>
        <div className={styles['card']}>
          <div className={styles['card-header']}>
            <p className={styles['card-header-title']}>{question.title}</p>
          </div>

          <div className={styles['card-content']}>
            <div className={styles['media']}  style={{ marginBottom: 0 }}>
              <div className={styles['media-left']}>
                <figure className={styles['image'] + ' ' + styles['is-32x32']}>
                  <img src={question.owner.profile_image} alt="Image" />
                </figure>
              </div>
              <div className={styles['media-content']}>
                <p className={styles['title'] + ' ' + styles['is-4']}>{question.owner.display_name}</p>
                <p className={styles['subtitle'] + ' ' + styles['is-6']}>{question.owner.reputation}</p>
              </div>
            </div>

            <div className={styles['content']}>
              <ReactMarkdown source={question.body} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Question.propTypes = {
  question: React.PropTypes.object.isRequired,
}

module.exports = Question;
