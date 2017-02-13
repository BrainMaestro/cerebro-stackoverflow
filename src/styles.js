const bulma = require('bulma/css/bulma.css');

module.exports = (...classes) => {
  return classes.map(class_ => bulma[class_]).join(' ');
};
