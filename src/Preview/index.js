const React = require('react');
const Link = require('./link');
const Question = require('./question');
const styles = require('../bulma.css');

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenLink: null
    }
  }

  handleClick(link) {
    this.setState({ chosenLink: link });
  }

  render() {
    if (this.state.chosenLink) {
      return <div style={{ alignSelf: 'flex-start' }}><Question question={question}/></div>
    }

    const { links } = this.props;

    return (
      <div style={{ alignSelf: 'flex-start' }}>
          {links.map((link, idx) => <Link key={idx} link={link} onClick={() => this.handleClick(link)} />)}
      </div>
    );
  }
}

Preview.propTypes = {
  links: React.PropTypes.array.isRequired,
}

module.exports = Preview;
