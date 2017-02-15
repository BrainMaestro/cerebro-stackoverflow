const React = require('react');
const he = require('he');
const formatNumber = require('d3-format').format('.2s');

class Link extends React.Component {
  render() {
    const { onClick } = this.props;
    const { tags, title, link, is_answered, answer_count, view_count } = this.props.link;
    const answered = is_answered ? 'is-success' : '';
    const views = `${formatNumber(view_count)} views`;

    return (
      <div className="box pointer" onClick={onClick}>
        <article className="media">
          <div className="media-left">
            <a className={`button is-disabled ${answered}`}>
              {answer_count}
            </a>
          </div>

          <div className="media-content">
            <div className="content">
              <span className="is-medium">
                <strong>{formatTitle(title)}</strong>
                <small style={{ marginLeft: 5 }} className="tag">
                  {views}
                </small>
              </span><br />
            <small><i>{link}</i></small>
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
  link: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

module.exports = Link;
