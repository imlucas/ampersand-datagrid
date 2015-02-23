var AmpersandView = require('ampersand-view');
var ColumnCollection = require('./models/column-collection');
var RowCollection = require('./models/row-collection');
var Row = require('./models/row');
var _ = require('underscore');
var raf = require('component-raf');

// var RowView = require('./row');
// var ColumnView = require('./column');

var DatagridView = AmpersandView.extend({
  template: require('./index.jade'),
  collections: {
    columns: ColumnCollection,
    rows: RowCollection
  },
  derived: {
    column_fields: {
      deps: ['columns'],
      fn: function() {
        return this.columns.map(function(col) {
          return col.field;
        });
      }
    },
  },
  initialize: function(options) {
    this.listenTo(this.collection, 'add', this._addRowForModel);
    this.listenTo(this.collection, 'remove', this._removeRowForModel);
    // this.listenTo(this.collection, 'sort', this._rerenderAll);
    this.listenTo(this.collection, 'refresh reset sync', this._reset);

    if (this.collection.length > 0) {
      this._reset();
    }
  },
  render: function() {
    this.renderWithTemplate(this);
    this.renderCollection(this.columns, ColumnView, this.queryByHook('columns'));
    this.renderCollection(this.rows, RowView, this.queryByHook('rows'));
  },
  clear: function() {
    // this.rows.reset();
    this.columns.reset();
    console.log('now have %d rows and %d columns', this.rows.length, this.columns.length);
  },
  _getRowByModel: function(model) {
    return _.find(this.rows.models, function(row) {
      return model === row.model;
    });
  },
  _createRowForModel: function(model) {
    return new Row({
        model: model,
        collection: this.collection,
        datagrid: this
      });
  },
  _getOrCreateByModel: function(model) {
    return this._getRowByModel(model) || this._createRowForModel(model);
  },
  _addRowForModel: function(model) {
    var row = this._getRowByModel(model);
    if (!row) {
      row = this._createRowForModel(model);
      this.rows.add(row);
    }
  },
  _removeRowForModel: function(model) {
    var row = this._getRowByModel(model);
    if (!row) {
      return;
    }
    this.rows.remove(row);
  },
  _reset: function() {
    var self = this;
    this.rows.reset();

    this.collection.map(function(model) {
      raf(function() {
        self.rows.add(self._getOrCreateByModel(model));
      });
    });
    // var newRows = this.collection.map(this._getOrCreateByModel, this);

    //Remove existing views from the ui
    // var toRemove = _.difference(this.rows.models, newRows);
    // console.log('to remove from datagrid rows', toRemove);
    // toRemove.forEach(this._removeRow, this);
    // this.rows.reset(newRows);
    // console.log('now have %d rows and %d columns', this.rows.length, this.columns.length);
  }

});

module.exports = DatagridView;

module.exports.DESCENDING = -1;
module.exports.ASCENDING = 1;
