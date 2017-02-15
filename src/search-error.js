const React = require('react');

class SearchError extends React.Component {
  render() {
    const { error, type, onClick } = this.props;

    return (
      <div>
        <article className="message is-warning">
          <div className="message-header">
            <p style={{ textTransform: 'capitalize' }}>{type} Error</p>
          </div>
          <div className="message-body">
            {format(error)}
          </div>
        </article>

        {type == 'google'
          ? <a className="button is-dark"
              onClick={onClick}>Use the stackoverflow api search instead?</a>
          : ''}
      </div>
    );
  }
}

SearchError.propTypes = {
  error: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]).isRequired,
  type: React.PropTypes.oneOf(['google', 'api']).isRequired,
  onClick: React.PropTypes.func,
}

SearchError.defaultProps = {
  onClick: () => {},
}

function format(err) {
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

module.exports = SearchError;
