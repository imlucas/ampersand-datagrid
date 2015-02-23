var AmpersandState = require('ampersand-state');

var Cell = AmpersandState.extend({
  props: {
    className: {type: 'any'},
    model: {type: 'any'},
    field: {type: 'string', required: true},
    value: {type: 'any;', required: false, default: function(){
      return 'n/a';
    }}
  },
});
module.exports = Cell;
