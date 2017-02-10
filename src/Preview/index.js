const React = require('react');
const Link = require('./link');
const Question = require('./question');
const styles = require('./styles');
const { getQuestion } = require('./search');

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
    }
  }

  handleClick(link) {
    getQuestion(link, (err, res) => {
      this.setState({ question: res.body.items[0] });
    });
  }

  handleGoBack() {
    this.setState({ question: null });
  }

  render() {
    const { links } = this.props;
    const { question } = this.state;

    return (
      <div style={{ alignSelf: 'flex-start', width: '100%' }}>
          {question
            ? <Question question={question} goBack={() => this.handleGoBack()} />
            : links.map((link, idx) => (
                <Link key={idx} link={link} onClick={() => this.handleClick(link)} />
              ))}
      </div>
    );
  }
}

Preview.propTypes = {
  links: React.PropTypes.array.isRequired,
}

module.exports = Preview;
