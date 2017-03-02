import React, { Component, PropTypes } from 'react';

export default class Owner extends Component {
  render() {
    const { profile_image, display_name, reputation, link } = this.props.owner;

    return (
      <div>
        <hr />
        <div className='is-pulled-right'>
          <div className='image is-32x32' style={{ marginRight: 10, display: 'inline-block' }}>
            <img src={profile_image} alt='Poster Image' />
          </div>

          <span className='is-inline-block'>
            <small>{display_name}</small><br />
            <small>{reputation}</small>
          </span>
        </div>
      </div>
    );
  }
}

Owner.propTypes = {
  owner: PropTypes.shape({
    profile_image: PropTypes.string,
    display_name: PropTypes.string,
    reputation: PropTypes.number,
    link: PropTypes.string,
  }),
}
