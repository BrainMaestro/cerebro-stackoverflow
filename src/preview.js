const React = require('react');
const Spinner = require('react-spinkit');
const Link = require('./link');
const Question = require('./question');
const SearchError = require('./search-error');
const KeyboardNav = require('./keyboard-nav');
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
    searchGoogle(this.props.term)
      .then(res => this.setState({ links: res.body.items }))
      .catch(err => this.setState({ error: { message: err, type: 'google' }}));
  }

  handleApiSearch() {
    searchApi(this.props.term)
      .then(res => this.setState({
        links: res.body.items,
        error: { message: null, type: null }
      }))
      .catch(err => this.setState({ error: { message: err, type: 'api' }}));
  }

  handleClick(link) {
    get(link.question_id)
      .then(res => this.setState({ question: res.body.items[0] }))
      .catch(err => this.setState({ error: { message: err, type: 'api' }}));
  }

  handleGoBack() {
    this.setState({ question: null });
  }

  renderLinks() {
    const { links } = this.state;

    return links.map((link, idx) => (
        <Link key={idx} link={link} onClick={() => this.handleClick(link)} />
      ))
  }

  render() {
    const { question, error, links } = this.state;

    if (error.message) {
      return (
        <SearchError
          error={error.message}
          type={error.type}
          onClick={() => this.handleApiSearch()} />
      );
    }

    if (! links.length) {
      return <Spinner spinnerName='wave' noFadeIn />
    }

    return (
      <div className='preview'>
          {question
            ? <Question question={question} goBack={() => this.handleGoBack()} />
            : <KeyboardNav>{this.renderLinks()}</KeyboardNav> }
      </div>
    );
  }
}

Preview.propTypes = {
  term: React.PropTypes.string.isRequired,
}

module.exports = Preview;
