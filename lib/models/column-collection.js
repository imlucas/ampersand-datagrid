var AmpersandCollection = require('ampersand-collection');
var ColumnCollection = AmpersandCollection.extend({
  model: require('./column')
});

module.exports = ColumnCollection;
