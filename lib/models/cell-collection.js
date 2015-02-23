var AmpersandCollection = require('ampersand-collection');
var CellCollection = AmpersandCollection.extend({
  model: require('./cell')
});

module.exports = CellCollection;
