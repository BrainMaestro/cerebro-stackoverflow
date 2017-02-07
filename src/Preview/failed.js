const React = require('react');

class Failed extends React.Component {
  render() {
    return (
      <div>
        {formatError(this.props.error)}
      </div>
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
    return `Cannot connect to Google.\n ${errorString}`;
  }
}

module.exports = Failed;
