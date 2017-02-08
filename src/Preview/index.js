const React = require('react');
const { getClass } = require('../utils');

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
      <div style={{ borderTop: 10 }}>
        <ul className={getClass('list')}>
          {links.map(link => (
            <li className={getClass('list__item', 'list__item--two-line')}>
              <span className={getClass('list__item-primary-content')}>
                <span>{stripTitle(link.title)}</span>
                <span className={getClass('list__item-sub-title')}>{link.href}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function stripTitle(title) {
    return title.replace(' - Stack Overflow', '');
}

Preview.propTypes = {
  links: React.PropTypes.array.isRequired,
}

module.exports = Preview;
