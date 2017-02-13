// const bulma = require('bulma/css/bulma.css');
const bulma = require('./styles.sass');

module.exports = (...classes) => {
  return classes.map(class_ => bulma[class_]).join(' ');
};
