const React = require('react');
const Link = require('./link');
const Question = require('./question');
const styles = require('./styles');
const { searchGoogle, get } = require('./search');

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      links: [],
    }
  }

  componentDidMount() {
    searchGoogle(this.props.term, (err, res) => {
      this.setState({ links: res.body.items });
    }, true);
  }

  handleClick(link) {
    get(link.question_id, (err, res) => {
      this.setState({ question: res.body.items[0] });
    });
  }

  handleGoBack() {
    this.setState({ question: null });
  }

  renderLinks() {
    const { links } = this.state;
    if (! links.length) {
      return 'waiting for data...';
    }

    return links.map((link, idx) => (
        <Link key={idx} link={link} onClick={() => this.handleClick(link)} />
      ))
  }

  render() {
    const { question } = this.state;

    return (
      <div style={{ alignSelf: 'flex-start', width: '100%' }}>
          {question
            ? <Question question={question} goBack={() => this.handleGoBack()} />
            : this.renderLinks() }
      </div>
    );
  }
}

Preview.propTypes = {
  term: React.PropTypes.string.isRequired,
}

module.exports = Preview;
