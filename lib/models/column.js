var AmpersandState = require('ampersand-state');

var _render = function(options){
  return options.value;
};
var Column = AmpersandState.extend({
  // collections: {
  //   children: require('./column-collection')
  // },
  props: {
    field: {type: 'string', required: true},
    title: {type: 'string;', required: false, default: function(){
      return this.field;
    }},
    /**
     * How many child columns does this column span?
     */
    span: {type: 'number', default: 1},
    render: {type: 'function', default: function(){
      return _render;
    }},
    className: {type: 'any', default: null},
  },
  session: {
    /**
     * Is this column visible?
     */
    visible: {type: 'boolean', default: true},
    /**
     * Is this column active in the sort?
     */
    active: {type: 'boolean', default: false},
  },
});
module.exports = Column;
