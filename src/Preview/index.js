const React = require('react');
const Link = require('./link');
const styles = require('../bulma.css');

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  render() {
    const { links } = this.props;

    return (
      <div style={{ marginTop: 10, width: '100%' }}>
          {links.map(link => <Link link={link} />)}
      </div>
    );
  }
}

Preview.propTypes = {
  links: React.PropTypes.array.isRequired,
}

module.exports = Preview;
