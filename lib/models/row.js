var AmpersandState = require('ampersand-state');

var RowData = AmpersandState.extend({
  extraProperties: 'allow'
});

var Row = AmpersandState.extend({
  model: RowData,
  extraProperties: 'allow'
});

module.exports = Row;
