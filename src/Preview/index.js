const React = require('react');
require('../material.min.css');

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  render() {
    const { links } = this.props;
    console.log(styles);

    return (
      <div>
        <ul>
          {links.map(link => (
            <li>
              <span>{link.title}</span>
              <span>{link.title}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Preview.propTypes = {
  links: React.PropTypes.array.isRequired,
}

module.exports = Preview;
