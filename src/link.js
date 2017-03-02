import React, { Component, PropTypes } from 'react';
import he from 'he';
import { format } from 'd3-format';
const formatNumber = format('.2s');

export default class Link extends Component {
  render() {
    const { onClick } = this.props;
    const { title, score, link, is_answered, answer_count, view_count } = this.props.link;
    const answered = is_answered ? 'is-success' : '';
    const views = `${formatNumber(view_count)} views`;

    return (
      <div className="box pointer" tabIndex="0" onClick={onClick}>
        <article className="media">
          <div className="media-left">
            <a className={`button ${answered} is-disabled`}>
              {score}
            </a>
          </div>

          <div className="media-content">
            <div className="content">
              <span className="is-medium">
                <strong>{formatTitle(title)}</strong>
              </span>
              <br />

              <small><i>{link}</i></small>
              <br />

              <a className="tag link-tag">{views}</a>
              <a className="tag link-tag">{`${answer_count} answers`}</a>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

function formatTitle(title) {
  return he.decode(title).replace(' - Stack Overflow', '');
}

Link.propTypes = {
  link: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
