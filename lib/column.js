var AmpersandView = require('ampersand-view'),
  debug = require('debug')('ampersand-datagrid:column');

var ColumnView = AmpersandView.extend({
  template: require('./column.jade'),
  bindings: {
    'model.title': {
      hook: 'title'
    },
    'model.active': {
      type: 'booleanClass',
      name: 'active'
    },
    'model.visible': {
      type: 'booleanClass',
      yes: 'visible',
      no: 'hidden'
    },
    'model.field': {
      type: 'attribute',
      name: 'data-field'
    }
  }
});
module.exports = ColumnView;
