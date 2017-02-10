const React = require('react');
const Failed = require('./failed');
const styles = require('./styles');

module.exports = props => (
  <div>
    <Failed error={props.error}/>
    <a className={styles('button', 'is-dark')}
       onClick={props.onClick}>Use the stackoverflow api search instead?</a>
  </div>
);
