var AmpersandView = require('ampersand-view');

var PaginationView = AmpersandView.extend({
  template: require('./pagination.jade'),
  events: {
    'click a': 'onPageClick'
  },
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },
  onPageClick: function(event) {
    this.model.page = parseInt(event.target.dataset.hook, 10);
    return false;
  },
  render: function() {
    this.renderWithTemplate(this.model);
  }
});

module.exports = PaginationView;
