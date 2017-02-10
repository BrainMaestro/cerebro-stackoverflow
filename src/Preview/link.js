const React = require('react');
const styles = require('../bulma.css');

class Link extends React.Component {
  render() {
    const { link, onClick } = this.props;
    link.tags = link.tags || [];
    const answered = link.is_answered ? ' ' + styles['is-success'] : '';

    return (
      <div className={styles['box']} onClick={onClick}>
        <article className={styles['media']}>
          <div className={styles['media-left']}>
            <a className={styles['button'] + ' ' + styles['is-disabled'] + answered}>
              {link.answer_count}
            </a>
          </div>

          <div className={styles['media-content']}>
            <div className={styles['content']}>
              <span className={styles['is-medium']}>
                <strong>{format(link.title)}</strong>
                <small style={{ marginLeft: 5 }} className={styles['tag']}>
                  {link.view_count ? `${link.view_count} views` : ''}
                </small>
              </span><br />
              <i>{link.link}</i>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

function format(title) {
    return decodeURIComponent(title.replace(' - Stack Overflow', ''));
}

Link.propTypes = {
  link: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

module.exports = Link;
