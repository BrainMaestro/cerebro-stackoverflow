const React = require('react');
const Link = require('./link');
const Question = require('./question');
const SearchError = require('./search-error');
const { searchGoogle, searchApi, get } = require('./search');
require('./styles.sass');

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      links: [],
      error: {
        message: null,
        type: null,
      },
    }
  }

  componentDidMount() {
    searchGoogle(this.props.term, (err, res) => {
      if (err) {
        return this.setState({ error: { message: err, type: 'google' }});
      }

      this.setState({ links: res.body.items });
    });
  }

  handleApiSearch() {
    searchApi(this.props.term, (err, res) => {
      if (err) {
        return this.setState({ error: { message: err, type: 'api' }});
      }

      this.setState({
        links: res.body.items,
        error: { message: null, type: null }
      });
    });
  }

  handleClick(link) {
    get(link.question_id, (err, res) => {
      if (err) {
        return this.setState({ error: { message: err, type: 'api' }});
      }

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
    const { question, error } = this.state;

    if (error.message) {
      return (
        <SearchError
          error={error.message}
          type={error.type}
          onClick={() => this.handleApiSearch()} />
      );
    }

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
