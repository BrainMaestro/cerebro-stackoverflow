const React = require('react');
const Failed = require('./failed');
const styles = require('../bulma.css');

module.exports = props => (
  <div>
    <Failed error={props.error}/>
    <a className={styles['button'] + ' ' + styles['is-dark']}
       onClick={props.onClick}>Use the stackoverflow api search instead?</a>
  </div>
);
