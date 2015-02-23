var AmpersandView = require('ampersand-view'),
  debug = require('debug')('ampersand-datagrid:cell');

var CellView = AmpersandView.extend({
  bindings: {
    'model.value': {
      hook: 'value',
      type: 'innerHTML'
    },
    'model.field': {
      type: 'attribute',
      name: 'data-field'
    },
    'model.className': {
      type: 'class',
    },
  },
  template: require('./cell.jade'),
  render: function() {
    this.renderWithTemplate(this.model);
  }
});
module.exports = CellView;
