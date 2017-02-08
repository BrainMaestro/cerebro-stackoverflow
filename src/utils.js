const styles = require('material.css');

function getClass(...classes) {
  return classes.map(class_ => styles[`mdl-${class_}`]).join(' ');
}

module.exports = {
  getClass,
};
