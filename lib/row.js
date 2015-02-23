var AmpersandView = require('ampersand-view'),
  _ = require('underscore'),
  CellView = require('./cell'),
  debug = require('debug')('ampersand-datagrid:row');

var RowView = AmpersandView.extend({
  collections: {
    cells: require('./models/cell-collection')
  },
  initialize: function(options){
    this.datagrid = options.model.datagrid;
    var source = this.model.model;

    var values = _.map(this.datagrid.columns.models, function(column){
      var value = source.get(column.field);
      var getClassName = function(){
        return column.className;
      };

      if(_.isFunction(column.className)){
        getClassName = column.className;
      }
      this.listenTo(source, 'change:' + column.field, this.onSourceChanged);

      return {
        field: column.field,
        value: column.render({value: value}),
        className: getClassName({value: value})
      };


    }, this);

    this.cells.reset(_.flatten(values));
  },
  template: require('./row.jade'),
  events: {
    'dblclick': 'onRowDoubleClicked'
  },
  onSourceChanged: function(){
    debug('underlying data changed', arguments);
    // var value = this.model.model.get(column.field);
    // var getClassName = function(){
    //   return column.className;
    // };

    // if(_.isFunction(column.className)){
    //   getClassName = column.className;
    // }

    // return {
    //   model: this.model.model,
    //   field: column.field,
    //   value: column.render({value: value}),
    //   className: getClassName({value: value})
    // };
  },
  onRowDoubleClicked: function(){
    debug('double clicked', this);
  },
  render: function() {
    this.renderWithTemplate({
      model: this.model
    });
    this.renderCollection(this.cells, CellView, this.queryByHook('rows'));
  }
});
module.exports = RowView;
