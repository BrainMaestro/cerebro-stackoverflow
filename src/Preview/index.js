const React = require('react');
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
          {links.map(link => (
            <div className={styles['box']} id={link.link}>
              <span className={styles['content']}>
                <span className={styles['is-medium']}><strong>{stripTitle(link.title)}</strong></span><br />
                <i>{link.link}</i>
              </span>
            </div>
          ))}
      </div>
    );
  }
}

function stripTitle(title) {
    return decodeURIComponent(title.replace(' - Stack Overflow', ''));
}

Preview.propTypes = {
  links: React.PropTypes.array.isRequired,
}

module.exports = Preview;
