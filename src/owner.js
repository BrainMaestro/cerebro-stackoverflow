const React = require('react');

class Owner extends React.Component {
  render() {
    const { profile_image, display_name, reputation, link } = this.props.owner;

    return (
      <div>
        <hr />
        <div className="is-pulled-right">
          <div className="image is-32x32" style={{ marginRight: 10, display: 'inline-block' }}>
            <img src={profile_image} alt="Poster Image" />
          </div>

          <span className="is-inline-block">
            <small>{display_name}</small><br />
            <small>{reputation}</small>
          </span>
        </div>
      </div>
    );
  }
}

Owner.propTypes = {
  owner: React.PropTypes.shape({
    profile_image: React.PropTypes.string,
    display_name: React.PropTypes.string,
    reputation: React.PropTypes.number,
    link: React.PropTypes.string,
  }),
}

module.exports = Owner;
