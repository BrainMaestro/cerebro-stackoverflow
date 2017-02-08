const React = require('react');
const styles = require('../bulma.css');

class Failed extends React.Component {
  render() {
    const error = formatError(this.props.error);

    return (
      <article className={styles['message'] + ' ' + styles['is-warning']}>
        <div className={styles['message-header']}>
          <p>Search Errors</p>
        </div>
        <div className={styles['message-body']}>
          {error}
        </div>
      </article>
    );
  }
}

Failed.propTypes = {
  error: React.PropTypes.object.isRequired,
}

function formatError(err) {
  let errorString = err.toString();

  if (errorString.indexOf('have detected unusual traffic') !== -1) {
    return 'You are doing too many requests to Google. ' +
          'You need to wait a bit before trying again.';
  } else if (errorString.indexOf('ENOTFOUND') !== -1) {
    return `Cannot connect to Google. Make sure you are connected.\n ${errorString}`;
  } else {
    return errorString;
  }
}

module.exports = Failed;
