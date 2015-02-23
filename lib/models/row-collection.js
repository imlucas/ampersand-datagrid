var AmpersandCollection = require('ampersand-collection');
var RowCollection = AmpersandCollection.extend({
  model: require('./row')
});

module.exports = RowCollection;
