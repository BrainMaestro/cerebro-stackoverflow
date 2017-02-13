const React = require('react');
const he = require('he');

class Link extends React.Component {
  render() {
    const { link, onClick } = this.props;
    link.tags = link.tags || [];
    const answered = link.is_answered ? 'is-success' : '';

    return (
      <div className="box pointer" onClick={onClick}>
        <article className="media">
          <div className="media-left">
            <a className={`button is-disabled ${answered}`}>
              {link.answer_count}
            </a>
          </div>

          <div className="media-content">
            <div className="content">
              <span className="is-medium">
                <strong>{format(link.title)}</strong>
                <small style={{ marginLeft: 5 }} className="tag">
                  {link.view_count ? `${link.view_count} views` : ''}
                </small>
              </span><br />
            <small><i>{link.link}</i></small>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

function format(title) {
  return he.decode(title).replace(' - Stack Overflow', '');
}

Link.propTypes = {
  link: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

module.exports = Link;
